import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge, Card } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { DeleteModal, CreateModal, EditModal, ViewModal } from './components/Modals'
import { queryUser } from '../../utils/user'
import { getParams, setParams } from '../../utils/links'

const Events = () => {
    const [events, setEvents] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('posts.from_date');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(!!getParams('page') ? parseInt(getParams('page')) : 1);
    const [user, setUser] = useState();

    //modals
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [viewData, setViewData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getEvents()
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

    const getEvents = (dontNull) => {
        if (!!!dontNull) {
            setEvents(null);
        }

        Axios.get(`/api/post/events?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
            .then(res => {
                setEvents(res.data)
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

    const createEvent = (setModalLoading, data) => {
        Axios.post(`/api/post`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`New Event Created!`);
                setCreateData(false);
                if (sort == 'updated_at' && order == 'desc' && page == 1) {
                    getEvents()
                } else {
                    setSort('updated_at');
                    setOrder('desc');
                    setPage(1);
                }
            })
            .catch(err => console.log(err))
    }

    const editEvent = (setModalLoading, data) => {
        Axios.put(`/api/post`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${data.f_name} Edited!`);
                setEditData(false);
                getEvents(true);
            })
            .catch(err => console.log(err))
    }

    const deleteEvent = (setModalLoading) => {
        Axios.delete(`/api/post/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.f_name} Deleted!`);
                setDeleteData(false);
                getEvents(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <Layout>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Events <Badge variant="primary">{!!events ? events.total : 0}</Badge></h2>
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

                    {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                        <Button onClick={() => setCreateData(true)}>Create Event</Button>
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

            {!!user && (user.role == 'Admin' || user.role == 'Staff') ?
                <Row>
                    <Col md={12}>
                        {!!events ?
                            <Table striped bordered hover className='mt-3'>
                                <thead>
                                    <tr>
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
                                            <span>Status</span>
                                        </th>
                                        {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                                            <th>
                                                <span>Action</span>
                                            </th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {!!events && events.data.map((obj, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{obj.title}</td>
                                                <td>{obj.f_name}</td>
                                                <td>{`${moment(obj.from_date).format('D MMM YYYY')}${!!obj.to_date ? ' - ' + moment(obj.to_date).format('D MMM YYYY') : ''}`}</td>
                                                <td>{`${!!obj.from_time ? moment(obj.from_time, "HH:mm:ss").format("hh:mm A") : ''}${!!obj.to_time ? ' - ' + moment(obj.to_time, "HH:mm:ss").format("hh:mm A") : ''}`}</td>
                                                <td>{moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}</td>
                                                <td>{(!!obj.to_date && moment(obj.from_date).unix() <= moment().unix() && moment(obj.to_date).unix() >= moment().unix()) || (!!!obj.to_date && moment(obj.from_date).unix() <= moment().unix()) ?
                                                    moment().isBetween(moment(obj.from_time, "HH:mm:ss"), moment(obj.to_time, "HH:mm:ss")) || (!!!obj.to_time && moment().isAfter(moment(obj.from_time, "HH:mm:ss"))) || !!!obj.from_time?
                                                        "Ongoing"
                                                        : moment().isAfter(moment(obj.to_time, "HH:mm:ss")) ?
                                                            "Done"
                                                            : "Upcomming"
                                                    :
                                                    'Upcomming'
                                                }</td>
                                                {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                                                    <td className='text-center'>
                                                        <ButtonGroup size='sm'>
                                                            <Button variant="info" onClick={() => setViewData(obj)}>View</Button>
                                                            <Button variant="warning" onClick={() => setEditData(obj)}>Edit</Button>
                                                            <Button variant="danger" onClick={() => setDeleteData(obj)}>Delete</Button>
                                                        </ButtonGroup>
                                                    </td>
                                                }
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
                :
                !!events && events.data.map(obj => {
                    return (
                        <Card className='mt-3' key={obj.id}>
                            <Card.Body>
                                <Card.Title>
                                    {obj.title} {(!!obj.to_date && moment(obj.from_date).unix() <= moment().unix() && moment(obj.to_date).unix() >= moment().unix()) || (!!!obj.to_date && moment(obj.from_date).unix() <= moment().unix()) ?
                                        moment().isBetween(moment(obj.from_time, "HH:mm:ss"), moment(obj.to_time, "HH:mm:ss")) || (!!!obj.to_time && moment().isAfter(moment(obj.from_time, "HH:mm:ss"))) || !!!obj.from_time?
                                            <Badge variant='success'>Ongoing</Badge>
                                            : moment().isAfter(moment(obj.to_time, "HH:mm:ss")) ?
                                                <Badge variant='secondary'>Done</Badge>
                                                : <Badge variant='warning'>Upcomming</Badge>
                                        : <Badge variant='warning'>Upcomming</Badge>
                                    }
                                </Card.Title>
                                <h6>
                                    {`${moment(obj.from_date).format('D MMM YYYY')}${!!obj.to_date ? ` to ${moment(obj.to_date).format('D MMM YYYY')}` : ''}`}
                                    {!!obj.from_time &&
                                        <small>
                                            {` at ${moment(obj.from_time, "HH:mm:ss").format("hh:mm A")}${!!obj.to_time ? ` to ${moment(obj.to_time, "HH:mm:ss").format("hh:mm A")}` : ''}`}
                                        </small>
                                    }
                                </h6>
                                <Card.Text>
                                    {obj.body}
                                </Card.Text>
                                <small className='text-muted'>
                                    <i className="far fa-clock align-baseline"></i> Posted: {moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}
                                </small>
                                {/* <Button type="button" variant='link' href='#comment'>Comment</Button> */}
                            </Card.Body>
                        </Card>
                    );
                })
            }

            <Row>
                <Col md={12}>
                    {!!events && <FillPaginate data={events} setPage={setPage} page={page} />}
                </Col>
            </Row>

            <DeleteModal data={deleteData} setData={setDeleteData} handleAction={deleteEvent} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createEvent} />
            <ViewModal data={viewData} setData={setViewData} handleAction={setEditData} />
            <EditModal data={editData} setData={setEditData} handleAction={editEvent} />

        </Layout>
    );
}

if (document.querySelector('#events')) {
    ReactDOM.render(<Events />, document.querySelector('#events'));
}
