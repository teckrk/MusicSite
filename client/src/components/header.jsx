import React, { useState } from "react";
import {  MusicalDoctorz } from "../assets/img";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown } from 'react-icons/fa';
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { Contact } from './contact'

const Header = () => {

    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth
            .signOut()
            .then(() => {
                window.localStorage.setItem("auth", "false");
            })
            .catch((e) => console.log(e));
        navigate("/login", { replace: true });
    };

    return (
        <header className="flex bg-first text-white-500 items-center w-full p-4 md:py-2 md:px-6">
            <NavLink>
                <img src={MusicalDoctorz} className="w-16" alt="" />

            </NavLink>

            <ul className="flex items-center justify-center ml-7">

                <li className="mx-5 text-lg"><NavLink to={'/home'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} >Home</NavLink></li>

                <li className="mx-5 text-lg"><NavLink to={'http://127.0.0.1:5000'} target="_blank" className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>SongRecommender</NavLink></li>

                <li className="mx-5 text-lg"><NavLink to={'http://localhost:8501'} target="_blank" className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} >EmoBeats</NavLink></li>

                <li className="mx-5 text-lg"><NavLink to={'https://teckrk.github.io/portfolio/#contact'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Contact</NavLink></li>
            </ul>

            <div
                className="flex items-center ml-auto cursor-pointer gap-2 relative"
                onMouseEnter={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
            >
                <img
                    className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
                    src={user?.user?.imageURL}
                    alt=""
                    referrerpolicy="no-referrer"
                />
                <div className="flex flex-col">
                    <p className="  text-lg hover:text-headingColor font-semibold">
                        {user?.user.name}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-white-500 font-normal">
                        Premium Member.{" "}
                        <FaCrown className="text-xm -ml-1 text-yellow-500" />{" "}
                    </p>
                </div>

                {isMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-second
                        //   bg-card 
                         shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
                    >
                        <NavLink to={"/userProfile"}>
                            <p className="text-base text-first hover:font-semibold duration-150 transition-all ease-in-out">
                                Profile
                            </p>
                        </NavLink>
                        <p className="text-base text-first hover:font-semibold duration-150 transition-all ease-in-out">
                            My Favourites
                        </p>
                        <hr />
                        {/* {user?.user.role === "admin" && ( */}
                        <>
                            <NavLink to={"/dashboard/home"}>
                                <p className="text-base text-first hover:font-semibold duration-150 transition-all ease-in-out">
                                    Dashboard
                                </p>
                            </NavLink>
                            <hr />
                        </>
                        {/* )} */}
                        <p
                            className="text-base text-first hover:font-semibold duration-150 transition-all ease-in-out"
                            onClick={logout}
                        >
                            Sign out
                        </p>
                    </motion.div>
                )}

            </div>

        </header>
    );
};

export default Header;
