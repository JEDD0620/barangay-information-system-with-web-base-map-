import React, { useEffect, useState } from 'react'
import { logoutUser, queryUser } from '../utils/user'

export const NavUser = ({ user }) => {

    return (
        <nav className='bg-dark text-light'>
            <div className='user-nav'>
                <i className="fas fa-user-circle"></i>
                <div>{!!user && user.f_name}</div>
                <a className='btn btn-link p-0'>Account</a> | <button className='btn btn-link p-0' onClick={logoutUser}>Logout</button>
            </div>

            <ul className="nav">

            </ul>
        </nav>
    )
}