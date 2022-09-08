import React from 'react';
import './App.css';

import { Map } from './components/Map';

function App() {
  // let startPoint: [number, number] = [46.837391, 60.598145];

  // if (!navigator.geolocation) {
  //     console.log('aa');
  // } else {
  //     navigator.geolocation.getCurrentPosition((pos) => {
  //         const { coords: { latitude, longitude } } = pos;
          
  //         console.log('from geo api', [latitude, longitude]);
  //         startPoint = [latitude, longitude];
  //     });
  // }
  // // useEffect(() => {
  // // }, []);

  // console.log('startPoint', startPoint);

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
