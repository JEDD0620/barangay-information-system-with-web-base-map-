import Axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'
import Select from 'react-select'

export const CreateModal = ({ data, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState({
        recurence: 'none',
        resident_id: null,
        duty: moment().format('YYYY-MM-DD'),
        in: '08:00',
        out: '17:00',
        times: 1,
    })
    const [searchInput, setSearchInput] = useState("")
    const [options, setOptions] = useState()

    useEffect(() => {
        setFormdata({
            recurence: 'none',
            resident_id: null,
            duty: moment().format('YYYY-MM-DD'),
            in: '08:00',
            out: '17:00',
            times: 1,
        })
    }, [data])

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
                <Modal.Title>Create Schedule</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Select
                                    options={options}
                                    onInputChange={(v) => setSearchInput(v)}
                                    isSearchable={true}
                                    placeholder='select residence ...'
                                    onChange={(e) => setFormdata({ ...formData, resident_id: e.value })}
                                    required
                                />
                                <Form.Control type='text' name='fix' className='d-none' defaultValue={formData.resident_id} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Duty Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    min={moment().format("yyyy-MM-DD")}
                                    name='duty'
                                    placeholder="input date here ..."
                                    required onChange={handleChange}
                                    value={formData.duty}
                                    required
                                // disabled={formData.recurence == 'weekdays' || formData.recurence == 'weekends'}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Repeat</Form.Label>
                                <Select
                                    options={[
                                        { label: 'None', value: 'none' },
                                        { label: 'Weekdays', value: 'weekdays' },
                                        { label: 'Weekends', value: 'weekends' },
                                        { label: 'Daily', value: 'daily' },
                                        // { label: 'Weekly', value: 'weekly' },
                                        // { label: 'Monthly', value: 'monthly' },
                                    ]}
                                    placeholder='select recurence ...'
                                    onChange={(e) => setFormdata({ ...formData, recurence: e.value, duty: (e.value == 'weekends' || e.value == 'weekdays') ? moment().format('YYYY-MM-DD') : formData.duty })}
                                    defaultValue={{ label: 'None', value: 'none' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>{
                                    (formData.recurence == 'weekdays' || formData.recurence == 'weekends' || formData.recurence == 'weekly') ? "No. of Weeks"
                                        : formData.recurence == 'daily' ? 'No. of Days'
                                            : formData.recurence == 'monthly' ? 'No. of Months'
                                                : <span>&nbsp;</span>
                                }</Form.Label>
                                <Form.Control disabled={formData.recurence == 'none'} type="number" defaultValue={1} name='times' required={!!formData.to_time} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>In Time </Form.Label>
                                <Form.Control type="time" name='in' defaultValue={formData.in} placeholder="input time here ..." required={!!formData.to_time} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Out Time </Form.Label>
                                <Form.Control type="time" name='out' defaultValue={formData.out} placeholder="input time here ..." onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Create Schedule'}
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )
}


export const EditModal = ({ data, setData, handleAction, setArchiveData }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormdata] = useState(
        {
            recurence: data.recurence,
            resident_id: data.resident_id,
            duty: moment(data.duty).format('YYYY-MM-DD'),
            in: data.in,
            out: data.out,
            id: data.id,
            f_name: data.f_name,
            times: data.times
        }
    )

    useEffect(() => {
        setFormdata({
            recurence: data.recurence,
            resident_id: data.resident_id,
            duty: moment(data.duty).format('YYYY-MM-DD'),
            in: data.in,
            out: data.out,
            id: data.id,
            f_name: data.f_name,
            times: data.times
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
                <Modal.Title>Edit {data.f_name} schedule</Modal.Title>
            </Modal.Header>

            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                {!!data &&
                                    <Select
                                        options={options}
                                        onInputChange={(v) => setSearchInput(v)}
                                        isSearchable={true}
                                        placeholder='select residence ...'
                                        onChange={(e) => setFormdata({ ...formData, resident_id: e.value })}
                                        defaultValue={{ label: data.f_name, value: data.resident_id }}
                                    />
                                }
                                <Form.Control type='text' name='fix' className='d-none' defaultValue={formData.resident_id} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Duty Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    min={moment().format("yyyy-MM-DD")}
                                    name='duty'
                                    placeholder="input date here ..."
                                    required onChange={handleChange}
                                    defaultValue={moment(data.duty).format('YYYY-MM-DD')}
                                    required
                                // disabled={formData.recurence == 'weekends' || formData.recurence == 'weekdays'}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Repeat</Form.Label>
                                {!!data &&
                                    <Select
                                        options={[
                                            { label: 'None', value: 'none' },
                                            { label: 'Weekdays', value: 'weekdays' },
                                            { label: 'Weekends', value: 'weekends' },
                                            { label: 'Daily', value: 'daily' },
                                            // { label: 'Weekly', value: 'weekly' },
                                            // { label: 'Monthly', value: 'monthly' },
                                        ]}
                                        placeholder='select recurence ...'
                                        onChange={(e) => setFormdata({ ...formData, recurence: e.value, duty: (e.value == 'daily' || e.value == 'weekdays') ? moment().format('YYYY-MM-DD') : formData.duty })}
                                        defaultValue={{ label: data.recurence.charAt(0).toUpperCase() + data.recurence.slice(1), value: data.recurence }}
                                    />
                                }
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>{
                                    (formData.recurence == 'weekdays' || formData.recurence == 'weekends' || formData.recurence == 'weekly') ? "No. of Weeks"
                                        : formData.recurence == 'daily' ? 'No. of Days'
                                            : formData.recurence == 'monthly' ? 'No. of Months'
                                                : <span>&nbsp;</span>
                                }</Form.Label>
                                <Form.Control disabled={formData.recurence == 'none'} defaultValue={formData.times} type="number" name='times' required={!!formData.to_time} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>In Time </Form.Label>
                                <Form.Control type="time" name='in' defaultValue={formData.in} placeholder="input time here ..." required={!!formData.to_time} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Out Time </Form.Label>
                                <Form.Control type="time" name='out' defaultValue={formData.out} placeholder="input time here ..." onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='button' variant="danger" onClick={() => {setArchiveData(data); setData(false)}}>
                        Archive
                    </Button>
                    <Button variant="warning" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Edit Schedule'}
                    </Button>
                </Modal.Footer>
            </Form>

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
                <Modal.Title>Archive Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to archive {data.f_name} schedule?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Archive'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}