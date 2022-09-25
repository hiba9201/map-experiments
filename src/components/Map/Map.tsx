import { useEffect, useState } from 'react';

import {
    MapContainer,
    TileLayer,
    ZoomControl,
    AttributionControl,
    Polygon,
    ScaleControl,
} from 'react-leaflet';
import block from 'bem-cn';

import { SetViewOnClick } from '../MapHelpers/SetViewOnClick';
import { PolylineDrawer } from '../MapHelpers/PolylineDrawer';

import { DataLayer } from '../DataLayer/DataLayer';

import {
    YekaterinburgCenter,
    getCurrentPositionOptions,
    purpleOptions,
    polygon,
    polylineOptions,
    polylinePath,
} from './Map.constants';

import './Map.css';

const b = block('map');

export const Map = () => {
    const [startPoint, setStartPoint] = useState<null | [number, number]>(null);
    
    useEffect(() => {
        if (!navigator.geolocation) {
            console.log('No geolocation API available');
            setStartPoint(YekaterinburgCenter);

            return;
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            const { coords: { latitude, longitude } } = pos;

            setStartPoint([latitude, longitude]);
        }, (e) => {
            console.error(e);
            setStartPoint(YekaterinburgCenter);
        }, getCurrentPositionOptions);
    }, []);

    return startPoint ? (
        <MapContainer
            className={b()}
            center={startPoint}
            zoom={16}
            zoomControl={false}
            scrollWheelZoom={true}
            attributionControl={false}
        >
            {/* Тайлы карты */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* <DataLayer idx={3} /> */}
            <DataLayer idx={2} />
            <DataLayer idx={1} />
            <DataLayer idx={5} />
            <DataLayer idx={4} />

            {/* Контролы карты: Зум */}
            <ZoomControl position="topright" />
            <ScaleControl position="topright" />

            {/* Лейбл у копирайта */}
            <AttributionControl position='bottomleft' prefix="Map Exps" />

            {/* То, что можно размещать на карте: Маркеры, Рисунки */}
            {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}

            {/* <PolylineDrawer positions={polylinePath} pathOptions={polylineOptions} /> */}

            {/* Дополнительные контролы: Плавное перемещение по клику */}
            <SetViewOnClick />
        </MapContainer>
    ) : <div>Ищем вас</div>;
}