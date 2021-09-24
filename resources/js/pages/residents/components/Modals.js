import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'


export const CreateModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        role: 'Resident',
        gender: 'Male',
    })

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)
        handleAction(setLoading, formData)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormdata({ ...formData, [name]: value });
    };

    return (
        <Modal show={!!data} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Create Resident</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name='f_name' placeholder="input full name ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <select className="custom-select d-block" name='role' required onChange={handleChange}>
                                    <option value="Resident">Resident</option>
                                    <option value="Brgy.Kapitan">Brgy.Kapitan</option>
                                    <option value="Brgy.Kagawad">Brgy.Kagawad</option>
                                    <option value="SK Chairman">SK Chairman</option>
                                    <option value="SK Kagawad">SK Kagawad</option>
                                    <option value="Brgy.Treasurer">Brgy.Treasurer</option>
                                    <option value="Brgy.Secretary">Brgy.Secretary</option>
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="date" name='b_date' placeholder="20 Mar 1994" required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <select className="custom-select d-block" name='gender' required onChange={handleChange}>
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
                                <Form.Control type="text" name='address' placeholder="input address ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="tel" pattern="[0-9]{11}" title="e.g. 09123456789" name='contact_no' placeholder="input contact number ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Create Resident'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}


export const EditModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState(null)

    useEffect(() => {
        setFormdata({
            id: data.id,
            f_name: data.f_name,
            role: data.role,
            gender: data.gender,
            address: data.address,
            b_date: data.b_date,
            contact_no: data.contact_no,
        })
    }, [data])

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)
        handleAction(setLoading, formData)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormdata({ ...formData, [name]: value });
    };

    return (
        <Modal show={!!data} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit {data.f_name}</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control defaultValue={data.f_name} type="text" name='f_name' placeholder="input full name ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <select defaultValue={data.role} className="custom-select d-block" name='role' required onChange={handleChange}>
                                    <option value="Resident">Resident</option>
                                    <option value="Brgy.Kapitan">Brgy.Kapitan</option>
                                    <option value="Brgy.Kagawad">Brgy.Kagawad</option>
                                    <option value="SK Chairman">SK Chairman</option>
                                    <option value="SK Kagawad">SK Kagawad</option>
                                    <option value="Brgy.Treasurer">Brgy.Treasurer</option>
                                    <option value="Brgy.Secretary">Brgy.Secretary</option>
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control defaultValue={data.b_date} type="date" name='b_date' placeholder="20 Mar 1994" required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <select defaultValue={data.gender} className="custom-select d-block" name='gender' required onChange={handleChange}>
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
                                <Form.Control type="text" defaultValue={data.address} name='address' placeholder="input address ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control defaultValue={data.contact_no} type="tel" pattern="[0-9]{11}" title="e.g. 09123456789" name='contact_no' placeholder="input contact number ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Edit Resident'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export const DeleteModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)

    const onAction = () => {
        setLoading(true)
        handleAction(setLoading)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    return (
        <Modal show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {data.f_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {data.f_name}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}