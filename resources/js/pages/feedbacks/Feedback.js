import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Layout } from '../../layout/Layout'
import { Button, Spinner, Badge, Card, Accordion, useAccordionToggle, Dropdown } from 'react-bootstrap'
import Axios from 'axios'
import { FillPaginate } from '../../elements/FillPaginate'
import moment from 'moment'
import { ArchiveCommentModal, EditModal } from './components/Modals'
import { getParams, getParamsID } from '../../utils/links'
import { queryUser } from '../../utils/user'
import { CommentForm } from './components/CommentForm'


const Feedback = () => {
    const [feedback, setFeedback] = useState();
    const [user, setUser] = useState();
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(!!getParams('page') ? parseInt(getParams('page')) : 1);

    //modals
    const [editData, setEditData] = useState(false);
    const [archiveData, setArchiveData] = useState(false);

    //toast
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        queryUser(setUser);
        getFeedback()
    }, [sort, order, perPage, page])

    const getFeedback = (dontNull) => {
        if (!!!dontNull) {
            setFeedback(null);
        }

        Axios.get(`/api/feedback/${getParamsID()}?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}`)
            .then(res => {
                if (res.data == '') {
                    location = '/feedbacks'
                }
                setFeedback(res.data)
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

    const editFeedback = (setModalLoading, data) => {
        Axios.put(`/api/feedback/${data.id}`, data)
            .then(res => {
                setModalLoading(false);
                setEditData(false);
                getFeedback(true);
            })
            .catch(err => console.log(err))
    }

    const archiveFeedback = (setModalLoading) => {
        Axios.delete(`/api/feedback/${archiveData.id}`)
            .then(res => {
                if (archiveData.id == getParamsID()) {
                    location = '/feedbacks'
                }
                setModalLoading(false);
                setShowToast(`${archiveData.username}'s comment Archived!`);
                setArchiveData(false);
                getFeedback(true);
            })
            .catch(err => console.log(err))
    }

    const CustomToggle = ({ children, eventKey }) => {
        const decoratedOnClick = useAccordionToggle(eventKey, () => { });

        return (
            <Button
                type="button"
                variant='link'
                onClick={decoratedOnClick}
            >
                {children}
            </Button>
        );
    }

    const options = (val) => {
        if (val.user_id == user.id || user.role == 'Admin' || user.role == 'Staff') {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="link" className='text-secondary' id="dropdown-basic">
                        <i className="fas fa-ellipsis-h"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {/* <Dropdown.Item onClick={() => setEditData(val)}>Edit</Dropdown.Item> */}
                        <Dropdown.Item onClick={() => setArchiveData(val)}>Archive</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
    }

    return (
        <Layout>
            {!!feedback ?
                <>
                    <Card className='flex-column flex-md-row'>
                        <Card.Img variant="top rounded-circle d-none d-md-block" src="/images/profile/user-circle-solid.svg" />
                        <Card.Body>
                            <h6>
                                {feedback.username}
                                <small className='text-muted'>
                                    <i className="far fa-clock align-baseline ml-2"></i> {moment(feedback.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}
                                    {options(feedback)}
                                </small>
                            </h6>
                            <Card.Title>
                                {feedback.title}
                            </Card.Title>
                            <Card.Text>
                                {feedback.body}
                            </Card.Text>
                            <Button type="button" variant='link' href='#comment'>Comment</Button>
                        </Card.Body>
                    </Card>

                    <h3 className='mt-5 mb-3'>Comments & Replies</h3>

                    {
                        feedback.comment.map(obj => {
                            return (
                                <div key={obj.id} >
                                    <Card className='mb-3 flex-column flex-md-row'>
                                        <Card.Img variant="top rounded-circle d-none d-md-block" src="/images/profile/user-circle-solid.svg" />
                                        <Card.Body>
                                            <h6>
                                                {obj.username}
                                                <small className='text-muted'>
                                                    <i className="far fa-clock align-baseline ml-2"></i> {moment(obj.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}
                                                    {options(obj)}
                                                </small>
                                            </h6>
                                            <Card.Text>
                                                {obj.body}
                                            </Card.Text>

                                            {
                                                obj.comment.map((obj2, i2) => {
                                                    return (
                                                        <Card key={obj2.id} className='mb-3'>
                                                            <div className='d-flex align-items-center'>

                                                            <Card.Img variant="top rounded-circle d-none d-md-block mr-3" src="/images/profile/user-circle-solid.svg" />
                                                                <h6>
                                                                    {obj2.username}
                                                                    <small className='text-muted'>
                                                                        <i className="far fa-clock align-baseline ml-2"></i> {moment(obj2.updated_at).calendar(null, { sameElse: 'D MMM YYYY' })}
                                                                        {options(obj2)}
                                                                    </small>
                                                                </h6>
                                                            </div>
                                                            <Card.Body>
                                                                <Card.Text>
                                                                    {obj2.body}
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    )
                                                })
                                            }
                                            <Accordion>
                                                <CustomToggle eventKey={obj.id}>Reply</CustomToggle>
                                                <Accordion.Collapse eventKey={obj.id}>
                                                    <Card className='mb-3'>
                                                        <Card.Body>
                                                            <CommentForm type='reply' id={obj.id} update={getFeedback} />
                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Collapse>
                                            </Accordion>

                                        </Card.Body>
                                    </Card>

                                </div>
                            )
                        })
                    }

                    {!!user &&
                        <Card className='mt-3'>
                            <Card.Body>
                                <CommentForm type='comment' id={feedback.id} update={getFeedback} />
                            </Card.Body>
                        </Card>
                    }
                </>
                :
                <Spinner animation="border" variant="primary" className='mt-5' />
            }
            <Button variant='primary btn-block mt-3' onClick={() => window.history.back()}>Back</Button>
            <ArchiveCommentModal data={archiveData} setData={setArchiveData} handleAction={archiveFeedback} />
            {/* <EditModal data={editData} setData={setEditData} handleAction={editFeedback} /> */}

        </Layout>
    );
}

if (document.querySelector('#feedback')) {
    ReactDOM.render(<Feedback />, document.querySelector('#feedback'));
}