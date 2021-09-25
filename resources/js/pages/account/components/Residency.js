import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';

export const Residency = ({ user, setToast }) => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({
        f_name: '',
        b_date: '',
        gender: 'Male',
        address: '',
        contact_no: '',
        job: '',
        role: 'Request',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (!!user.id) {
            setFormData({ ...formData, owner_id: user.id });
            getResidency()
        }
    }, [user])

    const getResidency = () => {
        Axios.get(`/api/resident/${user.id}`)
            .then(res => {
                if (!!res.data)
                    setFormData({
                        id: !!res.data.id ? res.data.id : '',
                        f_name: !!res.data.f_name ? res.data.f_name : '',
                        b_date: !!res.data.b_date ? res.data.b_date : '',
                        gender: !!res.data.gender ? res.data.gender : '',
                        address: !!res.data.address ? res.data.address : '',
                        contact_no: !!res.data.contact_no ? res.data.contact_no : '',
                        job: !!res.data.job ? res.data.job : '',
                        role: !!res.data.role ? res.data.role : 'Request',
                    })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        Axios.post(`/api/resident`, formData)
            .then(res => {
                setLoading(false)
                setSent(true)
                setToast('Residency Updated!')
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={12}>
                    <h5 className='mt-3'>Residency Details</h5>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={formData.f_name} type="text" name='f_name' placeholder="input full name ..." required onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Job</Form.Label>
                        <Form.Control value={formData.job} type="text" name='job' placeholder="input job ..." onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control value={formData.b_date} type="date" name='b_date' placeholder="20 Mar 1994" required onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <select value={formData.gender} className="custom-select d-block" name='gender' required onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={formData.address} type="text" name='address' placeholder="input address ..." required onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control value={formData.contact_no} type="tel" pattern="[0-9]{11}" title="e.g. 09123456789" name='contact_no' placeholder="input contact number ..." required onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Button variant='primary float-right' type='submit' disabled={!!!user || loading}>{loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Update'}</Button>
                </Col>
            </Row>
        </Form>
    );
}