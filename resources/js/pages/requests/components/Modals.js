import Axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'
import Select from 'react-select'
import { queryUser } from '../../../utils/user'

export const CreateModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        type: 'Indigency',
        gender: 'Male',
    })

    const [user, setUser] = useState();

    useEffect(() => {
        queryUser(setUser)
    }, [])

    const [searchInput, setSearchInput] = useState()
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
                <Modal.Title>Create Request</Modal.Title>
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
                                    isDisabled
                                    placeholder={user?.f_name}
                                    onChange={(e) => setFormdata({ ...formData, resident_id: e.value })}
                                    required
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

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Create Request'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export const EditModal = ({ data, setData, handleAction }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        id: data.id,
        type: data.type,
        resident_id: data.resident_id,
        type: data.type,
        purpose: data.purpose,

        f_name: data.f_name,
        address: data.address,
        b_date: data.b_date,
        gender: data.gender,
        contact_no: data.contact_no,
        // job: data.job,
    })

    useEffect(() => {
        queryUser(setUser)
    }, [])

    useEffect(() => {
        setFormdata({
            id: data.id,
            type: data.type,
            resident_id: data.resident_id,
            type: data.type,
            purpose: data.purpose,

            f_name: data.f_name,
            address: data.address,
            b_date: data.b_date,
            gender: data.gender,
            contact_no: data.contact_no,
            // job: data.job,
        })
    }, [data])

    const [searchInput, setSearchInput] = useState()
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
                <Modal.Title>Edit Request</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Resident</Form.Label>
                                {!!data &&
                                    <Select
                                        options={options}
                                        onInputChange={(v) => setSearchInput(v)}
                                        isSearchable={true}
                                        isDisabled
                                        placeholder={user?.f_name}
                                    // onChange={(e) => setFormdata({ ...formData, resident_id: e.value })}
                                    // defaultValue={{ value: data.resident_id, label: data.resident_name }}
                                    />
                                }
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                {!!data &&
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
                                        defaultValue={{ value: data.type, label: data.type }}
                                    />
                                }
                            </Form.Group>
                        </Col>

                        {/* <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date Needed</Form.Label>
                                <Form.Control type="date" name='date' placeholder="input date here ..." required onChange={handleChange} defaultValue={data.date} />
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
                                    defaultValue={data.purpose}
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
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Edit Request'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}

export const ViewModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(false)

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
                <Modal.Title>View {data.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Resident: {data.type == 'Residency' ? data.f_name : data.resident_name} <br />


                {data.type == 'Residency' ?
                    <>
                        {'Address: ' + data.address}<br />
                        {'Birthdate: ' + moment(data.b_date).format('D MMM YYYY')}<br />
                        {'Gender: ' + data.gender}<br />
                        {'Contact No.: ' + data.contact_no}<br />
                        {/* {!!data.job && 'Job: ' + data.job} */}
                    </>
                    :
                    <>
                        Address: {data.resident_address} <br />
                        Contact No: {data.resident_contact_no} <br />
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const ApproveModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(false)

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)
        handleAction(setLoading, formData)
    }

    const handleClose = () => {
        setData(false)
        setLoading(false)
    }

    const handleChange = (e) => {
        setFormData({ date: e.target.value })
    }

    return (
        <Modal show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Approve {data.type}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onAction} >
                <Modal.Body>
                    Are you sure you want to Approve this {data.type} for {data.resident_name}? <br />
                    Resident: {data.type == 'Residency' ? data.f_name : data.resident_name} <br />

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Claim Date</Form.Label>
                                <Form.Control type="date" name='date' placeholder="set claim date" required onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer >
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' variant="success" disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Approve'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export const DisapprovedModal = ({ data, setData, handleAction }) => {
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
                <Modal.Title>Disapproved  {data.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to disapproved this {data.type}? <br />
                Resident: {data.type == 'Residency' ? data.f_name : data.resident_name} <br />

                {data.type == 'Residency' ?
                    <>
                        {'Address: ' + data.address}<br />
                        {'Birthdate: ' + moment(data.b_date).format('D MMM YYYY')}<br />
                        {'Gender: ' + data.gender}<br />
                        {'Contact No.: ' + data.contact_no}<br />
                        {/* {!!data.job && 'Job: ' + data.job} */}
                    </>
                    :
                    <>
                        Address: {data.resident_address} <br />
                        Contact No: {data.resident_contact_no} <br />
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Disapproved '}
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
                Are you sure you want to cancel this {data.type}? <br />
                Resident: {data.resident_name} <br />

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