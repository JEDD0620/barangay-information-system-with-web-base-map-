import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { DeleteModal, CreateModal, EditModal, ViewModal } from './components/Modals'
import { queryUser } from '../../utils/user'
import _, { add } from 'lodash'

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [sort, setSort] = useState('schedules.updated_at');
    const [order, setOrder] = useState('asc');

    const [user, setUser] = useState();
    const [multiplier, setMultiplier] = useState(0);
    const weekdays = useRef(['Mon', 'Thu', 'Wed', 'Tue', 'Fri']);

    //modals
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [viewData, setViewData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getSchedules()
    }, [order, multiplier])

    useEffect(() => {
        queryUser(setUser)
    }, [])

    const getSchedules = (dontNull) => {
        if (!!!dontNull) {
            setSchedules(null);
        }

        Axios.get(`/api/schedule?order=${order}&sort=${sort}&multiplier=${multiplier}`)
            .then(res => {
                setSchedules(res.data)
            })
            .catch(err => console.log(err))
    }

    const changeSort = (v) => {

        if (order === 'desc' || sort != v) {
            setOrder('asc')
        } else {
            setOrder('desc')
        }

        setSort(v);

    }


    const createSchedule = (setModalLoading, data) => {
        Axios.post(`/api/schedule`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`New Schedule Created!`);
                setCreateData(false);
                if (sort == 'updated_at' && order == 'desc') {
                    getSchedules()
                } else {
                    setSort('updated_at');
                    setOrder('desc');
                }
            })
            .catch(err => console.log(err))
    }

    const editSchedule = (setModalLoading, data) => {
        Axios.put(`/api/schedule/${data.id}`, data)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${data.f_name} schedule Edited!`);
                setEditData(false);
                getSchedules(true);
            })
            .catch(err => console.log(err))
    }

    const deleteSchedule = (setModalLoading) => {
        Axios.delete(`/api/schedule/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.f_name} schedule Deleted!`);
                setDeleteData(false);
                getSchedules(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <Layout>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Schedules</h2>
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
                <Col md={7}>

                    {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                        <Button onClick={() => setCreateData(true)}>Create Schedule</Button>
                    }


                </Col>
                <Col md={5} className='text-right'>
                    <h3 className='d-inline-block mb-0 ml-3 align-middle'>{moment().add(multiplier, 'weeks').format('DD MMM YYYY')} - {moment().add(multiplier, 'weeks').add(6, 'days').format('DD MMM YYYY')}</h3>
                    <Button variant='outline-primary' className='ml-3' onClick={() => { setMultiplier(0) }}>Today</Button>
                    <Button variant='outline-primary' className='ml-1' onClick={() => { setMultiplier(multiplier - 1) }}><i className='fas fa-angle-left'></i></Button>
                    <Button variant='outline-primary' className='ml-1' onClick={() => { setMultiplier(multiplier + 1) }}><i className='fas fa-angle-right'></i></Button>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    {!!schedules ?
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th onClick={changeSort.bind(this, 'residents.f_name')}>
                                        <span>Name</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'residents.f_name' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'schedules.duty')}>
                                        <span>Duty</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'schedules.duty' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'schedules.in')}>
                                        <span>In</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'schedules.in' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>
                                    <th onClick={changeSort.bind(this, 'schedules.out')}>
                                        <span>Out</span>
                                        <span className="float-right">
                                            <i className={`fa fa-sort${!!sort && sort === 'schedules.out' ? order === 'asc' ? '-up' : '-down' : ''} `}></i>
                                        </span>
                                    </th>

                                    {
                                        _.times(7, (v) => {
                                            return (
                                                <th key={v} className={v == 0 && multiplier == 0 ? 'bg-success' : ''}>
                                                    <span>{moment().add(multiplier, 'weeks').add(v, 'days').format('ddd DD')}</span>
                                                </th>
                                            )
                                        })
                                    }

                                    {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                                        <th>
                                            <span>Action</span>
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {!!schedules && schedules.map((obj, i) => {
                                    let duty = obj.duty
                                    if (obj.recurence == 'monthly') {
                                        _.times(7, (v) => {
                                            if (moment().add(multiplier, 'weeks').add(v, 'days').date() == moment(obj.duty).date()) {
                                                duty = moment().add(multiplier, 'weeks').add(v, 'days').format('YYYY-MM-DD')
                                            } else {
                                                duty = null;
                                            }
                                        })

                                    }

                                    if (obj.recurence == 'weekly') {
                                        _.times(7, (v) => {
                                            if (moment().add(multiplier, 'weeks').add(v, 'days').day() == moment(obj.duty).day()) {
                                                duty = moment().add(multiplier, 'weeks').add(v, 'days').format('YYYY-MM-DD')
                                            }
                                        })
                                    }

                                    if (!!duty || obj.recurence == 'weekdays' || obj.recurence == 'daily') {
                                        return (
                                            <tr key={i}>
                                                <td>{obj.f_name}</td>
                                                <td>{!!duty ? moment(duty).format('D MMM YYYY') : <span className='text-capitalize'>{obj.recurence}</span>}</td>
                                                <td>{moment(obj.in, 'HH:mm:ss').format('hh:mm A')}</td>
                                                <td>{moment(obj.out, 'HH:mm:ss').format('hh:mm A')}</td>
                                                <td className={`pl-0 pr-0 border-0 ${multiplier == 0 && 'bg-success'}`}>
                                                    <div
                                                        className={`
                                                    ${moment().add(multiplier, 'weeks').add(0, 'days').format('YYYY-MM-DD') == duty && 'bg-primary '}
                                                    ${obj.recurence == 'daily' && 'bg-primary '}
                                                    ${obj.recurence == 'weekdays' && weekdays.current.includes(moment().add(multiplier, 'weeks').add(0, 'days').format('ddd')) && 'bg-primary '}
                                                    `}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </td>
                                                <td className='pl-0 pr-0 border-0'>
                                                    <div
                                                        className={`
                                                    ${moment().add(multiplier, 'weeks').add(1, 'days').format('YYYY-MM-DD') == duty && 'bg-primary '}
                                                    ${obj.recurence == 'daily' && 'bg-primary '}
                                                    ${obj.recurence == 'weekdays' && weekdays.current.includes(moment().add(multiplier, 'weeks').add(1, 'days').format('ddd')) && 'bg-primary '}
                                                `}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </td>
                                                <td className='pl-0 pr-0 border-0'>
                                                    <div
                                                        className={`
                                                    ${moment().add(multiplier, 'weeks').add(2, 'days').format('YYYY-MM-DD') == duty && 'bg-primary '}
                                                    ${obj.recurence == 'daily' && 'bg-primary '}
                                                    ${obj.recurence == 'weekdays' && weekdays.current.includes(moment().add(multiplier, 'weeks').add(2, 'days').format('ddd')) && 'bg-primary '}
                                                `}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </td>
                                                <td className='pl-0 pr-0 border-0'>
                                                    <div
                                                        className={`
                                                    ${moment().add(multiplier, 'weeks').add(3, 'days').format('YYYY-MM-DD') == duty && 'bg-primary '}
                                                    ${obj.recurence == 'daily' && 'bg-primary '}
                                                    ${obj.recurence == 'weekdays' && weekdays.current.includes(moment().add(multiplier, 'weeks').add(3, 'days').format('ddd')) && 'bg-primary '}
                                                `}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </td>
                                                <td className='pl-0 pr-0 border-0'>
                                                    <div
                                                        className={`
                                                    ${moment().add(multiplier, 'weeks').add(4, 'days').format('YYYY-MM-DD') == duty && 'bg-primary '}
                                                    ${obj.recurence == 'daily' && 'bg-primary '}
                                                    ${obj.recurence == 'weekdays' && weekdays.current.includes(moment().add(multiplier, 'weeks').add(4, 'days').format('ddd')) && 'bg-primary '}
                                                `}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </td>
                                                <td className='pl-0 pr-0 border-0'>
                                                    <div
                                                        className={`
                                                    ${moment().add(multiplier, 'weeks').add(5, 'days').format('YYYY-MM-DD') == duty && 'bg-primary '}
                                                    ${obj.recurence == 'daily' && 'bg-primary '}
                                                    ${obj.recurence == 'weekdays' && weekdays.current.includes(moment().add(multiplier, 'weeks').add(5, 'days').format('ddd')) && 'bg-primary '}
                                                `}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </td>
                                                <td className='pl-0 pr-0 border-0'>
                                                    <div
                                                        className={`
                                                    ${moment().add(multiplier, 'weeks').add(6, 'days').format('YYYY-MM-DD') == duty && 'bg-primary '}
                                                    ${obj.recurence == 'daily' && 'bg-primary '}
                                                    ${obj.recurence == 'weekdays' && weekdays.current.includes(moment().add(multiplier, 'weeks').add(6, 'days').format('ddd')) && 'bg-primary '}
                                                `}
                                                    >
                                                        &nbsp;
                                                    </div>
                                                </td>
                                                {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                                                    <td className='text-center'>
                                                        <ButtonGroup size='sm'>
                                                            <Button variant="warning" onClick={() => setEditData(obj)}>Edit</Button>
                                                            <Button variant="danger" onClick={() => setDeleteData(obj)}>Delete</Button>
                                                        </ButtonGroup>
                                                    </td>
                                                }
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </Table>
                        :
                        <Spinner animation="border" variant="primary" className='mt-5' />
                    }
                </Col>
            </Row>

            <DeleteModal data={deleteData} setData={setDeleteData} handleAction={deleteSchedule} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createSchedule} />
            <EditModal data={editData} setData={setEditData} handleAction={editSchedule} />

        </Layout>
    );
}

if (document.querySelector('#schedules')) {
    ReactDOM.render(<Schedules />, document.querySelector('#schedules'));
}
