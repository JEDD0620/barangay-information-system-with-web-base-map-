import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap'
import Select from 'react-select'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export const CreateModal = ({ data, location, setLocation, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)

    const [formData, setFormdata] = useState()

    useEffect(() => {
        setFormdata({
            lat: location.lat,
            lng: location.lng,
        })
    }, [location])

    const onAction = () => {
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

        if (name == 'body') {
            e.target.style.height = "0px";
            let scrollHeight = e.target.scrollHeight + 16;
            e.target.style.height = scrollHeight + "px";
        }
    };

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

    return (
        <Modal show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Assign Resident Lcoation</Modal.Title>
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
                        {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}


export const RemoveModal = ({ data, location, setLocation, setData, handleAction }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = () => {
        setLoading(true)
        Axios.delete(`/api/map/${data.id}`)
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
        <Modal show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove {data.f_name} Lcoation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to remove {data.f_name}'s location?

            </Modal.Body>
            <Modal.Footer>
                <Button type='button' variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" disabled={loading} onClick={handleDelete}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Remove'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}