import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner, Row, Col, Form } from 'react-bootstrap'

export const ApproveModal = ({ data, setData, handleAction }) => {
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
                <Modal.Title>Approve {data.f_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to approve ad resident:{data.f_name}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="info" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Approve'}
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
                <Modal.Title>Archive {data.f_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to archive {data.f_name}?</Modal.Body>
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