import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Button, FormControl, Spinner, Toast, Badge, Form, Container } from 'react-bootstrap'
import Axios from 'axios'
import { queryUser } from '../../utils/user'
import { Residency } from './components/Residency'

const Account = () => {
    const [user, setUser] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [showToast, setShowToast] = useState()

    useEffect(() => {
        queryUser(setUser)
    }, [])

    useEffect(() => {
        if (!!user && user.password == user.c_password)
            setIsValid(true)
        else
            setIsValid(false)
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.put(`/api/user/${user.id}`, user)
            .then(res => {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(res.data))
                setShowToast('User Account Updated!')
                // location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <Layout>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Account</h2>
                </Col>
                <Col md={2} className='text-right'>
                    <Toast onClose={() => setShowToast(false)} show={!!showToast} delay={3000} autohide>
                        <Toast.Header className='bg-success text-light' closeButton={false}>
                            <strong className="me-auto">{!!showToast && showToast}</strong>
                        </Toast.Header>
                    </Toast>
                </Col>
            </Row>

            <Container>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control pattern='[A-Za-z]{8,}$' title='small case letters only, min of 8' type="text" name='username' defaultValue={!!user ? user.username : ''} disabled={!!!user} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name='email' defaultValue={!!user ? user.email : ''} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" title="Alphanumeric only, min of 8" type="password" placeholder='fill to change password ...' minLength={8} name='password' disabled={!!!user} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Confirm Password {!isValid && <Form.Text className='text-danger d-inline-block mt-0'> *password did not matched!</Form.Text>}</Form.Label>
                                <Form.Control pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" title="Alphanumeric only, min of 8" type="password" placeholder='fill to change password ...' name='c_password' disabled={!!!user} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name='f_name' defaultValue={!!user ? user.f_name : ''} disabled={!!!user} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control type="tel" pattern="[0-9]{11}" title="e.g. 09123456789" name='contact_no' defaultValue={!!user ? user.contact_no : ''} disabled={!!!user} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Button variant='primary float-right' type='submit' disabled={!!!user || !isValid}>Update</Button>
                        </Col>
                    </Row>
                </Form>

                <Residency user={user} setToast={setShowToast}/>
            </Container>

        </Layout>
    );
}

if (document.querySelector('#account')) {
    ReactDOM.render(<Account />, document.querySelector('#account'));
}
