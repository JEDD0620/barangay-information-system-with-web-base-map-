import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'



export const ViewModal = ({ data, setData, handleAction }) => {
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
        <Modal size='lg' show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Resident: {data.resident_name} <br />
                Address: {data.resident_address} <br />
                <p className='mt-3'>
                    {data.case}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Investigate'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const ViewOngoingModal = ({ data, setData, handleAction }) => {
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
        <Modal size='lg' show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Resident: {data.resident_name} <br />
                Address: {data.resident_address} <br />
                <p className='mt-3'>
                    {data.case}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Mark Report as Close'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const ViewClosedModal = ({ data, setData }) => {
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
        <Modal size='lg' show={!!data} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Resident: {data.resident_name} <br />
                Address: {data.resident_address} <br />
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