import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../../elements/FillPaginate'

export const NotPendings = (toggle) => {
    const [requests, setRequests] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('requests.id');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    //modals

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getRequests()
    }, [sort, order, perPage, page, filter, toggle])

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

        Axios.get(`/api/request/not-pending?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
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
        Axios.delete(`/api/request/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.f_name} Deleted!`);
                setDeleteData(false);
                getRequests(true);
            })
            .catch(err => console.log(err))
    }

    const disapproveRequest = (setModalLoading) => {
        Axios.delete(`/api/request/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.f_name} Deleted!`);
                setDeleteData(false);
                getRequests(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Row className='mb-3 mt-5'>
                <Col md={10}>
                    <h2>Closed Requests <Badge variant="primary">{!!requests ? requests.total : 0}</Badge></h2>
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

                    {/* <Button onClick={() => setCreateData(true)}>Create Request</Button> */}

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

                                    <th onClick={changeSort.bind(this, 'requests.status')}>
                                        <span>Status</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'requests.status' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
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
                                            <td
                                                className={`text-capitalize font-weight-bold text-success ${obj.status == 'approved' ? 'text-success' : 'text-danger'}`}
                                            >
                                                {obj.status}
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
                        "there's no closed requests yet ..."
                    }
                </Col>
            </Row>


        </>
    );
}