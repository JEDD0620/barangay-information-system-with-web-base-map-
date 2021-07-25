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
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/dashboard" && 'active'}`} href="/dashboard"><i className="fas fa-th"></i> Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/map" && 'active'}`} href="/map"><i className="fas fa-map-marked-alt"></i> Brgy. Map</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/schedules" && 'active'}`} href="/schedules"><i className="fas fa-calendar-day"></i> Schedules</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/events" && 'active'}`} href="/events"><i className="far fa-calendar-alt"></i> Events</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/announcements" && 'active'}`} href="/announcements"><i className="fas fa-bullhorn"></i> Announcements</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/feedbacks" && 'active'}`} href="/feedbacks"><i className="fas fa-flag"></i> Feedbacks</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/requests" && 'active'}`} href="/requests"><i className="fas fa-clipboard-list"></i> Transaction Requests</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${location.pathname == "/reports" && 'active'}`} href="/reports"><i className="fas fa-exclamation-triangle"></i> Blotter Reports</a>
                </li>
            </ul>
        </nav>
    )
}