import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { Layout } from '../../layout/Layout';
import { Loader } from "@googlemaps/js-api-loader"


const Map = () => {

    const loader = new Loader({
        apiKey: "AIzaSyCcXqxbe5qJEi8g6ZhMPScT3yH8p1bQD9M",
        version: "weekly",
    });

    useEffect(() => {
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById("map-component"), {
                center: new google.maps.LatLng(15.427334136369526, 120.59862386613382),
                zoom: 18,
                mapTypeId: 'satellite'
            });

            // map.setMapTypeId('terrain');
            // map.setTilt(45);

            const features = [
                {
                    position: new google.maps.LatLng(15.427334136369526, 120.59862386613382),
                    type: "info",
                },
                {
                    position: new google.maps.LatLng(15.427570190265849, 120.59786211877362),
                    type: "info",
                },
                {
                    position: new google.maps.LatLng(15.42716167101357, 120.5989403667976),
                    type: "info",
                },
            ]

            features.forEach((feature) => {
                new google.maps.Marker({
                    position: feature.position,
                    map: map,
                    title: 'test'
                });
            });

            const marker = new google.maps.Marker({
            });

            function addMarker(position) {
                marker.setMap({
                    position,
                    map,
                    label: 'A'
                });
                // markers.push(marker);
            }

            map.addListener("click", (e) => {
                addMarker(e.latLng)
                onClick(e.latLng.toJSON())
                // infoWindow.close();
                // infoWindow = new google.maps.InfoWindow({
                //     position: e.latLng,
                // });

                // infoWindow.setContent(
                //     "set something here"
                // );
            });


        });
    }, [])

    const onMapCreated = (map) => {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    const onDragEnd = (e) => {
        console.log('onDragEnd', e);
    }

    const onCloseClick = () => {
        console.log('onCloseClick');
    }

    const onClick = (e) => {
        console.log(e);
    }

    return (
        <Layout>
            <div id="map-component" style={{ height: '90vh', width: '100%' }}></div>
        </Layout>
    );
}

if (document.querySelector('#map')) {
    ReactDOM.render(<Map />, document.querySelector('#map'));
}
