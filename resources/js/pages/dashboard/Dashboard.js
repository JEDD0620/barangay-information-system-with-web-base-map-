import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';
import { queryUser } from '../../utils/user';
import { Admin } from './components/Admin';
import { User } from './components/User';

const Dashboard = () => {

    const [user, setUser] = useState()
    const [dashboard, setDashboard] = useState()

    useEffect(() => {
        getDashboard()
        queryUser(setUser)
    }, [])

    const getDashboard = () => {
        Axios.get(`/api/dashboard`)
            .then(res => setDashboard(res.data))
            .catch(err => console.log(err))
    }

    return (
        <Layout>
            {!!user && (user.role == 'Admin' || user.role == 'Staff') ?
                <Admin user={user} dashboard={dashboard} />
                :
                <User user={user} dashboard={dashboard} />
            }
        </Layout>
    );
}

if (document.querySelector('#dashboard')) {
    ReactDOM.render(<Dashboard />, document.querySelector('#dashboard'));
}
