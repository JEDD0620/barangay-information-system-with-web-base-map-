import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';

import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { Col, Row, Button, Form, Badge } from 'react-bootstrap';
import { CreateModal, RemoveModal } from './components/Modals';
import Axios from 'axios';
import { queryUser } from '../../utils/user';
import { pick } from 'lodash';
const params = {
    v: 'weekly',
    key: 'AIzaSyCcXqxbe5qJEi8g6ZhMPScT3yH8p1bQD9M',
    mapTypeId: "satellite",
};

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

    const [zoom, setZoom] = useState(16);
    const [info, setInfo] = useState(false);
    const [center, setCenter] = useState({
        lat: 15.427334136369526,
        lng: 120.59862386613382
    });

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
                                // fillColor={obj.type == 'SK' ? "#6cb2eb" : obj.type == 'Officials' ? "#ffed4a" : "#e3342f"}
                                // strokeColor={obj.type == 'SK' ? "#6cb2eb" : obj.type == 'Officials' ? "#ffed4a" : "#e3342f"}
                                icon={{
                                    url: obj.type == 'SK' ? "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png"
                                        : obj.type == 'Officials' ? "http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png"
                                            : "http://maps.google.com/mapfiles/kml/paddle/red-circle.png"
                                }}
                                onClick={onMarkerClick}
                                label={!!obj.f_name ? obj.f_name : obj.label}
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
            disableDefaultUI: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ]
        });
    }

    const onClickShape = (e) => {
        setLocation(e.latLng.toJSON())
    }

    const onMarkerClick = (e, h) => {
        let r = e.latLng.toJSON()
        setLocation(e.latLng.toJSON())
        setCenter(e.latLng.toJSON())
        setZoom(18)

        residentData.current.some(obj => {
            console.log(obj);
            if (obj.lat == r.lat && obj.lng == r.lng) {
                setInfo(obj);
                return true;
            }
        });
    }

    const handleAction = (setLoading) => {
        // setPickLocation(false)
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
                    <h2 className='d-inline-block'>Map</h2>
                    <h2 className='d-inline-block h3'>
                        <Badge variant='danger p-2 ml-md-3 mr-md-2 mr-1 ml-0'>Highlights</Badge>
                        <Badge variant='warning p-2 ml-md-2 mr-md-2 mr-1 ml-1'>Officials</Badge>
                        <Badge variant='info p-2 ml-md-2 mr-md-2 mr-0 ml-1'>SK</Badge>
                    </h2>
                    <br />
                    {!!user && (user.role == 'Admin' || user.role == 'Staff') ?
                        !!!pickLocation ?
                            <>
                                <Button onClick={() => setPickLocation("add")}>Assign</Button>
                                <Button variant='danger ml-2' onClick={() => setPickLocation("remove")}>Remove</Button>
                            </>
                            :
                            <>
                                <Button variant="secondary mr-2" onClick={() => { setPickLocation(false); setLocation(false) }}>Cancel</Button>
                                <Button disabled={!!!location} onClick={() => pickLocation == 'add' ? setCreateData(true) : setRemoveData(true)}>Confirm</Button>

                            </>
                        :
                        ""
                    }
                </Col>
            </Row>

            <Gmaps
                width={'100%'}
                height={'80vh'}
                lat={!!center.lat ? center.lat : 15.427334136369526}
                lng={!!center.lng ? center.lng : 120.59862386613382}
                zoom={zoom}
                params={params}
                onMapCreated={onMapCreated}
                mapTypeId='satellite'

            >

                {!!markers && markers}

                <Marker
                    lat={15.427334136369526}
                    lng={120.59862386613382}
                    draggable={false}
                    label="San Francico"
                    icon={{
                        url: "http://maps.google.com/mapfiles/kml/pal2/icon10.png"
                    }}
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

                {!!info && !!!pickLocation &&
                    < InfoWindow
                        lat={location.lat}
                        lng={location.lng}
                        content={`
                            <div style="display:flex">
                                <div><img style="object-fit: cover;" src="${info.photo}" width="100" height="150"/></div>
                                <div style="min-width:200px; margin-left:10px"><h5>${!!info.f_name ? info.f_name : info.label}</h5><p>${info.details}</p></div>
                            </div>
                        `}
                        onCloseClick={() => { setInfo(false); setLocation(null); }}
                    />
                }

                {!!pickLocation && pickLocation == 'add' &&
                    <Circle
                        lat={15.427334136369526}
                        lng={120.59862386613382}
                        radius={1000}
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
            <RemoveModal data={removeData} setData={setRemoveData} location={location} handleAction={handleAction} setLocation={setLocation} residentData={residentData.current} />
        </Layout>
    );
}

if (document.querySelector('#map')) {
    ReactDOM.render(<Map />, document.querySelector('#map'));
}
