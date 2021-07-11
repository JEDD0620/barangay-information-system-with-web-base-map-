import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'


export const CreateModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        type: 'Event',
        to_time: null
    })

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)
        handleAction(setLoading, formData)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
        setFormdata({ ...formData, to_time: null })
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
                <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name='title' placeholder="input event title ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name='body'
                                    placeholder="input event description ..."
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

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" name='from_date' placeholder="input date here ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date <small className='text-info'>optional</small></Form.Label>
                                <Form.Control type="date" name='to_date' placeholder="input date here ..." onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Time {!!!formData.to_time && <small className='text-info'>optional</small>}</Form.Label>
                                <Form.Control type="time" name='from_time' placeholder="input time here ..." required={!!formData.to_time} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Time <small className='text-info'>optional</small></Form.Label>
                                <Form.Control type="time" name='to_time' placeholder="input time here ..." onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Create Event'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}


export const EditModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState(
        {
            id: data.id,
            type: data.type,
            title: data.title,
            body: data.body,
            venue: data.venue,
            from_date: data.from_date,
            to_date: data.to_date,
            from_time: data.from_time,
            to_time: data.to_time,
        }
    )

    useEffect(() => {
        setFormdata({
            id: data.id,
            type: data.type,
            title: data.title,
            body: data.body,
            venue: data.venue,
            from_date: data.from_date,
            to_date: data.to_date,
            from_time: data.from_time,
            to_time: data.to_time,
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
                <Modal.Title>Edit {data.title}</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control defaultValue={data.title} type="text" name='title' placeholder="input event title ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    defaultValue={data.body}
                                    as="textarea"
                                    name='body'
                                    placeholder="input event description ..."
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

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control defaultValue={data.from_date} type="date" name='from_date' placeholder="input date here ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date <small className='text-info'>optional</small></Form.Label>
                                <Form.Control defaultValue={data.to_date} type="date" name='to_date' placeholder="input date here ..." onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Time {!!!formData.to_time && <small className='text-info'>optional</small>}</Form.Label>
                                <Form.Control defaultValue={data.from_time} type="time" name='from_time' placeholder="input time here ..." required={!!formData.to_time} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>End Time <small className='text-info'>optional</small></Form.Label>
                                <Form.Control defaultValue={data.to_time} type="time" name='to_time' placeholder="input time here ..." onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="warning" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Edit Event'}
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
                <Modal.Title>Delete {data.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {data.title}?</Modal.Body>
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

export const ViewModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)

    const onAction = () => {
        handleAction(data)
        setData(false)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    return (
        <Modal show={!!data} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>View Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='text-center'>
                    <Col md={12}>
                        <h4>{data.title}</h4>
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Col md={12}>
                        <h6>
                            {`Event Date: ${moment(data.from_date).format('D MMM YYYY')}${!!data.to_date ? ` to ${moment(data.to_date).format('D MMM YYYY')}` : ''}`}
                        </h6>
                        {!!data.from_time &&
                            <span>
                                {` at ${moment(data.from_time, "HH:mm:ss").format("hh:mm A")}${!!data.to_time ? ` to ${moment(data.to_time, "HH:mm:ss").format("hh:mm A")}` : ''}`}
                            </span>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p>
                            {data.body}
                        </p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="warning" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Edit'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}