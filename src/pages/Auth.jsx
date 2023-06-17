import React, {useState, } from 'react'
import {useDispatch} from "react-redux"
import DogWithHeadphone from '../assets/dog-with-headphone.jpg';
import { auth, provider } from '../firebase';
import {  signInWithPopup, } from "firebase/auth";
import { login } from '../redux/features/userSlice';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithGoogle } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail , signInWithEmail, resetPassword} from '../redux/features/userSlice';
function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const signUpWithEmailHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setError('Passwords do not match');
      return;
    }

    try {
      // Dispatch sign up action
      await dispatch(signUpWithEmail({ firstName, lastName, email, password })).unwrap();
      console.log("user sign up");
      navigate('/');
    } catch (error) {
      setError(error);
    }
  }
  const signUpWithGoogle = async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
      navigate('/'); // Naviga
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const signInWithEmailHandler = async (e) => {
    e.preventDefault();
    try {
      // Dispatch sign in action
      await dispatch(signInWithEmail({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      setError(error);
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

  // Perform form validation
  if (!email) {
    alert("Email field is mandatory");
    setError('Email field is mandatory');
    return;
  }

  try {
    await dispatch(resetPassword(email)).unwrap();
    // Password reset email sent!
    alert("reset password sent to your email");
    navigate('/auth');
  } catch (error) {
    setError(error);
  }
  }
  
  const switchMode = () => {
    setIsSignUp((previousSignUp) => !previousSignUp );
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-cyan-100 flex rounded-2xl shadow-lg '>
        {/* form part */}
        <div className='sm:w-1/2 p-5 '>
          {isSignUp ? (
            <>
              <h2 className='font-bold text-2xl text-backgroundColor'>Register</h2>
            </>
          ) : (
            <>
            <h2 className='font-bold text-2xl text-backgroundColor'>Sign In</h2>
            </>
          )}

          <form action='submit' className='flex flex-col  gap-3'>
            
            {isSignUp && (
              <>
              <input className='p-2 mt-2 rounded-xl border ' type='text' name='firstName' placeholder='First Name'  onChange={(e) => setFirstName(e.target.value)}></input>
              <input className='p-2 mt-2 rounded-xl border' type='text' name='lastName' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}></input>

              </>
            )}
            <input className='p-2 mt-2 rounded-xl border' type='email' name='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}></input>
                <input className='p-2 mt-2 rounded-xl border' type='password' name='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}></input>
                {isSignUp && (
                  <input className='p-2 mt-2 rounded-xl border' type='password' name='confirmPassword' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
                )}

            {isSignUp ? (
              <button className='bg-backgroundColor text-white py-2 rounded-xl' onClick={(e) => signUpWithEmailHandler(e)}>Register</button>
            ): (
              <button className='bg-backgroundColor text-white py-2 rounded-xl' onClick={(e) => signInWithEmailHandler(e)}>Log In</button>
            )}

          </form>

          <div className='mt-5 grid grid-cols-3 items-center text-gray-400 '>
            <hr className='border-gray-400'></hr>
            <p className='text-center'>OR</p>
            <hr className='border-gray-400'></hr>
          </div>

          <button className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center' onClick={signUpWithGoogle}>
          <svg  className='mr-3 ' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="28px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          Login With Google
          </button>

          {!isSignUp && (
            <>
            <p className='mt-3 text-sm border-b py-4 cursor-pointer' onClick={(e) => resetPasswordHandler(e)}>Forget your password?</p>
            </>
          )}

          <div className='text-xs flex items-center justify-center mt-5'>
          {isSignUp ? (
            <>
            <p className='mr-3'> If you are already a member</p>
            <button className='py-2  text-backgroundColor font-bold' onClick={switchMode}> Login</button>
            </>
          ): (
            <>
            <p className='mr-3'>If you don't have an account</p>
            <button className='py-2 text-backgroundColor font-bold' onClick={switchMode}> Register</button>
            </>
          )}

          </div>
          
        </div>
        {/* image */}
        <div className='w-1/2 p-5'>
          <img src={DogWithHeadphone} className=' sm:block hidden rounded-2xl'/>
        </div>
      </div>
    </div>
  )
}

export default Auth
