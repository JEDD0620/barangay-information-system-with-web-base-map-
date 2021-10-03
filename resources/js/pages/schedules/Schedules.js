import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Row, Col, Table, ButtonGroup, Button, Dropdown, FormControl, Spinner, Toast, Badge } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { DeleteModal, CreateModal, EditModal, ViewModal } from './components/Modals'
import { queryUser } from '../../utils/user'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [sort, setSort] = useState('schedules.updated_at');
    const [order, setOrder] = useState('asc');

    const [user, setUser] = useState();

    //modals
    const [createData, setCreateData] = useState(false);
    const [editData, setEditData] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [viewData, setViewData] = useState(false);
    const [events, setEvents] = useState([]);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getSchedules()
    }, [order])

    useEffect(() => {
        queryUser(setUser)
    }, [])

    useEffect(() => {
        setEvents([])
        let temp = [];
        schedules.forEach(obj => {
            if (obj.recurence == 'none') {
                temp.push({
                    data: obj,
                    title: `${obj.f_name} ${moment(obj.in, 'HH:mm:ss').format('hh:mm A')} - ${moment(obj.out, 'HH:mm:ss').format('hh:mm A')}`,
                    date: obj.duty,
                    color: '#38c172'
                })
            }

            if (obj.recurence == 'daily') {
                let end = moment(obj.duty).add(obj.times, 'day').format('YYYY-MM-DD')
                temp.push({
                    data: obj,
                    title: `${obj.f_name} ${moment(obj.in, 'HH:mm:ss').format('hh:mm A')} - ${moment(obj.out, 'HH:mm:ss').format('hh:mm A')}`,
                    start: obj.duty,
                    end: end,
                    color: '#9561e2'
                })
            }

            if (obj.recurence == 'weekdays') {
                [...Array(obj.times)].map((_, i) => {
                    let d = moment(obj.duty).add(i, 'week');
                    let start = moment().day("Monday").year(d.year()).week(d.week()).format('YYYY-MM-DD')
                    let end = moment().day("Saturday").year(d.year()).week(d.week()).format('YYYY-MM-DD')
                    temp.push({
                        data: obj,
                        title: `${obj.f_name} ${moment(obj.in, 'HH:mm:ss').format('hh:mm A')} - ${moment(obj.out, 'HH:mm:ss').format('hh:mm A')}`,
                        start: start,
                        end: end,
                        color: '#3490dc'
                    })
                })
            }

            if (obj.recurence == 'weekends') {
                [...Array(obj.times)].map((_, i) => {
                    let d = moment(obj.duty).add(i, 'week');
                    let start = moment().day("Sunday").year(d.year()).week(d.week()).format('YYYY-MM-DD')
                    let end = moment().day("Saturday").year(d.year()).week(d.week()).format('YYYY-MM-DD')
                    console.log(end);
                    temp.push({
                        data: obj,
                        title: `${obj.f_name} ${moment(obj.in, 'HH:mm:ss').format('hh:mm A')} - ${moment(obj.out, 'HH:mm:ss').format('hh:mm A')}`,
                        date: start,
                        color: '#f66d9b'
                    })
                    temp.push({
                        data: obj,
                        title: `${obj.f_name} ${moment(obj.in, 'HH:mm:ss').format('hh:mm A')} - ${moment(obj.out, 'HH:mm:ss').format('hh:mm A')}`,
                        date: end,
                        color: '#f66d9b'
                    })
                })
            }
        })

        setEvents(temp)

    }, [schedules])

    const getSchedules = () => {

        Axios.get(`/api/schedule`)
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
                getSchedules();
            })
            .catch(err => console.log(err))
    }

    const deleteSchedule = (setModalLoading) => {
        Axios.delete(`/api/schedule/${deleteData.id}`)
            .then(res => {
                setModalLoading(false);
                setShowToast(`${deleteData.f_name} schedule Deleted!`);
                setDeleteData(false);
                getSchedules();
            })
            .catch(err => console.log(err))
    }

    const handleEvent = (e) => {
        if (!!user && (user.role == 'Admin' || user.role == 'Staff'))
            setEditData(e.event.extendedProps.data)
    }

    return (
        <Layout>

            <Row className='mb-3'>
                <Col md={10}>
                    <h2 className="d-inline-block">Schedules</h2>
                    {!!user && (user.role == 'Admin' || user.role == 'Staff') &&
                        <Button className="ml-3 align-top" onClick={() => setCreateData(true)}>Create Schedule</Button>
                    }
                </Col>
                <Col md={2} className='text-right'>
                    <Toast onClose={() => setShowToast(false)} show={!!showToast} delay={3000} autohide>
                        <Toast.Header className='bg-success text-light' closeButton={false}>
                            <strong className="me-auto">{!!showToast && showToast}</strong>
                        </Toast.Header>
                    </Toast>
                </Col>

            </Row>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={() => console.log('ok')}
                eventClick={handleEvent}
                events={events}
            />

            <DeleteModal data={deleteData} setData={setDeleteData} handleAction={deleteSchedule} />
            <CreateModal data={createData} setData={setCreateData} handleAction={createSchedule} />
            <EditModal data={editData} setData={setEditData} handleAction={editSchedule} setDeleteData={setDeleteData} />

        </Layout>
    );
}

if (document.querySelector('#schedules')) {
    ReactDOM.render(<Schedules />, document.querySelector('#schedules'));
}
