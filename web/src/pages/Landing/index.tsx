import React from "react";
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

import './style.css';

export default function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logo} alt="Happy" />
 
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Jequié</strong>
          <span>Bahia</span>
        </div>

        <Link to="/orphanages"  className="enter-app">
          <FaArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}