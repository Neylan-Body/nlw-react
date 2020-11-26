import React,{useEffect,useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Marker} from "react-leaflet";
import L from 'leaflet';
import { IOrphanage } from '../OrphanagesMap';
import { useParams, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";
import api from '../../services/api';
import mapMarker from '../../assets/images/map-marker.svg';

import './style.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface IRouteParams {
  id: string;
}



export default function Orphanage() {

  const [getOrphanage, setOrphanage] = useState<IOrphanage>();
    const [getActiveImageIndex, setActiveImageIndex] = useState(0);
    const location = useLocation();
    const user = location.state
    const params = useParams<IRouteParams>();
    const history = useHistory();

    useEffect( () => {
        fetchOrphanage();
        if(!user){
            history.push('/');
        }
    }, [params.id]);

    async function fetchOrphanage() {
        
        try {

            const response = await api.get(`/orphanages/${params.id}`);

            const newOrp = response.data;
            for (let index = 0; index < newOrp.images.length; index++) {
              newOrp.images[index] = newOrp.images[index].replace("http://localhost:3333/images/", "")
            }            
            setOrphanage(newOrp);
            
            
        } catch (error) {
            console.log(error);
            alert('Erro ao buscar orfanatos');
        }
    }

    if(!getOrphanage) return <h1>Carregando...</h1>

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={`${getOrphanage.images[getActiveImageIndex]}`} alt={`${getOrphanage.images[getActiveImageIndex]}`} />
          <div className="images">
              {getOrphanage.images.map( (imagem, index) => (
                  <button
                      className={getActiveImageIndex === index ? 'active' : ''} 
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                  >
                      <img src={`${imagem}`} alt={`${imagem}`} />
                  </button>
              ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{getOrphanage.name}</h1>
            <p>{getOrphanage.about}</p>

            <div className="map-container">
              <Map 
                interactive={false}
                center={[getOrphanage.latitude, getOrphanage.longitude]}
                zoom={16} 
                style={{ width: '100%', height: 280 }}
              >
                <Marker interactive={false} icon={happyMapIcon} position={[getOrphanage.latitude, getOrphanage.longitude]} />
              </Map>

              <footer>
                <a href={`http://www.google.com/maps/dir/?api=1&destination=${getOrphanage.latitude},${getOrphanage.longitude}`}
                   target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{getOrphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {getOrphanage.opening_hours}
              </div>
              {getOrphanage.open_on_weekends
                ? (
                    <div className="open-on-weekends">
                        <FiInfo size={32} color="#39CC83" />
                        Atendemos
                        <br />
                        fim de semana
                    </div>
                )
                : (
                    <div className="open-on-weekends dont-open">
                        <FiInfo size={32} color="#ff669d" />
                        Não atendemos
                        <br />
                        fim de semana
                    </div>
                )
              }
            </div>

            <PrimaryButton  type="button">
              <FaWhatsapp to={`https://api.whatsapp.com/send?l=pt_BR&phone=${getOrphanage.whatsapp}&text=Oi, quero conversar
                        sobre visitas no ${getOrphanage.name}`} size={20} color="#FFF" />
              Entrar em contato
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}