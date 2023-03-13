import './Homepage.css';

import React from 'react';
import MarchMadness from '../img/marchmadness.png';
import players from '../img/basketballplayers.png';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCubes, faCube,faPeopleGroup, faDollarSign, faHome} from '@fortawesome/free-solid-svg-icons'
import {redirect, url} from './env.js'

function WelcomePage() {

    const signIn = () => {
        return new Promise(resolve => {
          const redirectUrl = encodeURIComponent(redirect)
          const authUrl = url + `/auth/google/login?redirectUrl=${redirectUrl}`
          window.location.replace(authUrl)
          resolve()
        })
      }
    return (
        <div className="homepage-container">
        <header>
            <div className="header-start">
                <FontAwesomeIcon icon={faCubes} />
                <h1>BlockPool</h1>
            </div>
            <div className="header-end">
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        </header>

        <div className="middle-container" style={{"justify-content": "center"}}>
            <div className="sign-in-container">
                <div className="sign-in-textbox">
                    <h1>Decentralized Pool Betting</h1>
                    <h2>Take a bigger piece of the pie. Secure sports bracket without the middleman. Sign in with google and place your March Madness predictions.</h2>
                    <button onClick={() => signIn()}>Sign In</button>
                </div>
                <img src={players} alt="players" />
            </div>
        </div>


        </div>
    )
    ;

}

export default WelcomePage;