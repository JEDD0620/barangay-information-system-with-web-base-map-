import React, { useEffect, useState } from 'react'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../../elements/FillPaginate'
import moment from 'moment'
import { ArchiveModal, ApproveModal } from './PendingModals'
import { getParams, setParams } from '../../../utils/links'

export const PendingResident = () => {
    const [residents, setResidents] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('updated_at');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(!!getParams('page') ? parseInt(getParams('page')) : 1);

    //modals
    const [approveData, setAppoveData] = useState(false);
    const [archiveData, setArchiveData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getResidents()
        }, 100)
        return () => clearTimeout(delayDebounceFn)
    }, [sort, order, perPage, page, filter])

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

    const getResidents = (dontNull) => {
        if (!!!dontNull) {
            setResidents(null);
        }

        Axios.get(`/api/resident/pending?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
            .then(res => {
                setResidents(res.data)
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


    const handleApprove = (setModalLoading, data) => {
        Axios.put(`/api/resident/approve`, { id: approveData.id })
            .then(res => {
                setModalLoading(false);
                setShowToast(`${approveData.f_name} Approved!`);
                setAppoveData(false);
                getResidents(true);
            })
            .catch(err => console.log(err))
    }

    const archiveResident = (setModalLoading) => {
        Axios.delete(`/api/resident/${archiveData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${archiveData.f_name} Archived!`);
                setArchiveData(false);
                getResidents(true);
            })
            .catch(err => console.log(err))
    }

    if (!!residents && residents.data.length > 0)
        return (
            <>

                <Row className='mb-3'>
                    <Col md={10}>
                        <h2>Pending Approvals <Badge variant="primary">{!!residents ? residents.total : 0}</Badge></h2>
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
                        {!!residents ?
                            <Table striped bordered hover className='mt-3'>
                                <thead>
                                    <tr>
                                        <th onClick={changeSort.bind(this, 'f_name')}>
                                            <span>Full Name</span>
                                            <span className="float-right">
                                                <i className={`fa fa-sort${!!sort && sort === 'f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                            </span>
                                        </th>
                                        <th onClick={changeSort.bind(this, 'role')}>
                                            <span>Status</span>
                                            <span className="float-right">
                                                <i className={`fa fa-sort${!!sort && sort === 'role' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                            </span>
                                        </th>
                                        <th onClick={changeSort.bind(this, 'b_date')}>
                                            <span>Birthday</span>
                                            <span className="float-right">
                                                <i className={`fa fa-sort${!!sort && sort === 'b_date' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                            </span>
                                        </th>
                                        <th onClick={changeSort.bind(this, 'gender')}>
                                            <span>Gender</span>
                                            <span className="float-right">
                                                <i className={`fa fa-sort${!!sort && sort === 'gender' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                            </span>
                                        </th>
                                        <th onClick={changeSort.bind(this, 'address')}>
                                            <span>Address</span>
                                            <span className="float-right">
                                                <i className={`fa fa-sort${!!sort && sort === 'address' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                            </span>
                                        </th>
                                        <th onClick={changeSort.bind(this, 'contact_no')}>
                                            <span>Contact Number</span>
                                            <span className="float-right">
                                                <i className={`fa fa-sort${!!sort && sort === 'contact_no' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                            </span>
                                        </th>
                                        <th onClick={changeSort.bind(this, 'updated_at')}>
                                            <span>Updated</span>
                                            <span className="float-right">
                                                <i className={`fa fa-sort${!!sort && sort === 'updated_at' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                            </span>
                                        </th>
                                        <th>
                                            <span>Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!!residents && residents.data.map((obj, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{obj.f_name}</td>
                                                <td>{obj.role}</td>
                                                <td>{moment(obj.b_date).format('D MMM YYYY')}</td>
                                                <td>{obj.gender}</td>
                                                <td>{obj.address}</td>
                                                <td>{obj.contact_no}</td>
                                                <td>{moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}</td>
                                                <td className='text-center'>
                                                    <ButtonGroup size='sm'>
                                                        <Button variant="info" onClick={() => setAppoveData(obj)}>Approve</Button>
                                                        <Button variant="danger" onClick={() => setArchiveData(obj)}>Archive</Button>
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
                        {!!residents && <FillPaginate data={residents} setPage={setPage} page={page} />}
                    </Col>
                </Row>

                <ArchiveModal data={archiveData} setData={setArchiveData} handleAction={archiveResident} />
                <ApproveModal data={approveData} setData={setAppoveData} handleAction={handleApprove} />

            </>
        );

    else
        return (
            <>
            </>
        )
}