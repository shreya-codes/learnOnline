import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Username,
	Login,
	Register,
	ForgotPassword,
	PageNotFound,
	Profile,
} from './components/index.js';

const router = createBrowserRouter([
	{ path: '/', element: <Username /> },
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/forgotPassword',
		element: <ForgotPassword />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]);

const App = () => {
	return (
		<main>
			<RouterProvider router={router}></RouterProvider>
		</main>
		//     <div className='flex w-full h-screen '>
		//       <div className='bg-gray-300 w-full flex items-center justify-center lg:w-1/2  '>
		// <Login />
		//       </div>
		//       <div className='hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200' >
		//       <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full'> </div>

		//       </div>
		//     </div>
	);
};

export default App;
