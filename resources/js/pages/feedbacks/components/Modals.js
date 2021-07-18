import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'


export const CreateModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
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
                <Modal.Title>Create Feedback</Modal.Title>
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
                                    <option value="Captain">Brgy.Kapitan</option>
                                    <option value="Captain">Brgy.Kagawad</option>
                                    <option value="Kagawad">SK Chairman</option>
                                    <option value="Kagawad">SK Kagawad</option>
                                    <option value="Kagawad">Brgy.Treasurer</option>
                                    <option value="Kagawad">Brgy.Secretary</option>
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
                                <Form.Control type="tel" name='contact_no' placeholder="input contact number ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Create Feedback'}
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

        if (name == 'body') {
            e.target.style.height = "0px";
            let scrollHeight = e.target.scrollHeight + 16;
            e.target.style.height = scrollHeight + "px";
        }
    };

    return (
        <Modal show={!!data} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit {data.f_name}</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>


                    {!!data.title &&
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" defaultValue={data.title} name='title' required onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    }

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    defaultValue={data.body}
                                    name='body'
                                    required
                                    onChange={handleChange}
                                    style={{
                                        minHeight: '120px',
                                        overflow: 'hidden'
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="warning" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Edit'}
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
                    Cancel
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


export const DeleteCommentModal = ({ data, setData, handleAction }) => {
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
                <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Are you sure you want to delete {data.f_name}'s comment?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal >
    )
}