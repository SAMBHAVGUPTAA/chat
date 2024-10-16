import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'

const Login = () => {
    const [user,setUser]= useState({
        username: "",
        password: "",
    })
    const dispatch = useDispatch();
const navigate = useNavigate();
    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user/login`,user,{
              headers:{
                'Content-Type': 'application/json',
              },
              withCredentials: true
            });
              navigate("/");
              console.log(res.data)
              dispatch(setAuthUser(res.data));
          } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
          }
        setUser({
            username:"",
            password:""
        })
    }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white-100'>
        <h1 className='text-3xl font-bold text-center text-green-700'>Login</h1>
        <form onSubmit={onSubmitHandler} action=''>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input 
            value={user.username}
            onChange={(e) => setUser({...user,username:e.target.value})}
            className='w-full input input-bordered h-10 input-success ' 
            type='text' 
            placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input 
            value={user.password}
            onChange={(e) => setUser({...user,password:e.target.value})}
            className='w-full input input-bordered h-10 input-success' 
            type='password' 
            placeholder='Password' />
          </div>
          <p className='text-center my-2 text-white'>Don't have an account? | <Link to="/register" className='text-white'> Register </Link></p>
          <div>
          <button type='submit' className='btn btn-block btn-success btn-sm mt-2 border border-slate-700 text-white'>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login