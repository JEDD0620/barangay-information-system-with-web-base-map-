import Axios from 'axios';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { AgreeModal } from './Modals';

export const Residency = ({ user, setToast }) => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [agreeData, setAgreeData] = useState(false);
    const [formData, setFormData] = useState({
        f_name: '',
        b_date: '',
        address: '',
        contact_no: '',
        gender: 'Male',
        civil_status: 'Single',
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
                        civil_status: res.data?.civil_status,
                        residency_date: res.data?.residency_date,
                        height: res.data?.height,
                        gender: res.data?.gender,
                        weight: res.data?.weight,
                        address: !!res.data.address ? res.data.address : '',
                        contact_no: !!res.data.contact_no ? res.data.contact_no : '',
                        // job: !!res.data.job ? res.data.job : '',
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
                <Col md={8}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={formData.f_name} type="text" name='f_name' placeholder="input full name ..." required onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control value={formData.b_date} type="date" max={moment().subtract(18, 'years').format("yyyy-MM-DD")} name='b_date' placeholder="20 Mar 1994" required onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Residency Date</Form.Label>
                        <Form.Control value={formData.residency_date} type="date" max={moment().format("yyyy-MM-DD")} name='residency_date' required onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Civil Status</Form.Label>
                        <select value={formData.civil_status} className="custom-select d-block" name='civil_status' required onChange={handleChange}>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Separated">Separated</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Height</Form.Label>
                        <Form.Control value={formData.height} type="number" name='height' placeholder='in cm' required onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group className="mb-3">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control value={formData.weight} type="number" name='weight' placeholder='in kg' required onChange={handleChange} />
                    </Form.Group>
                </Col>

            </Row>

            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <select value={formData.gender} className="custom-select d-block" name='gender' required onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={formData.address} type="text" name='address' placeholder="input address ..." required onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control value={formData?.contact_no} type="tel" pattern='[0-9]{11}' title="e.g. 09123456789" name='contact_no' placeholder="input contact number ..." required onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={12} className='text-right'>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" name='agree' required label={<span>I Agree to the <a className='text-primary font-weight-bold' onClick={() => setAgreeData(true)}>Terms and Condition</a>.</span>} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Button variant='primary float-right' type='submit' disabled={!!!user || loading}>{loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Update'}</Button>
                </Col>
            </Row>
            <AgreeModal data={agreeData} setData={setAgreeData} />
        </Form>

    );
}