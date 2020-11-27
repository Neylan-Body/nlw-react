import React,{useEffect, useState} from "react";
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight} from "react-icons/fi";
import mapMarker from '../../assets/images/map-marker.svg';
import api from '../../services/api';
import Map from '../../components/Map';
import Buttons from '../../components/Buttons';

import './style.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});

export interface IOrphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  whatsapp: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
      id: number;
      path: string;
      url: string;
  }>;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function OrphanagesMap() {
    const [getOrphanages, setOrphanages] = useState<IOrphanage[]>([]);
    const location = useLocation();
    const user = location.state

    useEffect( () => {
        fetchOrphanages();
    }, []);

    async function fetchOrphanages() {
        const response = await api.get('/orphanages');
        setOrphanages(response.data[0]);
    }
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :</p>
        </header>

        <footer>
          <strong>Jequié</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      <Map>
        {getOrphanages.map( (orphanage) => (
                    <Marker
                        key={orphanage.id}
                        position={[orphanage.latitude, orphanage.longitude]}
                        icon={happyMapIcon}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={{pathname: `/orphanages/${orphanage.id}`, state: user}}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
      </Map>     
      <Buttons {...user} />
    </div>
  );
}