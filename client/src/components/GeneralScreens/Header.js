import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { RiPencilFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext, useAuth } from '../../Context/AuthContext';

const Header = () => {
    const { activeUser, logout, isAuthenticated } = useAuth()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1600)
    }, [])


    const handleLogout = () => {
        logout();
        navigate('/')
    };

    return (

        <header>
            <div className="averager">

                <Link to="/" className="logo">
                    <h5>
                        MERN BLOG

                    </h5>
                </Link>
                <SearchForm />
                <div className='header_options'>

                    {isAuthenticated ?
                        <div className="auth_options">


                            <Link className='addStory-link' to="/addstory"><RiPencilFill /> Add Story </Link>


                            <Link to="/readList" className='readList-link'>
                                <BsBookmarks />
                                <span id="readListLength">
                                    {activeUser.readListLength}
                                </span>
                            </Link>
                            <div className='header-profile-wrapper '>


                                {loading ? <SkeletonElement type="minsize-avatar" />

                                    :

                                    <img src={`${process.env.REACT_APP_API_URL || 'https://blogapp-7ooo.onrender.com'}/userPhotos/${activeUser.photo}`} alt={activeUser.username} />

                                }


                                <div className="sub-profile-wrap  ">
                                    <Link className='profile-link' to="/profile"  > <FaUserEdit />  Profile </Link>

                                    <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>

                                </div>

                            </div>


                        </div>

                        :
                        <div className="noAuth_options">

                            <Link className='login-link' to="/login"> Login </Link>

                            <Link className='register-link' to="/register"> Get Started</Link>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
