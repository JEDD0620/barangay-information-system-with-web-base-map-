import Axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'
import Select from 'react-select'
import { tosef } from '../../../utils/links'

export const CreateRequest = ({ data, setData }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        type: 'Indigency',
    })

    const [searchInput, setSearchInput] = useState("")
    const [options, setOptions] = useState()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!!searchInput) {
                getOptions()
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [searchInput])

    const getOptions = () => {
        Axios.get(`/api/resident/search/${searchInput}`)
            .then(res => {
                let tempOption = [];
                res.data.map(obj => {
                    tempOption.push({
                        value: obj.id,
                        label: obj.f_name
                    })
                })
                setOptions(tempOption)
            })
            .catch(err => console.log(err))
    }

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)
        Axios.post(`/api/request`, formData)
            .then(res => {
                location = '/requests'
            })
            .catch(err => console.log(err))
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
                <Modal.Title>Send Request</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Resident</Form.Label>
                                <Select
                                    options={options}
                                    onInputChange={(v) => setSearchInput(v)}
                                    isSearchable={true}
                                    placeholder='select residence ...'
                                    onChange={(e) => setFormdata({ ...formData, resident_id: e.value })}
                                    required
                                    isDisabled={formData.type == 'Residency'}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Select
                                    options={[
                                        { label: 'Residency', value: 'Residency' },
                                        { label: 'Indigency', value: 'Indigency' },
                                        { label: 'Clearance', value: 'Clearance' },
                                        { label: 'Permit', value: 'Permit' },
                                    ]}
                                    onInputChange={(v) => setSearchInput(v)}
                                    isSearchable={true}
                                    placeholder='select type ...'
                                    onChange={(e) => setFormdata({ ...formData, type: e.value })}
                                    defaultValue={{ label: 'Indigency', value: 'Indigency' }}
                                />
                            </Form.Group>
                        </Col>

                        {/* <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date Needed</Form.Label>
                                <Form.Control type="date" name='date' placeholder="input date here ..." required onChange={handleChange} />
                            </Form.Group>
                        </Col> */}
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Purpose</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name='purpose'
                                    placeholder="input purpose ..."
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

                    {formData.type == 'Residency' &&
                        <>
                            <Row>
                                <Col md={12}>
                                    <h5 className='mt-3'>Residency Details</h5>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" name='f_name' placeholder="input full name ..." required onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                {/* <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Job</Form.Label>
                                        <Form.Control type="text" name='job' placeholder="input job ..." onChange={handleChange} />
                                    </Form.Group>
                                </Col> */}
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Birthdate</Form.Label>
                                        <Form.Control type="date" max={moment().subtract(18, 'years').format("yyyy-MM-DD")} name='b_date' placeholder="20 Mar 1994" required onChange={handleChange} />
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
                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Send Request'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}


export const CreateReport = ({ data, setData }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
    })

    const [searchInput, setSearchInput] = useState("")
    const [options, setOptions] = useState()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!!searchInput) {
                getOptions()
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [searchInput])

    const getOptions = () => {
        Axios.get(`/api/resident/search/${searchInput}`)
            .then(res => {
                let tempOption = [];
                res.data.map(obj => {
                    tempOption.push({
                        value: obj.id,
                        label: obj.f_name
                    })
                })
                setOptions(tempOption)
            })
            .catch(err => console.log(err))
    }

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)

        Axios.post(`/api/report`, formData)
            .then(res => {
                location = '/reports'
            })
            .catch(err => console.log(err))
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
                <Modal.Title>Send Report</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Resident</Form.Label>
                                <Select
                                    options={options}
                                    onInputChange={(v) => setSearchInput(v)}
                                    isSearchable={true}
                                    placeholder='select residence ...'
                                    onChange={(e) => setFormdata({ ...formData, resident_id: e.value })}
                                    required
                                    isDisabled={formData.type == 'Residency'}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Case</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name='case'
                                    placeholder="input case ..."
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
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Send Report'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export const CreateFeedback = ({ data, setData }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
    })

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)

        Axios.post(`/api/feedback`, formData)
            .then(res => {
                location = `/feedback/${tosef(res.data.title)}.${res.data.id}`
            })
            .catch(err => console.log(err))
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
                <Modal.Title>Send Feedback</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder='input title ...' name='title' required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    placeholder='input description here ...'
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
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Send Feedback'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}