import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import config from '../config';


function MyComponent(props) {
    const map = useMap();
    map.setView([props.position.latitude, props.position.longitude], 13)
    return null;
  }


class Map extends Component {
   

  render() {
    const position = [ `${this.props.location.coordinates.latitude}`, `${this.props.location.coordinates.longitude}`]
    
    const pinIcon = new L.icon({
        iconUrl: '../images/restaurant-icon.png',
        iconSize: [32, 45],
    });
    console.log(position);
    return (
      <div>
        <MapContainer style = {{width: '800px', height: '500px'}}
        
          center={position}
          zoom={20}
        >
        <MyComponent position={this.props.location.coordinates}/>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={pinIcon} position={position}>   
                  <Popup> "{this.props.location.name}" </Popup>
            </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default Map;
