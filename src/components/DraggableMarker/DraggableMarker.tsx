import React from 'react';

import L, { Marker as LMarker } from 'leaflet'
import { Marker, MarkerProps, Popup } from 'react-leaflet';

const iconOptions = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
});

export const DraggableMarker = React.forwardRef<LMarker, MarkerProps>((props, ref) => {
    return (
        <Marker
            icon={iconOptions}
            draggable={true}
            ref={ref}
            {...props}
        >
            <Popup>
                Этот маркер можно двигать
            </Popup>
        </Marker>
    );
});