import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
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
                <Modal.Title>Approve {data.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to Approve this {data.type}? <br />
                Resident: {data.type == 'Residency' ? data.f_name : data.resident_name} <br />

                {data.type == 'Residency' &&
                    <>
                        {'Address: ' + data.address}<br />
                        {'Birthdate: ' + moment(data.b_date).format('D MMM YYYY')}<br />
                        {'Gender: ' + data.gender}<br />
                        {'Contact No.: ' + data.contact_no}<br />
                        {!!data.job && 'Job: ' + data.job}
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Approve'}
                </Button>
            </Modal.Footer>
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
                Are you sure you want to Disapproved  this {data.type}? <br />
                Resident: {data.type == 'Residency' ? data.f_name : data.resident_name} <br />

                {data.type == 'Residency' &&
                    <>
                        {'Address: ' + data.address}<br />
                        {'Birthdate: ' + moment(data.b_date).format('D MMM YYYY')}<br />
                        {'Gender: ' + data.gender}<br />
                        {'Contact No.: ' + data.contact_no}<br />
                        {!!data.job && 'Job: ' + data.job}
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onAction} disabled={loading}>
                    {loading ? <Spinner animation="border" size='sm' variant="light" /> : 'Disapproved '}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}