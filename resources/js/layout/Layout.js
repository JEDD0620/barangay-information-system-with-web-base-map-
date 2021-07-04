import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { queryUser } from '../utils/user'
import { NavAdmin } from './NavAdmin'
import { NavUser } from './NavUser'

export const Layout = ({ children }) => {

    const [user, setUser] = useState()

    useEffect(() => {
        queryUser(setUser)
    }, [])

    return (<>
        <main>
            {!!user && (user.role == 'Admin' || user.role == 'Staff') ? <NavAdmin user={user} /> : <NavUser user={user} />}
            <article>
                <Container fluid>
                    {children}
                </Container>
            </article>
        </main>
        <footer>...</footer>
    </>)
}