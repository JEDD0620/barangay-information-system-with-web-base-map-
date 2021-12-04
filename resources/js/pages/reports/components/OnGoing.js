import React, { useEffect, useState } from 'react'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../../elements/FillPaginate'
import { ViewOngoingModal } from './Modals'
import moment from 'moment'
import { getParams, setParams } from '../../../utils/links'

export const OnGoing = ({ toggle, setToggle }) => {
    const [reports, setReports] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('reports.updated_at');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(!!getParams('page') ? parseInt(getParams('page')) : 1);

    //modals
    const [viewData, setViewData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getReports()
    }, [sort, order, perPage, page, filter, toggle])

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

        Axios.get(`/api/report/ongoing?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
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

    const onCloseReport = (setModalLoading) => {
        Axios.put(`/api/report/${viewData.id}/close`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${viewData.resident_name} case is now closed!`);
                setViewData(false);
                setToggle(!toggle)

            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Row className='mb-3 mt-5'>
                <Col md={10}>
                    <h2>Ongoing Reports <Badge variant="primary">{!!reports ? reports.total : 0}</Badge></h2>
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

                    {/* <Button onClick={() => setCreateData(true)}>Create Report</Button> */}

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
                                        <span>Complainant</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'residents.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'residents.f_name')}>
                                        <span>Defendant</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'residents.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'users.f_name')}>
                                        <span>Respondent</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'users.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
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
                                            <td>{obj.anonymous ? 'Anonymous' : obj.reporter_name}</td>
                                            <td>{obj.resident_name}</td>
                                            <td>{obj.staff_name}</td>
                                            <td>{moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}</td>
                                            <td className='text-center'>
                                                <ButtonGroup size='sm'>
                                                    <Button variant="info" onClick={() => setViewData(obj)}>View</Button>
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
                        "there's no ongoing reports yet ..."
                    }
                </Col>
            </Row>

            <ViewOngoingModal data={viewData} setData={setViewData} handleAction={onCloseReport} />
        </>
    );
}