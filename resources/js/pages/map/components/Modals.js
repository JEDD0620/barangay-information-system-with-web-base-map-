import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap'
import Select from 'react-select'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import moment from 'moment-timezone'

export const CreateModal = ({ data, location, setLocation, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)

    const [formData, setFormdata] = useState({
        type: 'Structures',
    })

    useEffect(() => {
        if (!!location) {
            setFormdata({
                lat: !!location.lat ? location.lat : 0,
                lng: !!location.lng ? location.lng : 0,
                type: 'Structures',
            })
        }
    }, [location])

    const onAction = (e) => {
        e.preventDefault();
        setLoading(true)
        Axios.post(`/api/map`, formData)
            .then(res => {
                handleAction(setLoading)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleClose = () => {
        setData(false)
        setLocation(false)
        setLoading(false)
    }

    const handleChange = e => {

        const { name, value } = e.target;
        setFormdata({ ...formData, [name]: value });

        if (name == 'details') {
            e.target.style.height = "0px";
            let scrollHeight = e.target.scrollHeight + 16;
            e.target.style.height = scrollHeight + "px";
        }
    };

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

    const [fileName, setFileName] = useState("");

    const onChangeFile = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.currentTarget.files[0]);

        reader.onload = () => {
            setFormdata({ ...formData, photo: reader.result })
        };

        reader.onerror = (error) => {
            setFormdata({ ...formData, photo: null })
        };
        setFileName(e.currentTarget.files[0].name)
    }


    return (
        <Modal show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Assign Resident Location</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onAction}>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <select className="custom-select d-block" name='type' required onChange={handleChange}>
                                    <option value="Structures">Structures</option>
                                    <option value="Events">Events</option>
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>

                    {formData.type == 'Structures' ?
                        <>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Photo</Form.Label>
                                        <Form.File
                                            id="custom-file"
                                            accept=".jpg, .jpeg"
                                            label={!!fileName ? fileName : ""}
                                            custom
                                            onInput={onChangeFile}
                                            placeholder="add photo ..."
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Label</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name='label'
                                            placeholder="input location label ..."
                                            required
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name='details'
                                            placeholder="input location description ..."
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
                        </>
                        :
                        <>
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
                                        <Form.Control type="date" min={moment().format("yyyy-MM-DD")} name='from_date' placeholder="input date here ..." required onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>End Date <small className='text-info'>optional</small></Form.Label>
                                        <Form.Control type="date" min={moment().format("yyyy-MM-DD")} name='to_date' placeholder="input date here ..." onChange={handleChange} />
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

                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={loading}>
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}


export const RemoveModal = ({ data, location, setLocation, setData, handleAction, residentData }) => {
    const [loading, setLoading] = useState(false)
    const [removeData, setRemoveData] = useState(false)

    useEffect(() => {
        if (!!location && !!residentData)
            residentData.some(obj => {
                if (obj.lat == location.lat && obj.lng == location.lng) {
                    setRemoveData(obj);
                    return true;
                }
            });
    }, [data, location])

    const handleArchive = () => {
        setLoading(true)
        if (!!removeData?.title)
            Axios.delete(`/api/map/event/${removeData.id}`)
                .then(res => {
                    handleAction(setLoading)
                })
                .catch(err => {
                    console.log(err);
                })
        else
            Axios.delete(`/api/map/loc/${removeData.id}`)
                .then(res => {
                    handleAction(setLoading)
                })
                .catch(err => {
                    console.log(err);
                })
    }

    const handleClose = () => {
        setData(false)
        setLocation(false)
    }


    return (
        <Modal show={!!removeData && !!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to remove this location?
            </Modal.Body>
            <Modal.Footer>
                <Button type='button' variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" disabled={loading} onClick={handleArchive}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Remove'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}