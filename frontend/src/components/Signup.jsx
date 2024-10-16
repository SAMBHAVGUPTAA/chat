import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`,user,{
        headers:{
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white-100'>
        <h1 className='text-3xl font-bold text-center text-green-700'>Sign Up</h1>
        <form onSubmit={onSubmitHandler} action=''>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Full Name</span>
            </label>
            <input 
            value={user.fullName} 
            onChange={(e)=>setUser({...user,fullName:e.target.value})}
            className='w-full input input-bordered h-10 input-success' 
            type='text' 
            placeholder='Name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input 
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            className='w-full input input-bordered h-10 input-success' 
            type='text' 
            placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input 
            value={user.password} 
            onChange={(e)=>setUser({...user,password:e.target.value})}
            className='w-full input input-bordered h-10 input-success' 
            type='password' 
            placeholder='Password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Confirm Password</span>
            </label>
            <input 
            value={user.confirmPassword} 
            onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
            className='w-full input input-bordered h-10 input-success' 
            type='password' 
            placeholder='Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center text-white'>
              <p>Male:</p>
              <input 
              type="checkbox" 
              checked={user.gender === "male"}
              onChange={() => handleCheckbox("male")}
              defaultChecked 
              className="checkbox checkbox-success mx-2" />
            </div>
            <div className='flex items-center text-white'>
              <p>Female:</p>
              <input 
              type="checkbox" 
              checked={user.gender === "female"}
              onChange={() => handleCheckbox("female")}
              defaultChecked 
              className="checkbox checkbox-success mx-2" />
            </div>
          </div>
          <p className='text-center my-2 text-white'>Already have an account? <Link to="/login" className='text-white'> login </Link></p>
          <div>
          <button type='submit' className='btn btn-block btn-success btn-sm mt-2 border border-slate-700 text-white'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup