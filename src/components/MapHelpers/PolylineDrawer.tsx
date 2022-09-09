import { useRef, useMemo } from 'react';

import { Polyline, PolylineProps } from 'react-leaflet';
import L from 'leaflet';

import { DraggableMarker } from '../DraggableMarker/DraggableMarker';

export const PolylineDrawer = (props: PolylineProps) => {
    const startMarkerRef = useRef<L.Marker>();
    const endMarkerRef = useRef<L.Marker>();
    const polylineRef = useRef<L.Polyline>();

    const eventHandlersStartMarker = useMemo(() => ({
        dragend() {
            const marker = startMarkerRef.current;
            const polyline = polylineRef.current;

            if (marker && polyline) {
                const markerLatLng = marker.getLatLng();
                const markerPos: [number, number] = [markerLatLng.lat, markerLatLng.lng];

                const path = polyline?.getLatLngs() as unknown as [number, number][];

                const newPath = [markerPos, ...path];

                polylineRef.current?.setLatLngs(newPath);
            }
        },
    }), []);

    const eventHandlersEndMarker = useMemo(() => ({
        dragend() {
            const marker = endMarkerRef.current;
            const polyline = polylineRef.current;

            if (marker && polyline) {
                const markerLatLng = marker.getLatLng();
                const markerPos: [number, number] = [markerLatLng.lat, markerLatLng.lng];

                polylineRef.current?.addLatLng(markerPos);
            }
        },
    }), []);

    return (
        <>
            <DraggableMarker
                // @ts-ignore
                ref={startMarkerRef}
                position={props.positions[0] as [number, number]}
                eventHandlers={eventHandlersStartMarker}
            />
            <DraggableMarker
                // @ts-ignore
                ref={endMarkerRef}
                eventHandlers={eventHandlersEndMarker}
                position={props.positions[props.positions.length - 1] as [number, number]}
            />
            <Polyline
                // @ts-ignore
                ref={polylineRef}
                {...props}
            />
        </>
    )
};