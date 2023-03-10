
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { __getTodos } from './redux/modules/todosSlice';

function App() {

  const dispatch = useDispatch();
  const {isLoading, error, todos} = useSelector((state)=>{
    return state.todos
  })

  useEffect(() => {
    dispatch(__getTodos())
  }, [])
  

  if (isLoading) {
    return <div>로딩 중..</div>
  }

  if (error) {
    <div>{error.message}</div>
  }

  return (
    <div>
      {todos.map((item)=>{
        return <div key={item.id}>
        {item.id}:{item.title}
      </div>
    })}
    </div>
  );
}

export default App;
