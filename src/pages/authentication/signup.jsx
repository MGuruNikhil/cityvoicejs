import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../axios/axios";
import { AuthContext } from '../../axios/authProvider';

const Signup = () => {

    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [isexpert, setIsexpert] = useState("")

    useEffect(() => {
        if (auth !== null && auth.refreshToken !== null && auth.refreshToken !== undefined) {
            navigate("/");
        }
    }, [auth]);


    const handleSubmit = async () => {
        const userData = {
            'username': username,
            'phone': mobile,
            'is_expert': isexpert,
            'password': password
        }
        console.log(userData);
        await axios.post('/user/register/', userData)
            .then(function (response) {
                console.log(response);
                setAuth({
                    refreshToken: response.data.refresh,
                    accessToken: response.data.access,
                    username: response.data.username
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="bg-gray-900 w-screen h-screen">
            <div className=" flex justify-center text-slate-100 items-center w-screen h-screen">
                <div className="p-8 w-[450px] max-w-[100vw] rounded border-white shadow-lg bg-[#F9DBBD] bg-opacity-10">
                    <div className="text-xl py-2 mb-1 font-bold">Lets Get Started</div>
                    <form onSubmit={handleSubmit}>
                        <div className="py-2">
                            <input
                                className=" focus:outline outline-white w-full bg-transparent border border-slate-300 rounded-md placeholder-gray-500 p-2"
                                type="text"
                                name="userName"
                                placeholder=" enter your username"
                                required
                            />
                        </div>
                        <div className=" w-full">
                            <input
                                className="focus:outline outline-white w-full bg-transparent border border-slate-300 rounded-md p-2 placeholder-gray-500"
                                type="text"
                                placeholder="enter your mobile number"
                                required
                                name="mobileNum"
                            />
                            <div className="py-2 w-full">
                                <input
                                    className="focus:outline outline-white w-full bg-transparent border border-slate-300 rounded-md p-2 placeholder-gray-500"
                                    type="password"
                                    name="password"
                                    placeholder="Set password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex py-2">
                            <input
                                className="m-2"
                                type="checkbox"
                                name="isExpert"
                                id="isExpert"
                                required
                            />
                            <div className="flex inline-block">
                                <label className="" htmlFor="isExpert">
                                    Are you a Government Official ?
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-nowrap">
                            <input className="m-2" type="checkbox" required />
                            <div className="flex flex-wrap">
                                I agree to the
                                <a className="text-amber-300 ml-1 " href="#">
                                    terms and conditions
                                </a>
                            </div>
                        </div>
                        <div className="py-4 flex justify-center w-full">
                            <button className=" border border-gray-300 w-[99%] bg-sky-950 text-white border border-grey-300 rounded p-2 hover:bg-cyan-700 hover:border-cyan-700 hover:text-white">
                                Create account
                            </button>
                        </div>
                    </form>
                    <span className="ml-2 flex gap-2">
                        already have an account ?
                        <Link
                            className="font-medium text-amber-300 no-underline hover:text-[#535bf2]"
                            to="/login"
                        >
                            Log In
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;