import Axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'
import Select from 'react-select'
import { queryUser } from '../../../utils/user'

export const CreateModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        anonymous: true
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
        handleAction(setLoading, formData)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    const handleChange = e => {
        const { name, value } = e.target;

        if (name == 'photo') {
            setFormdata({ ...formData, [name]: e.currentTarget.files[0] });
        } else if (name == 'anonymous') {
            setFormdata({ ...formData, [name]: !formData.anonymous });
        }
        else {
            setFormdata({ ...formData, [name]: value });
        }

        if (name == 'body') {
            e.target.style.height = "0px";
            let scrollHeight = e.target.scrollHeight + 16;
            e.target.style.height = scrollHeight + "px";
        }
    };


    return (
        <Modal show={!!data} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Create Report</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Anonymous"
                                    name='anonymous'
                                    onChange={handleChange}
                                    defaultChecked
                                />
                                {/* <Form.Check type="checkbox" defaultChecked name='Anonymous' label='Anonymous' onChange={handleChange} /> */}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Defendant</Form.Label>
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
                                <Form.Label>Photo</Form.Label>
                                <Form.Control
                                    type='file'
                                    name='photo'
                                    id="custom-file"
                                    accept="image/*" capture
                                    custom
                                    placeholder="upload photo ..."
                                    onChange={handleChange}
                                    defaultValue={data.photo}
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
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Create Report'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export const EditModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        id: data.id,
        case: data.case,
        resident_id: data.resident_id,
        anonymous: data.anonymous,
    })

    useEffect(() => {
        setFormdata({
            id: data.id,
            case: data.case,
            resident_id: data.resident_id,
            anonymous: data.anonymous,
        })
    }, [data])

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
        handleAction(setLoading, formData)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    const handleChange = e => {
        const { name, value } = e.target;

        if (name == 'photo') {
            setFormdata({ ...formData, [name]: e.currentTarget.files[0] });
        } else if (name == 'anonymous') {
            setFormdata({ ...formData, [name]: !formData.anonymous });
        }
        else {
            setFormdata({ ...formData, [name]: value });
        }

        if (name == 'body') {
            e.target.style.height = "0px";
            let scrollHeight = e.target.scrollHeight + 16;
            e.target.style.height = scrollHeight + "px";
        }
    };


    return (
        <Modal show={!!data} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Report</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Anonymous"
                                    name='anonymous'
                                    onChange={handleChange}
                                    defaultChecked={formData.anonymous}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Defendant</Form.Label>
                                {!!data &&
                                    <Select
                                        options={options}
                                        onInputChange={(v) => setSearchInput(v)}
                                        isSearchable={true}
                                        placeholder='select residence ...'
                                        onChange={(e) => setFormdata({ ...formData, resident_id: e.value })}
                                        isDisabled={formData.type == 'Residency'}
                                        defaultValue={{ value: data.resident_id, label: data.resident_name }}
                                    />
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control
                                    type='file'
                                    name='photo'
                                    placeholder="upload photo ..."
                                    onChange={handleChange}
                                // defaultValue={data.photo}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>case</Form.Label>
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
                                    defaultValue={data.case}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Edit Report'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export const ViewModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState()

    useEffect(() => { queryUser(setUser) }, [])

    const onAction = () => {
        setLoading(true)
        handleAction(setLoading)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    return (
        <Modal size='lg' show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Defendant: {data.resident_name} <br />
                Address: {data.resident_address} <br />
                Contact No: {data.resident_contact_no} <br />
                <p className='mt-3'>
                    {data.case}
                </p>
                <img src={data.photo} alt="" width='100%' height='auto' />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                    <Button variant="primary" onClick={onAction} disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Investigate'}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export const ViewOngoingModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState()

    useEffect(() => { queryUser(setUser) }, [])

    const onAction = () => {
        setLoading(true)
        handleAction(setLoading)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    return (
        <Modal size='lg' show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Resident: {data.resident_name} <br />
                Address: {data.resident_address} <br />
                Contact No: {data.resident_contact_no} <br />
                <p className='mt-3'>
                    {data.case}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                    <Button variant="success" onClick={onAction} disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Mark Report as Close'}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export const ViewClosedModal = ({ data, setData }) => {
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState()

    useEffect(() => { queryUser(setUser) }, [])

    const onAction = () => {
        setLoading(true)
        handleAction(setLoading)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    return (
        <Modal size='lg' show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Defendant: {data.resident_name} <br />
                Address: {data.resident_address} <br />
                Contact No: {data.resident_contact_no} <br />
                <p className='mt-3'>
                    {data.case}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const CancelModal = ({ data, setData, handleAction }) => {
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
                <Modal.Title>Cancel {data.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to cancel this report? <br />
                Defendant: {data.resident_name} <br />
                Address: {data.resident_address} <br />
                Contact No: {data.resident_contact_no} <br />
                <p className='mt-3'>
                    {data.case}
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Cancel Request '}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const ArchiveModal = ({ data, setData, handleAction }) => {
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
                <Modal.Title>Archive {data.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to archive this report? <br />
                Defendant: {data.resident_name} <br />
                Address: {data.resident_address} <br />
                Contact No: {data.resident_contact_no} <br />
                <p className='mt-3'>
                    {data.case}
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Archive '}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}