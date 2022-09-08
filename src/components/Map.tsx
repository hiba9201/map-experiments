import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup, ZoomControl, AttributionControl, Polygon, WMSTileLayer } from 'react-leaflet'

import './Map.css';

const YekaterinburgCenter: [number, number] = [56.837391, 60.598145];

const polygon: [number, number][] = [
    [56.842658, 60.593122],
    [56.832126, 60.583562],
    [56.840265, 60.620255],
];

const purpleOptions = { color: 'purple' };

const getCurrentPositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const wmsParams = {
    layers: 'TOPO-OSM-WMS',
    format: 'image/png',
};

export const Map = () => {
    const [startPoint, setStartPoint] = useState<null | [number, number]>(null);
    
    useEffect(() => {
        if (!navigator.geolocation) {
            console.log('aa');
            setStartPoint(YekaterinburgCenter);
            return;
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            const { coords: { latitude, longitude } } = pos;
            
            console.log('from api', [latitude, longitude]);
            setStartPoint([latitude, longitude]);
        }, (e) => {
            console.error(e);
            setStartPoint(YekaterinburgCenter);
        }, getCurrentPositionOptions);
    }, []);

    console.log('start point', startPoint);
    return startPoint ? (
        // @ts-ignore
        <MapContainer
            className="map"
            center={startPoint}
            zoom={16}
            zoomControl={false}
            scrollWheelZoom={true}
            attributionControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <WMSTileLayer url="http://ows.mundialis.de/services/service?" params={wmsParams} /> */}
            <ZoomControl position="topright" />
            <AttributionControl position='bottomleft' prefix="Map Exps" />
            <Marker position={YekaterinburgCenter}>
                <Popup>
                Центр Екатеринубрга. <br /> Прямо самый центр.
                </Popup>
            </Marker>
            {/* <ImageOverlay url="https://yandex.ru/images/search?pos=4&from=tabbar&img_url=http%3A%2F%2Fmillion-wallpapers.ru%2Fwallpapers%2F4%2F98%2F531441352518448%2Fraznocvetnye-kamni-maakrosemka.jpg&text=image&rpt=simage&lr=10253">
            </ImageOverlay> */}
            <Polygon pathOptions={purpleOptions} positions={polygon} />
        </MapContainer>
    ) : <div>Ищем вас</div>;
}