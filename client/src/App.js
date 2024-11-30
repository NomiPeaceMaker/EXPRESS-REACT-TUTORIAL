// import logo from './logo.svg';
import './App.css';
import store from './redux/store';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { Provider, useSelector } from 'react-redux';
axios.defaults.baseURL = 'http://localhost:5000';


// export const fetchTasks = () => async (dispatch) => {
//   const { data } = await axios.get('/tasks');
//   dispatch({ type: 'FETCH_TASKS', payload: data });
// };

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
