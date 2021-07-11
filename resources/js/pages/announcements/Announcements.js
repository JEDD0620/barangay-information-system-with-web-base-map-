import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { DeleteModal, CreateModal, EditModal, ViewModal } from './components/Modals'

const Announcements = () => {
    const [announcements, setAnnouncements] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('posts.id');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    //modals
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [viewData, setViewData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getAnnouncements()
    }, [sort, order, perPage, page, filter])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilter(term)
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [term])

    const getAnnouncements = (dontNull) => {
        if (!!!dontNull) {
            setAnnouncements(null);
        }

        Axios.get(`/api/post/announcements?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
            .then(res => {
                setAnnouncements(res.data)
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

    const createAnnouncement = (setModalLoading, data) => {
        Axios.post(`/api/post`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`New Announcement Created!`);
                setCreateData(false);
                setSort('updated_at');
                setOrder('desc');
                setPage(1);
            })
            .catch(err => console.log(err))
    }

    const editAnnouncement = (setModalLoading, data) => {
        Axios.put(`/api/post`, data)
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

    const deleteAnnouncement = (setModalLoading) => {
        Axios.delete(`/api/post/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.f_name} Deleted!`);
                setDeleteData(false);
                getAnnouncements(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <Layout>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Announcements <Badge variant="primary">{!!announcements ? announcements.total : 0}</Badge></h2>
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

                    <Button onClick={() => setCreateData(true)}>Create Announcement</Button>

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
                    {!!announcements ?
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th onClick={changeSort.bind(this, 'posts.id')}>
                                        <span>ID</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'posts.id' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'posts.title')}>
                                        <span>Title</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'posts.title' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'users.f_name')}>
                                        <span>Author</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'users.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'posts.from_date')}>
                                        <span>Date</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'posts.from_date' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'posts.from_time')}>
                                        <span>Time</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'posts.from_time' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'posts.updated_at')}>
                                        <span>Updated</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'posts.updated_at' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th>
                                        <span>Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!announcements && announcements.data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{obj.id}</td>
                                            <td>{obj.title}</td>
                                            <td>{obj.f_name}</td>
                                            <td>{`${moment(obj.from_date).format('D MMM YYYY')}${!!obj.to_date ? ' - ' + moment(obj.to_date).format('D MMM YYYY') : ''}`}</td>
                                            <td>{`${!!obj.from_time ? moment(obj.from_time, "HH:mm:ss").format("hh:mm A") : ''}${!!obj.to_time ? ' - ' + moment(obj.to_time, "HH:mm:ss").format("hh:mm A") : ''}`}</td>
                                            <td>{moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}</td>
                                            <td className='text-center'>
                                                <ButtonGroup size='sm'>
                                                    <Button variant="info" onClick={() => setViewData(obj)}>View</Button>
                                                    <Button variant="warning" onClick={() => setEditData(obj)}>Edit</Button>
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
                    {!!announcements && <FillPaginate data={announcements} setPage={setPage} page={page} />}
                </Col>
            </Row>

            <DeleteModal data={deleteData} setData={setDeleteData} handleAction={deleteAnnouncement} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createAnnouncement} />
            <EditModal data={editData} setData={setEditData} handleAction={editAnnouncement} />
            <ViewModal data={viewData} setData={setViewData} handleAction={setEditData} />

        </Layout>
    );
}

if (document.querySelector('#announcements')) {
    ReactDOM.render(<Announcements />, document.querySelector('#announcements'));
}