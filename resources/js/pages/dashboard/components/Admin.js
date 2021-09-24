import React from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap';

export const Admin = ({user, dashboard}) => {


    return (
        <Row>
            <Col md={4} >
                <Card onClick={() => location = '/residents'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fa-house-user"></i>
                        </Card.Title>
                        <Card.Title>
                            Residents
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.residents_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card onClick={() => location = '/users'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fa-users-cog"></i>
                        </Card.Title>
                        <Card.Title>
                            Users
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.users_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card onClick={() => location = '/schedules'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fas fa-calendar-day"></i>
                        </Card.Title>
                        <Card.Title>
                            Schedules
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.schedules_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card onClick={() => location = '/requests'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fa-clipboard-list"></i>
                        </Card.Title>
                        <Card.Title>
                            Transaction Requests
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.request_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card className='text-center mb-4 bg-primary text-light flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <h1 className='mb-0'>
                            BIS
                        </h1>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card onClick={() => location = '/reports'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fa-exclamation-triangle"></i>
                        </Card.Title>
                        <Card.Title>
                            Blotter Reports
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.reports_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card onClick={() => location = '/events'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fa-calendar-alt"></i>
                        </Card.Title>
                        <Card.Title>
                            Events
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.events_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card onClick={() => location = '/announcements'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fa-bullhorn"></i>
                        </Card.Title>
                        <Card.Title>
                            Announcements
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.announcements_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4} >
                <Card onClick={() => location = '/feedbacks'} className='text-center mb-4 btn btn-primary text-dark flex-row' style={{ height: '25vh' }}>
                    <Card.Body style={{ placeSelf: 'center' }}>
                        <Card.Title>
                            <i style={{ fontSize: "4rem" }} className="fas fa-flag"></i>
                        </Card.Title>
                        <Card.Title>
                            Feedbacks
                        </Card.Title>
                        <h2><Badge variant='primary'>
                            {!!dashboard ? dashboard.feedbacks_count : 0}
                        </Badge></h2>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    );
}