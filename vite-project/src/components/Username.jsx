import React from 'react'
import { Link } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import avatar from '../assets/profile.jpeg'
import styles from '../styles/Username.module.css'
const Username = () => {
    const formik = useFormik({
        initialValues:{
        username:''
    },
    validate:
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
        console.log(values,'values on fotmils')
    }
})
  return (
    <div className='container mx-auto'>
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Hello Again</h4>
                    <span className='py-4 text-xl w-2/3 text-center text-grat-500'>
                        Explore more by connecting with us.
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img className={styles.profile_img} src={avatar} alt='avatar'/>
                    </div>
                    <div className='textbox flex flex-col'>
                        <input {...formik.getFieldProps('username')} type='text' className={styles.textbox} placeholder='Username'/>
                        <button className={styles.btn} type='submit'>Let's Go</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray-500'>
                            Not a Member ? <Link to='/register' className='text-violet-500'>Register now</Link>
                        </span>
                    </div>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Username