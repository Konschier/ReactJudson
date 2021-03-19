import { Reducer, useReducer, useMemo, useRef, useEffect, useCallback, useImperativeHandle } from 'react';
import { NavLink } from 'react-router-dom';

enum ActionTypes {
  add = 'add/todo',
  remove = 'remove/todo',
  reset = 'reset/todo'
}

interface TodoProps {
  id: number;
  value: string;
}
interface StateProps {
  todo: Array<TodoProps>;
}

interface ActionProps {
  type: ActionTypes;
  value?: any;
}

const initialState: StateProps = { todo: [] } as StateProps;

const reducer: Reducer<StateProps, ActionProps> = (state, action) => {
  switch(action.type) {
    case ActionTypes.add:
      return { ...state, todo: [...state.todo, action.value] };
    case ActionTypes.remove:
      return { ...state, todo: state.todo.filter(({ id }) => id !== action.value) };
    case ActionTypes.reset:
      return initialState;
    default:
      return state;
  }
};

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ todo }, dispatch] = useReducer(reducer, initialState);

  const addTodo = useCallback(() => {
    dispatch({ 
      type: ActionTypes.add,
      value: {
        id: new Date().getTime(),
        value: inputRef.current?.value
      },
    })
  }, [])

  function removeItem(id: number) {
    dispatch({ type: ActionTypes.remove, value: id });
  }

  const todos = useMemo(() => todo, [todo]);

  useEffect(() => {
    console.log('atualizado')
  }, [addTodo])

  return (
    <div className="App">
      <input ref={inputRef} type="text" />
      <button onClick={addTodo}>Salvar</button>
      <br />
      <ul>
        {todos.map(({ id, value }) => <li onClick={() => removeItem(id)} key={id}>{value}</li>)}
      </ul>
      <NavLink to="/test">Ir para teste</NavLink>
    </div>
  );
}

export default App;
