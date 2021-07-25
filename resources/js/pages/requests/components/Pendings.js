import React, { useEffect, useState } from 'react'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../../elements/FillPaginate'
import moment from 'moment'
import { ApproveModal, CancelModal, CreateModal, DisapprovedModal, EditModal, ViewModal } from './Modals'
import { queryUser } from '../../../utils/user'

export const Pendings = ({ toggle, setToggle }) => {
    const [requests, setRequests] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('requests.id');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [user, setUser] = useState();

    //modals
    const [approveData, setApproveData] = useState(false);
    const [disapproveData, setDisapproveData] = useState(false);
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [cancelData, setCancelData] = useState(false);
    const [viewData, setViewData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getRequests()
    }, [sort, order, perPage, page, filter])

    useEffect(() => {
        queryUser(setUser)
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilter(term)
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [term])

    const getRequests = (dontNull) => {
        if (!!!dontNull) {
            setRequests(null);
        }

        Axios.get(`/api/request/pending?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
            .then(res => {
                setRequests(res.data)
            })
            .catch(err => console.log(err))
    }

    const changeSort = (v) => {
        setPage(1)

        if (order === 'desc' || sort != v) {
            setOrder('asc')
        } else {
            setOrder('desc')
        }

        setSort(v);

    }

    const handlePerPage = (num) => {
        setPerPage(num)
        setPage(1)
    }

    const approveRequest = (setModalLoading) => {
        Axios.put(`/api/request/${approveData.id}/approve`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${approveData.type} Approved!`);
                setApproveData(false);
                setToggle(!toggle)
                getRequests(true);
            })
            .catch(err => console.log(err))
    }

    const disapproveRequest = (setModalLoading) => {
        Axios.put(`/api/request/${disapproveData.id}/disapprove`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${disapproveData.type} Disapproved!`);
                setDisapproveData(false);
                setToggle(!toggle)
                getRequests(true);
            })
            .catch(err => console.log(err))
    }

    const cancelRequest = (setModalLoading) => {
        Axios.put(`/api/request/${cancelData.id}/cancel`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${cancelData.type} Cancelled!`);
                setCancelData(false);
                setToggle(!toggle)
                getRequests(true);
            })
            .catch(err => console.log(err))
    }

    const createRequest = (setModalLoading, data) => {
        Axios.post(`/api/request`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`Request Created!`);
                setCreateData(false);
                setToggle(!toggle)
                getRequests(true);
            })
            .catch(err => console.log(err))
    }

    const editRequest = (setModalLoading, data) => {
        Axios.put(`/api/request/${editData.id}`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${editData.type} Cancelled!`);
                setEditData(false);
                setToggle(!toggle)
                getRequests(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Open Requests <Badge variant="primary">{!!requests ? requests.total : 0}</Badge></h2>
                </Col>
                <Col md={2} className='text-right'>
                    <Toast onClose={() => setShowToast(false)} show={!!showToast} delay={3000} autohide>
                        <Toast.Header className='bg-success text-light' closeButton={false}>
                            <strong className="me-auto">{!!showToast && showToast}</strong>
                        </Toast.Header>
                    </Toast>
                </Col>

            </Row>

            <Row>
                <Col md={9}>
                    <Dropdown className='d-inline mr-4'>
                        <Dropdown.Toggle variant='outline-primary' id="dropdown-basic" className='pl-3 pr-3'>
                            {perPage}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handlePerPage.bind(this, 10)}>10</Dropdown.Item>
                            <Dropdown.Item onClick={handlePerPage.bind(this, 25)}>25</Dropdown.Item>
                            <Dropdown.Item onClick={handlePerPage.bind(this, 50)}>50</Dropdown.Item>
                            <Dropdown.Item onClick={handlePerPage.bind(this, 75)}>75</Dropdown.Item>
                            <Dropdown.Item onClick={handlePerPage.bind(this, 100)}>100</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button onClick={() => setCreateData(true)}>Create Request</Button>

                </Col>
                <Col md={3}>
                    <FormControl
                        placeholder="search ..."
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    {!!requests ?
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th onClick={changeSort.bind(this, 'requests.id')}>
                                        <span>ID</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'requests.id' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'residents.f_name')}>
                                        <span>Resident</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'residents.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'requests.type')}>
                                        <span>Type</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'requests.type' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'requests.purpose')}>
                                        <span>Purpose</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'requests.purpose' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>

                                    <th>
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!requests && requests.data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{obj.id}</td>
                                            <td>{obj.type == 'Residency' ? <>{obj.f_name} {<small>from</small>} {obj.address}</> : obj.resident_name}</td>
                                            <td>{obj.type}</td>
                                            <td>{obj.purpose}</td>
                                            <td className='text-center'>
                                                {!!user && user.id != obj.user_id ?
                                                    <ButtonGroup size='sm'>
                                                        <Button variant="info" onClick={() => setViewData(obj)}>View</Button>
                                                        <Button variant="secondy" onClick={() => setApproveData(obj)}>Approve</Button>
                                                        <Button variant="danger" onClick={() => setDisapproveData(obj)}>Disapproved</Button>
                                                    </ButtonGroup>
                                                    :
                                                    <ButtonGroup size='sm'>
                                                        <Button variant="info" onClick={() => setViewData(obj)}>View</Button>
                                                        <Button variant="warning" onClick={() => setEditData(obj)}>Edit</Button>
                                                        <Button variant="secondary" onClick={() => setCancelData(obj)}>Cancel</Button>
                                                    </ButtonGroup>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        :
                        <Spinner animation="border" variant="primary" className='mt-5' />
                    }
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    {!!requests && requests.data.length > 0 ?
                        <FillPaginate data={requests} setPage={setPage} page={page} />
                        :
                        "there's no open requests yet ..."
                    }
                </Col>
            </Row>

            <ApproveModal data={approveData} setData={setApproveData} handleAction={approveRequest} />
            <DisapprovedModal data={disapproveData} setData={setDisapproveData} handleAction={disapproveRequest} />
            <CancelModal data={cancelData} setData={setCancelData} handleAction={cancelRequest} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createRequest} />
            <EditModal data={editData} setData={setEditData} handleAction={editRequest} />
            <ViewModal data={viewData} setData={setViewData} />

        </>
    );
}
