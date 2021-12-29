import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {useState} from 'react';
import getCenter from 'geolib/es/getCenter'

function Map({searchResults}) {
    
    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search results object into the 
    // {latitude: 52.516722, longitude: 13.377722} object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    
    const center = getCenter(coordinates);
    
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
       <ReactMapGL
        mapStyle='mapbox://styles/fk-pixel/ckxpagpyub3b715p31irzzrpb' //styleURL from mapbox > share&develop
        mapboxApiAccessToken={process.env.MAPBOX_KEY}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
       >
           {searchResults.map((result,index) => (
               <div key={index}>
                   <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                   >
                   <p 
                    className='cursor-pointer text-2xl animate-bounce'
                    onClick={() => setSelectedLocation(result)}
                    role={"img"}
                    aria-label="push-pin"
                    >📌</p>    
                   </Marker>

                   {/* Popup */}
                   {selectedLocation.long === result.long ? (
                       <Popup
                        className='z-50'
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setSelectedLocation(false)}
                        latitude={result.lat}
                        longitude={result.long}
                       >
                        {result.title}
                       </Popup>
                   ) : (
                       false
                   )}
               </div>
           ))}
       </ReactMapGL>
    );
}

export default Map;
