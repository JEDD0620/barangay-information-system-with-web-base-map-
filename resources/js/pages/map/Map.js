import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { CreateModal, RemoveModal } from './components/Modals';
import Axios from 'axios';
import { queryUser } from '../../utils/user';
const params = { v: 'weekly', key: 'AIzaSyCcXqxbe5qJEi8g6ZhMPScT3yH8p1bQD9M' };

function handleClick() {
    console.log('ok');
}

const Map = () => {

    const [markers, setMarkers] = useState();
    const [createData, setCreateData] = useState(false);
    const [removeData, setRemoveData] = useState(false);
    const residentData = useRef([]);
    const [pickLocation, setPickLocation] = useState(false);
    const [location, setLocation] = useState(false);
    const [user, setuser] = useState();

    useEffect(() => {
        getMarkers();
        queryUser(setuser);
    }, [])

    const getMarkers = () => {
        Axios.get('/api/map')
            .then(res => {
                if (!!res.data) {
                    residentData.current = res.data
                    let items = res.data.map(obj => {
                        return (
                            <Marker
                                key={obj.id}
                                lat={obj.lat}
                                lng={obj.lng}
                                draggable={false}
                                onClick={onMarkerClick}
                                label={obj.f_name}
                            />
                        )
                    })

                    setMarkers(items)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onMapCreated = (map) => {
        map.setOptions({
            disableDefaultUI: false
        });
    }

    const onClickShape = (e) => {
        if (!!pickLocation)
            setLocation(e.latLng.toJSON())
    }

    const onMarkerClick = (e) => {
        let r = e.latLng.toJSON()
        setLocation(e.latLng.toJSON())

        residentData.current.some(obj => {
            if (obj.lat == r.lat && obj.lng == r.lng) {
                setRemoveData(obj);
                return true;
            }
        });
    }

    const handleAction = (setLoading) => {
        setPickLocation(false)
        setLocation(false)
        setCreateData(false)
        setRemoveData(false)
        setLoading(false)
        getMarkers()
    }


    return (
        <Layout>
            <Row className='mb-3'>
                <Col md={10}>
                    <h2>Map</h2>
                    {!!user && (user.role == 'Admin' || user.role == 'Staff') ?
                        !!!pickLocation ?
                            <>
                                <Button onClick={() => setPickLocation("add")}>Set Location</Button>
                                <Button variant='danger ml-2' onClick={() => setPickLocation("remove")}>Remove Location</Button>
                            </>
                            :
                            <>
                                <Button variant="secondary mr-2" onClick={() => { setPickLocation(false); setLocation(false) }}>Cancel</Button>
                                <Button disabled={!!!location} onClick={() => setCreateData(true)}>Confirm</Button>
                            </>
                        :
                        ""
                    }
                </Col>
            </Row>

            <Gmaps
                width={'100%'}
                height={'80vh'}
                lat={15.427334136369526}
                lng={120.59862386613382}
                zoom={18}
                params={params}
                onMapCreated={onMapCreated}

            >

                {!!markers && markers}

                <Marker
                    lat={15.427334136369526}
                    lng={120.59862386613382}
                    draggable={false}
                    label="San Francico"
                />

                {!!location && pickLocation == 'remove' &&
                    < InfoWindow
                        lat={location.lat}
                        lng={location.lng}
                        content={"remove this marker"}
                        onCloseClick={() => setLocation(null)}
                    />
                }

                {!!location && pickLocation == 'add' &&
                    < InfoWindow
                        lat={location.lat}
                        lng={location.lng}
                        content={"add on this location"}
                        onCloseClick={() => setLocation(null)}
                    />
                }
                {!!pickLocation && pickLocation == 'add' &&
                    <Circle
                        lat={15.427334136369526}
                        lng={120.59862386613382}
                        radius={200}
                        strokeColor="#3490dc"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#3490dc"
                        fillOpacity={0.1}
                        map='satellite'
                        onClick={onClickShape}
                    />
                }
            </Gmaps>

            <CreateModal data={createData} setData={setCreateData} location={location} handleAction={handleAction} setLocation={setLocation} />
            <RemoveModal data={removeData} setData={setRemoveData} handleAction={handleAction} setLocation={setLocation} />
        </Layout>
    );
}

if (document.querySelector('#map')) {
    ReactDOM.render(<Map />, document.querySelector('#map'));
}
