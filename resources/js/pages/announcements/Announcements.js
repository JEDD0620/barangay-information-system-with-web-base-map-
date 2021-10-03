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
import { capitalize } from 'lodash'

const Announcements = () => {
    const [announcements, setAnnouncements] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('posts.updated_at');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [dateSet, setDateSet] = useState("current");
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
            getAnnouncements()
        }, 100)
        return () => clearTimeout(delayDebounceFn)
    }, [sort, order, perPage, page, filter, dateSet])

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

    const getAnnouncements = (dontNull) => {
        if (!!!dontNull) {
            setAnnouncements(null);
        }

        Axios.get(`/api/post/announcements?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}&dateSet=${dateSet}`)
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
                if (sort == 'updated_at' && order == 'desc' && page == 1) {
                    getAnnouncements()
                } else {
                    setSort('updated_at');
                    setOrder('desc');
                    setPage(1);
                }
            })
            .catch(err => console.log(err))
    }

    const editAnnouncement = (setModalLoading, data) => {
        Axios.put(`/api/post`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${data.f_name} Edited!`);
                setEditData(false);
                getAnnouncements(true);
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
                            {capitalize(dateSet)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setDateSet('current')}>Current</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDateSet('done')}>Done</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
                        <Button onClick={() => setCreateData(true)}>Create Announcement</Button>
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
                        {!!announcements ?
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
                                    {!!announcements && announcements.data.map((obj, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{obj.title}</td>
                                                <td>{obj.f_name}</td>
                                                <td>{`${moment(obj.from_date).format('D MMM YYYY')}${!!obj.to_date ? ' - ' + moment(obj.to_date).format('D MMM YYYY') : ''}`}</td>
                                                <td>{`${!!obj.from_time ? moment(obj.from_time, "HH:mm:ss").format("hh:mm A") : ''}${!!obj.to_time ? ' - ' + moment(obj.to_time, "HH:mm:ss").format("hh:mm A") : ''}`}</td>
                                                <td>{moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}</td>
                                                <td>{
                                                    (!!!obj.to_date && moment().isSame(obj.from_date)) || (moment().isBetween(obj.from_date, obj.to_date, 'days', '[]')) ?
                                                        (moment().isBetween(moment(obj.from_time, "HH:mm:ss"), moment(obj.to_time, "HH:mm:ss"))) || (!!!obj.to_time && !!!obj.from_time) ?
                                                            'Ongoing'
                                                            : (moment().isBefore(moment(obj.from_time, "HH:mm:ss"))) ?
                                                                'Upcomming'
                                                                : (!!!obj.to_time && moment().isAfter(moment(obj.from_time, "HH:mm:ss"))) ?
                                                                    'Ongoing'
                                                                    :
                                                                    'Just Done'

                                                        : (!!!obj.to_date && moment().isBefore(obj.from_date)) ?
                                                            'Upcomming'
                                                            :
                                                            'Done'
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
                !!announcements && announcements.data.map(obj => {
                    return (
                        <Card className='mt-3' key={obj.id}>
                            <Card.Body className='text-center ml-4 mr-4'>
                                <Card.Title className='text-primary'>
                                    {obj.title}

                                    <br />

                                    {
                                        (!!!obj.to_date && moment().isSame(obj.from_date)) || (moment().isBetween(obj.from_date, obj.to_date, 'days', '[]')) ?
                                            (moment().isBetween(moment(obj.from_time, "HH:mm:ss"), moment(obj.to_time, "HH:mm:ss"))) || (!!!obj.to_time && !!!obj.from_time) ?
                                                <Badge variant='success'>Ongoing</Badge>
                                                : (moment().isBefore(moment(obj.from_time, "HH:mm:ss"))) ?
                                                    <Badge variant='warning'>Upcomming</Badge>
                                                    : (!!!obj.to_time && moment().isAfter(moment(obj.from_time, "HH:mm:ss"))) ?
                                                        <Badge variant='success'>Ongoing</Badge>
                                                        :
                                                        <Badge variant='secondary'>Just Done</Badge>

                                            : (!!!obj.to_date && moment().isBefore(obj.from_date)) ?
                                                <Badge variant='warning'>Upcomming</Badge>
                                                :
                                                <Badge variant='secondary'>Done</Badge>
                                    }
                                </Card.Title>
                                <h6>
                                    {`${moment(obj.from_date).format('D MMM YYYY')}${!!obj.to_date ? ` to ${moment(obj.to_date).format('D MMM YYYY')}` : ''}`}
                                    {!!obj.from_time &&
                                        <small>
                                            <br />
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
