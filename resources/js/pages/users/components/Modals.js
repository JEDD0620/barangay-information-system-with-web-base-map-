import React, { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'


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
                <Modal.Title>Archive {data.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to archive {data.username}?</Modal.Body>
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

export const AssignModal = ({ data, setData, handleAction }) => {
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
                <Modal.Title>{data.role == 'Staff' ? 'Unset' : 'Set'} {data.username} as Staff</Modal.Title>
            </Modal.Header>
            {data.role == 'Staff' ?
                <Modal.Body>Are you sure you want to unset {data.username} as Staff?</Modal.Body>
                :
                <Modal.Body>Are you sure you want to set {data.username} as Staff?</Modal.Body>
            }
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : data.role == 'Staff' ? 'Unset as Staff' : 'Set as Staff'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}