import React, { useState } from 'react'
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { CreateFeedback, CreateReport, CreateRequest } from './Modals';

export const User = ({ user, dashboard }) => {

    const [request, setRequest] = useState(false)
    const [report, setReport] = useState(false)
    const [feedback, setFeedback] = useState(false)

    return (<>
        <Row>

            <Col md={4} >
                <Card className='text-center mb-4 text-dark flex-row' style={{ height: '25vh' }}>

                    <Card.Body style={{ placeSelf: 'center' }}>
                        <a className='btn btn-link text-dark d-block' href='/events'>
                            <Card.Title>
                                <i style={{ fontSize: "4rem" }} className="fas fa-calendar-alt"></i>
                            </Card.Title>
                            <Card.Title>
                                Events
                                <Badge variant='primary' className='ml-2'>
                                    {!!dashboard ? dashboard.events_count : 0}
                                </Badge>
                            </Card.Title>
                        </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card className='text-center mb-4 text-dark flex-row' style={{ height: '25vh' }}>

                    <Card.Body style={{ placeSelf: 'center' }}>
                        <a className='btn btn-link text-dark d-block' href='/announcements'>
                            <Card.Title>
                                <i style={{ fontSize: "4rem" }} className="fas fa-bullhorn"></i>
                            </Card.Title>
                            <Card.Title>
                                Announcements
                                <Badge variant='primary' className='ml-2'>
                                    {!!dashboard ? dashboard.announcements_count : 0}
                                </Badge>
                            </Card.Title>
                        </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card className='text-center mb-4 text-dark flex-row' style={{ height: '25vh' }}>

                    <Card.Body style={{ placeSelf: 'center' }}>
                        <a className='btn btn-link text-dark d-block' href='/schedules'>
                            <Card.Title>
                                <i style={{ fontSize: "4rem" }} className="fas fas fa-calendar-day"></i>
                            </Card.Title>
                            <Card.Title>
                                Schedules
                                <Badge variant='primary' className='ml-2'>
                                    {!!dashboard ? dashboard.schedules_count : 0}
                                </Badge>
                            </Card.Title>
                        </a>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={12}>
                <Card className='mb-4 text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <a className='btn btn-link text-dark d-block' href='/map'>
                            <Card.Title>
                                <i style={{ fontSize: "4rem" }} className="fas fa-map-marked-alt"></i>
                            </Card.Title>
                            <Card.Title>
                                Map
                            </Card.Title>
                        </a>
                    </Card.Body>
                </Card>
            </Col>


            <Col md={4} >
                <Card className='text-center mb-4 text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <a className='btn btn-link text-dark d-block' href='/requests' >
                            <Card.Title>
                                <i style={{ fontSize: "4rem" }} className="fas fa-clipboard-list"></i>
                            </Card.Title>
                            <Card.Title>
                                Transaction Requests
                                <Badge variant='primary' className='ml-2'>
                                    {!!dashboard ? dashboard.request_count : 0}
                                </Badge>
                            </Card.Title>
                        </a>
                        <Button variant='primary' onClick={() => setRequest(true)}>Send Request</Button>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card className='text-center mb-4 text-dark flex-row' style={{ height: '25vh' }}>

                    <Card.Body style={{ placeSelf: 'center' }}>
                        <a className='btn btn-link text-dark d-block' href='/reports'>
                            <Card.Title>
                                <i style={{ fontSize: "4rem" }} className="fas fa-exclamation-triangle"></i>
                            </Card.Title>
                            <Card.Title>
                                Blotter Reports
                                <Badge variant='primary' className='ml-2'>
                                    {!!dashboard ? dashboard.reports_count : 0}
                                </Badge>
                            </Card.Title>
                        </a>
                        <Button variant='primary' onClick={() => setReport(true)}>Send Reports</Button>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card className='text-center mb-4 text-dark flex-row' style={{ height: '25vh' }}>

                    <Card.Body style={{ placeSelf: 'center' }}>
                        <a className='btn btn-link text-dark d-block' href='/feedbacks'>
                            <Card.Title>
                                <i style={{ fontSize: "4rem" }} className="fas fa-flag"></i>
                            </Card.Title>
                            <Card.Title>
                                Feedbacks
                                <Badge variant='primary' className='ml-2'>
                                    {!!dashboard ? dashboard.feedbacks_count : 0}
                                </Badge>
                            </Card.Title>
                        </a>
                        <Button variant='primary' onClick={() => setFeedback(true)}>Send Feedback</Button>
                    </Card.Body>
                </Card>
            </Col>

        </Row>

        {/* modals */}
        <CreateRequest data={request} setData={setRequest} />
        <CreateReport data={report} setData={setReport} />
        <CreateFeedback data={feedback} setData={setFeedback} />
    </>);
}