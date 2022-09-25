import { Polygon } from 'react-leaflet';
import L, { Point } from 'leaflet';

import 'proj4leaflet';

// @ts-ignore
const projCRS = new L.Proj.CRS(
    "EPSG:32641",
    "+proj=utm +zone=41 +datum=WGS84 +units=m +no_defs +type=crs"
);

const colorsMap = {
    apartments: 'yellow',
    office: 'pink',
    commercial: 'pink',
    government: 'green',
    retail: 'blue',
    church: 'grey',
};

function getPolylinesFromGeoJson(geojson: any) {
    return geojson.features.map((feature: any) => {
        const coords = feature.geometry.coordinates[0].map((arr: any) => {
            return arr.map((c: any) => {
                const latlng = projCRS.unproject(new Point(c[0], c[1]));

                return [latlng.lat, latlng.lng];
            });
        });
        // @ts-ignore
        const color: string | undefined = colorsMap[feature.properties.BUILDING as string];

        return { color, coords };
    });
}

const colors = ['red', 'grey', 'green', 'black', 'black'];

export const DataLayer = ({ idx }: { idx: number }) => {
    const data = require(`../../data/layer_${idx}.json`);

    const ploylines = getPolylinesFromGeoJson(data);

    const polylineOptions = {
        color: colors[idx - 1],
        stroke: idx > 3,
        fill: idx <= 3,
        fillOpacity: 1,
        dashArray: idx === 5 ? '5' : '',
    };

    const shouldRewriteColor = idx === 1;

    return (
        <>
            {ploylines.map(({ coords, color }: { coords: any, color: string | undefined }) => {
                const rightColor = shouldRewriteColor ? color || polylineOptions.color : polylineOptions.color
                const options = {
                    ...polylineOptions,
                    color: rightColor,
                };

                return <Polygon positions={coords} pathOptions={options} />
            })}
        </>
    );
};