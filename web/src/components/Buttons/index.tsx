import React from 'react';
import { FiPlus } from "react-icons/fi";
import login from '../../assets/images/login.svg';
import logof from '../../assets/images/logof.svg';
import { Link } from "react-router-dom";

import './style.css';

export default function Buttons(args) {
    var { name } = args;
    if(name){
        return (
            <div>
                <Link to={{pathname: "/orphanages/create", state: args}} className="create-orphanage">
                    <FiPlus size={32} color="#FFF" />
                </Link>
                <Link to="/orphanages" className="logof">
                    <img src={logof} style={{width:65}} alt="logof" />
                </Link>
            </div>
        );
    }else{
        return (
            <div>
                <Link to="/login" className="login">
                    <img src={login} style={{width:65}} alt="login" />
                </Link>
            </div>
        );
    }
}