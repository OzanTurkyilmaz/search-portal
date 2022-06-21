import React from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '347px',
  height: '222px'
};

const center = {
  lat: 41.023159181,
  lng:  28.8890424476
};
const labelSize = { width: 220};
    const labelPadding = 8;

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker
              labelStyle={{ textAlign: "center", width:labelSize.width + 'px', backgroundColor: "#7fffd4", fontSize: "14px", padding:  labelPadding + "px"}}
              labelAnchor={{ x: (labelSize.width/2) + labelPadding , y: 80 }}
            //key={place.id}
              position={{ lat: center.lat, lng: center.lng }}>
              <span>isim</span>
            </Marker>
        <></>
      </GoogleMap>
  ) : <></>
}