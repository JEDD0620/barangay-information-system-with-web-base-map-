import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { ArchiveModal, AssignModal, CreateModal, EditModal } from './components/Modals'
import { getParams, setParams, tosef } from '../../utils/links'

const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('feedbacks.id');
    const [order, setOrder] = useState('desc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(!!getParams('page') ? parseInt(getParams('page')) : 1);

    //modals
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [archiveData, setArchiveData] = useState(false);
    const [assignData, setAssignData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getFeedbacks()
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

    const getFeedbacks = (dontNull) => {
        if (!!!dontNull) {
            setFeedbacks(null);
        }

        Axios.get(`/api/feedback?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
            .then(res => {
                setFeedbacks(res.data)
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

    const createFeedback = (setModalLoading, data) => {
        Axios.post(`/api/feedback`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`New Feedback Created!`);
                setCreateData(false);
                if (sort == 'updated_at' && order == 'desc' && page == 1) {
                    getFeedbacks()
                } else {
                    setSort('updated_at');
                    setOrder('desc');
                    setPage(1);
                }
            })
            .catch(err => console.log(err))
    }

    const editFeedback = (setModalLoading, data) => {
        Axios.put(`/api/feedback`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${data.f_name} Edited!`);
                setEditData(false);
                getFeedbacks(true);
            })
            .catch(err => console.log(err))
    }

    const archiveFeedback = (setModalLoading) => {
        Axios.delete(`/api/feedback/${archiveData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${archiveData.f_name} Archived!`);
                setArchiveData(false);
                getFeedbacks(true);
            })
            .catch(err => console.log(err))
    }


    return (
        <Layout>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Feedbacks <Badge variant="primary">{!!feedbacks ? feedbacks.total : 0}</Badge></h2>
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

                    <Button onClick={() => setCreateData(true)}>Create Feedback</Button>

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
                    {!!feedbacks ?
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th onClick={changeSort.bind(this, 'feedbacks.title')}>
                                        <span>Title</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'feedbacks.title' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'users.username')}>
                                        <span>Author</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'users.username' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'comment_count')}>
                                        <span>Comments</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'comment_count' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'feedbacks.updated_at')}>
                                        <span>Updated</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'feedbacks.updated_at' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th>
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!feedbacks && feedbacks.data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><a href={`/feedback/${tosef(obj.title)}.${obj.id}`}>{obj.title}</a></td>
                                            <td>{obj.username}</td>
                                            <td><span>{obj.comment_count}</span></td>
                                            <td>{moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}</td>
                                            <td className='text-center'>
                                                <a className='btn btn-sm btn-info' href={`/feedback/${tosef(obj.title)}.${obj.id}`}>view</a>
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
                    {!!feedbacks && <FillPaginate data={feedbacks} setPage={setPage} page={page} />}
                </Col>
            </Row>

            <ArchiveModal data={archiveData} setData={setArchiveData} handleAction={archiveFeedback} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createFeedback} />

        </Layout>
    );
}

if (document.querySelector('#feedbacks')) {
    ReactDOM.render(<Feedbacks />, document.querySelector('#feedbacks'));
}
