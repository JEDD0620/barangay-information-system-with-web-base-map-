import React, { useEffect, useState } from 'react'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../../elements/FillPaginate'
import moment from 'moment'
import { CancelModal, CreateModal, DeleteModal, EditModal, ViewModal } from './Modals'
import { queryUser } from '../../../utils/user'
import { getParams, setParams } from '../../../utils/links'

export const Pendings = ({ toggle, setToggle }) => {
    const [reports, setReports] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('reports.updated_at');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(!!getParams('page') ? parseInt(getParams('page')) : 1);
    const [user, setUser] = useState();

    //modals
    const [viewData, setViewData] = useState(false);
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [cancelData, setCancelData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getReports()
        }, 100)
        return () => clearTimeout(delayDebounceFn)
    }, [sort, order, perPage, page, filter])

    useEffect(() => {
        queryUser(setUser)
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (filter != term) {
                setParams('page', 1);
                setPage(1);
                setFilter(term);
            }
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [term])

    const getReports = (dontNull) => {
        if (!!!dontNull) {
            setReports(null);
        }

        Axios.get(`/api/report/pending?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
            .then(res => {
                setReports(res.data)
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

    const onInvestigateReport = (setModalLoading) => {
        Axios.put(`/api/report/${viewData.id}/investigate`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${viewData.resident_name} case is now ongoing investigation!`);
                setViewData(false);
                setToggle(!toggle)
                getReports(true);
            })
            .catch(err => console.log(err))
    }

    const cancelReport = (setModalLoading) => {
        Axios.put(`/api/report/${cancelData.id}/cancel`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${cancelData.resident_name} case cancelled!`);
                setCancelData(false);
                setToggle(!toggle)
                getReports(true);
            })
            .catch(err => console.log(err))
    }

    const createReport = (setModalLoading, data) => {
        Axios.post(`/api/report`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`Report created!`);
                setCreateData(false);
                setToggle(!toggle)
                getReports(true);
            })
            .catch(err => console.log(err))
    }

    const editReport = (setModalLoading, data) => {
        Axios.put(`/api/report/${editData.id}`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`Report editted!`);
                setEditData(false);
                setToggle(!toggle)
                getReports(true);
            })
            .catch(err => console.log(err))
    }

    const deleteReport = (setModalLoading, data) => {
        Axios.delete(`/api/report/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`Report Deleted!`);
                setDeleteData(false);
                setToggle(!toggle)
                getReports(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Pending Reports <Badge variant="primary">{!!reports ? reports.total : 0}</Badge></h2>
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

                    {!!user && user.role == 'Resident' &&
                        <Button onClick={() => setCreateData(true)}>Create Report</Button>
                    }

                </Col>
                <Col md={3}>
                    <FormControl
                        className='mt-2 mt-md-0'
                        placeholder="search ..."
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    {!!reports ?
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th onClick={changeSort.bind(this, 'residents.f_name')}>
                                        <span>Resident</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'residents.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'residents.address')}>
                                        <span>Address</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'residents.address' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'reports.updated_at')}>
                                        <span>Date</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'reports.updated_at' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th>
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!reports && reports.data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{obj.resident_name}</td>
                                            <td>{obj.resident_address}</td>
                                            <td>{moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}</td>
                                            <td className='text-center'>
                                                <ButtonGroup size='sm'>
                                                    <Button variant="info" onClick={() => setViewData(obj)}>View</Button>
                                                    {!!user && user.id == obj.user_id && <>
                                                        <Button variant="warning" onClick={() => setEditData(obj)}>Edit</Button>
                                                    </>}
                                                    <Button variant="danger" onClick={() => setDeleteData(obj)}>Delete</Button>
                                                </ButtonGroup>
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
                    {!!reports && reports.data.length > 0 ?
                        <FillPaginate data={reports} setPage={setPage} page={page} />
                        :
                        "there's no open reports yet ..."
                    }
                </Col>
            </Row>

            <ViewModal data={viewData} setData={setViewData} handleAction={onInvestigateReport} />
            <CancelModal data={cancelData} setData={setCancelData} handleAction={cancelReport} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createReport} />
            <EditModal data={editData} setData={setEditData} handleAction={editReport} />
            <DeleteModal data={deleteData} setData={setDeleteData} handleAction={deleteReport} />

        </>
    );
}
