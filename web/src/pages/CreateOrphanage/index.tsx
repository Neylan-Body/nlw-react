import React, {useState,FormEvent,useEffect} from "react";
import {Marker} from 'react-leaflet';
import L from 'leaflet';
import { useLocation } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import AddFile from "../../assets/images/add-file.svg";
import RemoveFile from "../../assets/images/remove-file.svg";

import './style';
import './styles.css';
import Map from "../../components/Map";
import mapMarker from '../../assets/images/map-marker.svg';
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { addPhotoField, deleteField, images, returnImages } from "./script.js";

interface IData {
    [key: string]: any;
}

const happyMapIcon = L.icon({
  iconUrl: mapMarker,
  iconSize: [58,68],
  iconAnchor: [29,68],
  popupAnchor: [170,2]
})

interface IImages {
      path: string;
      orphanage_id: number
}


export default function CreateOrphanage() {
    const [getLatLng, setLatLng] = useState({ lat: 0, lng: 0 });
    const [getName, setName] = useState('');
    const [getAbout, setAbout] = useState('');
    const [getInstructions, setInstructions] = useState('');
    const [getOpeningHours, setOpeningHours] = useState('');
    const [getWhatsapp, setWhatsapp] = useState('');
    const [getOpenOnWeekends, setOpenOnWeekends] = useState(true);
    const location = useLocation();
    const user = location.state
    const history = useHistory();
    useEffect( () => {
        if(!user){
            history.push('/');
        }
    }, []);
    async function handleSubmit(event: FormEvent) {
        
        event.preventDefault();

        const data: IData = {
            name: getName,
            latitude: getLatLng.lat,
            longitude: getLatLng.lng,
            about: getAbout,
            instructions: getInstructions,
            whatsapp: getWhatsapp,
            opening_hours: getOpeningHours,
            open_on_weekends: getOpenOnWeekends,
        }
        try {
          returnImages()
          data.images = images 
          console.log(data);
          
            await api.post('/orphanages', data);
            history.push({
              pathname: '/orphanages',
              state: user,
            });
            alert('Orfanato cadastrado com sucesso!');
            
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar orfanato');
        }
    }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>
            <div>
              <Map onclick={(event) => setLatLng(event.latlng)} style={{ width: '100%', height: 280 }}>
              {getLatLng.lat !== 0 && (
                                <Marker interactive={false} icon={happyMapIcon} position={[getLatLng.lat, getLatLng.lng]} />
                            )}
              </Map>
              <footer id="point">
                <h3 id="select-point" >Clique no mapa para adicionar a localização</h3>
              </footer>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={getName} onChange={(event) => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" value={getAbout} onChange={(event) => setAbout(event.target.value)} maxLength={300} />
            </div>

            <div className="input-block images">
              <label htmlFor="images">Fotos</label>
              <div className="images-upload" id="images">
                  <div className="new-upload">
                      <input className="takeValue" name="images" placeholder="Cole o link da foto aqui" type="url" required/>
                      <span  onClick={(event) => deleteField(event)}><img src={RemoveFile} alt="Remover foto"/></span>
                  </div>
              </div>
              <button onClick={() => addPhotoField()} type="button">
                  <img src={AddFile} alt="Nova imagem"/>
              </button>
              <br/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={getInstructions} onChange={(event) => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input id="opening_hours" value={getOpeningHours} onChange={(event) => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={getOpenOnWeekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type="button" className={getOpenOnWeekends ? '' : 'active'} onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input id="whatsapp" value={getWhatsapp} onChange={(event) => setWhatsapp(event.target.value)} />
            </div>
          </fieldset>
          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}
