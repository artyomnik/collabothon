import React, { Fragment , useState} from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

interface BinData {
  data_a: number;
  data_b: number;
  data_c: number;
}

interface Bin {
  id: string;
  lat: number;
  lng: number;
  color: 'blue' | 'red';
  bin_data: BinData;
}

interface MapProps {
  apiKey: string;
  backToLeaderboard: () => void;
  bins: Bin[];
}

const redDot = {
  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
};
const blueDot = {
  url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
};

const MapComponent: React.FC<MapProps> = ({ bins, backToLeaderboard }) => {
  const mapStyles = {
    height: '70vh',
    width: '100%',
  };

  const [selectedData, setSelectedData] = useState('data_a'); // Default selected data type

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  return (
    <>
      <div>
        <h3>Select a Data Type:</h3>
        <div>
          <label>
            <input
              type="radio"
              value="data_a"
              checked={selectedData === 'data_a'}
              onChange={handleDataChange}
            />
            Data Type 1
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="data_b"
              checked={selectedData === 'data_b'}
              onChange={handleDataChange}
            />
            Data Type 2
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="data_c"
              checked={selectedData === 'data_c'}
              onChange={handleDataChange}
            />
            Data Type 3
          </label>
        </div>
        <p>Selected Data Type: {selectedData}</p>
      </div>
      <div>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={bins[0]}
        >
          {
            bins.map(({ id, lat, lng, color, bin_data}) => {
              console.log(bin_data)
              return (
                <Fragment key={id}>
                  <Marker

                    position={{ lat, lng }}
                    icon={color === "blue" ? blueDot : redDot}
                  />
                  <Circle
                    center={{
                      lat: lat,
                      lng: lng
                    }} 
                    radius={bin_data[selectedData]}
                    options={{
                      fillColor: color, // Fill color for the circle
                      fillOpacity: 0.2, // Fill opacity
                      strokeColor: color, // Stroke color for the circle
                      strokeOpacity: 0.8, // Stroke opacity
                      strokeWeight: 2, // Stroke weight
                    }}
                  />
                </Fragment>
              )
            })
          }
        </GoogleMap>
      </div>
      <div>
        <button
          type="submit"
          className="w-[90%] md:w-[30%] mt-10 py-3 px-6 bg-blue-300 hover:opacity-70 rounded-full mx-auto shadow-xl shadow-light-blue"
          style={{ float: "right" }}
          onClick={backToLeaderboard}
        >
          Back to leaderboard
        </button>
      </div>
    </>
  );
};

export default React.memo(MapComponent);
