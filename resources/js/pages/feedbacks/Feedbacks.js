import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { DeleteModal, AssignModal, CreateModal, EditModal } from './components/Modals'
import { tosef } from '../../utils/links'

const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('feedbacks.id');
    const [order, setOrder] = useState('desc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    //modals
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [assignData, setAssignData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getFeedbacks()
    }, [sort, order, perPage, page, filter])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilter(term)
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
                setSort('updated_at');
                setOrder('desc');
                setPage(1);
            })
            .catch(err => console.log(err))
    }

    const editFeedback = (setModalLoading, data) => {
        Axios.put(`/api/feedback`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${data.f_name} Editted!`);
                setEditData(false);
                setSort('updated_at');
                setOrder('desc');
                setPage(1);
            })
            .catch(err => console.log(err))
    }

    const deleteFeedback = (setModalLoading) => {
        Axios.delete(`/api/feedback/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.f_name} Deleted!`);
                setDeleteData(false);
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
                                    <th onClick={changeSort.bind(this, 'users.f_name')}>
                                        <span>Author</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'users.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'comment_count')}>
                                        <span>Stats</span>
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
                                            <td>{obj.f_name}</td>
                                            <td><span>Comments: {obj.comment_count}</span></td>
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

            <DeleteModal data={deleteData} setData={setDeleteData} handleAction={deleteFeedback} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createFeedback} />
            <EditModal data={editData} setData={setEditData} handleAction={editFeedback} />

        </Layout>
    );
}

if (document.querySelector('#feedbacks')) {
    ReactDOM.render(<Feedbacks />, document.querySelector('#feedbacks'));
}
