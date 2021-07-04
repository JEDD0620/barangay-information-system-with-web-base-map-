import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, ToastContainer } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { DeleteModal, AssignModal } from './components/Modals'

const Users = () => {
    const [users, setUsers] = useState();
    const [filter, setFilter] = useState('');
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    //modals
    const [newModal, setNewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [assignData, setAssignData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getUsers()
    }, [sort, order, perPage, page, filter])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilter(term)
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [term])

    const getUsers = (dontNull) => {
        if (!!!dontNull) {
            setUsers(null);
        }

        Axios.get(`/api/users?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}&filter=${filter}`)
            .then(res => {
                setUsers(res.data)
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

    const deleteUser = (setModalLoading) => {
        Axios.delete(`/api/user/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.username} Deleted!`);
                setDeleteData(false);
                getUsers(true);
            })
            .catch(err => console.log(err))
    }

    const assignUser = (setModalLoading) => {
        Axios.put(`/api/user/assign`, { id: assignData.id })
            .then(res => {
                setModalLoading(false);
                if (res.data) {
                    setShowToast(`${assignData.username} set as staff!`);
                } else {
                    setShowToast(`${assignData.username} unset as staff!`);
                }
                setAssignData(false);
                getUsers(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <Layout>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Users</h2>
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


                    {/* <Button>New User</Button> */}
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
                    {!!users ?
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th onClick={changeSort.bind(this, 'id')}>
                                        <span>ID</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'id' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'f_name')}>
                                        <span>Full Name</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'username')}>
                                        <span>Username</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'username' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'email')}>
                                        <span>Email</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'email' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'contact_no')}>
                                        <span>Contact Number</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'contact_no' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'email_verified_at')}>
                                        <span>Verified</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'email_verified_at' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
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
                                {!!users && users.data.map((obj, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{obj.id}</td>
                                            <td>{obj.f_name}</td>
                                            <td>{obj.username}</td>
                                            <td>{obj.email}</td>
                                            <td>{obj.contact_no}</td>
                                            <td>{!!obj.email_verified_at ? 'yes' : 'no'}</td>
                                            <td>{moment(obj.updated_at).calendar()}</td>
                                            <td className='text-center'>
                                                {obj.role != 'Admin' &&
                                                    <ButtonGroup size='sm'>
                                                        <Button variant="info" onClick={() => setAssignData(obj)}>
                                                            {obj.role == 'Staff' ? 'Unset Staff' : 'Set Staff'}
                                                        </Button>
                                                        <Button variant="danger" onClick={() => setDeleteData(obj)}>Delete</Button>
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
                    {!!users && <FillPaginate data={users} setPage={setPage} page={page} />}
                </Col>
            </Row>

            <DeleteModal data={deleteData} setData={setDeleteData} handleAction={deleteUser} />
            <AssignModal data={assignData} setData={setAssignData} handleAction={assignUser} />

        </Layout>
    );
}

if (document.querySelector('#users')) {
    ReactDOM.render(<Users />, document.querySelector('#users'));
}
