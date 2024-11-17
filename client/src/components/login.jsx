import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { app } from '../config/firebase.config'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { validateUser } from '../api';
import { actionType } from '../context/reducer';
import { sky } from '../assets/video'

export default function Login({ setAuth }) {

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {

            userCred.getIdToken().then((token) => {
              window.localStorage.setItem("auth", "true")
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true })
          }
          else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            })
            navigate("/login")
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true })
    }
  }, [])

  return (
    <div className='relative w-screen h-screen'>
      <video
        src={sky}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover opacity-8"
      ></video>
      <div className='absolute inset-0 bg-darkOverlay flex items-center justify-evenly flex-col p-4'>
        <div>
          <h1 className='text-3xl font-bold color-wheat'>Welcome to Music Site</h1>
        </div>
        <div>
          <h1 className='text-8xl font-bold text-white'> <span className='login-span'>M</span>usical <span className='login-span'>D</span>octorz</h1>
        </div>
        <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
          <div className='flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-cardOverlay
                 cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all' onClick={loginWithGoogle}>
            <FcGoogle className='text-xl' />
            <p> Sign in with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};


