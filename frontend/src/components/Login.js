import React from 'react'

const Login = () => {
  return (
    <div className=' px-10 py-20 rounded-3xl border-2 border-gray-200 '>
      <h1 className='text-5xl font-semibold '> Welcome Back ! </h1>
      <div className='mt-8'>
        <div>
          <label className='text-lg font medium'>Email</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your email'
          />
        </div>
        <div>
          <label className='text-lg font medium'>Password</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your password'
          type='password'
          />
        </div>
        <div className='mt-8 flex justify-between items-center'>
        <div>
          <input type='checkbox' id='remember'/>
          <label className='ml-2 font-medium text-base' for="remember">Remember me</label>
        </div>
        <div>
        <button className='font-medium text-base text-violet-500'> Forgot password</button>

        </div>
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:scale-[0.9] py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'>Sign in</button>
          <button>Sign in with Google </button>
        </div>

      </div>
    </div>
  )
}

export default Login