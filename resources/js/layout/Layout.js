import React, { useEffect, useState } from 'react'
import { Alert, Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { logoutUser, queryUser } from '../utils/user'
import { NavAdmin } from './NavAdmin'
import { NavUser } from './NavUser'

export const Layout = ({ children }) => {

    const [user, setUser] = useState()

    useEffect(() => {
        queryUser(setUser)
        console.log(window.innerWidth);
    }, [])

    return (<>
        <main>
            {window.innerWidth <= 480 ?
                <Navbar bg="primary" variant='dark' className='text-light' expand="lg">
                    <Container>
                        <Navbar.Brand href="/">San Francisco BIS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            {!!user && (user.role == 'Admin' || user.role == 'Staff') ?
                                <>
                                    <Nav.Link className={`${location.pathname == "/dashboard" && 'active'}`} href="/dashboard"><i className="fas fa-th"></i> Dashboard</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/residents" && 'active'}`} href="/residents"><i className="fas fa-house-user"></i> Residents</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/users" && 'active'}`} href="/users"><i className="fas fa-users-cog"></i> Users</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/map" && 'active'}`} href="/map"><i className="fas fa-map-marked-alt"></i> Brgy. Map</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/schedules" && 'active'}`} href="/schedules"><i className="fas fa-calendar-day"></i> Schedules</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/events" && 'active'}`} href="/events"><i className="far fa-calendar-alt"></i> Events</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/announcements" && 'active'}`} href="/announcements"><i className="fas fa-bullhorn"></i> Announcements</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/feedbacks" && 'active'}`} href="/feedbacks"><i className="fas fa-flag"></i> Feedbacks</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/requests" && 'active'}`} href="/requests"><i className="fas fa-clipboard-list"></i> Transaction Requests</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/reports" && 'active'}`} href="/reports"><i className="fas fa-exclamation-triangle"></i> Blotter Reports</Nav.Link>
                                    <NavDropdown.Divider />
                                    <Nav.Link href="/account"><i className="fas fa-user"></i> Account</Nav.Link>
                                    <Nav.Link onClick={logoutUser} className='text-danger'><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link className={`${location.pathname == "/dashboard" && 'active'}`} href="/dashboard"><i className="fas fa-th"></i> Dashboard</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/map" && 'active'}`} href="/map"><i className="fas fa-map-marked-alt"></i> Brgy. Map</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/schedules" && 'active'}`} href="/schedules"><i className="fas fa-calendar-day"></i> Schedules</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/events" && 'active'}`} href="/events"><i className="far fa-calendar-alt"></i> Events</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/announcements" && 'active'}`} href="/announcements"><i className="fas fa-bullhorn"></i> Announcements</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/feedbacks" && 'active'}`} href="/feedbacks"><i className="fas fa-flag"></i> Feedbacks</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/requests" && 'active'}`} href="/requests"><i className="fas fa-clipboard-list"></i> Transaction Requests</Nav.Link>
                                    <Nav.Link className={`${location.pathname == "/reports" && 'active'}`} href="/reports"><i className="fas fa-exclamation-triangle"></i> Blotter Reports</Nav.Link>
                                    <NavDropdown.Divider />
                                    <Nav.Link href="/account"><i className="fas fa-user"></i> Account</Nav.Link>
                                    <Nav.Link onClick={logoutUser} className='text-danger'><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link>
                                </>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                :
                !!user && (user.role == 'Admin' || user.role == 'Staff') ? <NavAdmin user={user} /> : <NavUser user={user} />
            }
            <article>
                <Container fluid>
                    {!!user && !!user.id && !!!user.state && <>
                        <Alert variant="warning">
                            Your account is not fully verified! Please fill out the Residency details on your <a href='/account'>Account</a> page.
                        </Alert>
                    </>}

                    {children}
                </Container>
            </article>
        </main>
        {/* <footer>...</footer> */}
    </>)
}