import './Homepage.css';
import React from 'react';
import bc from '../img/bc.png';
import duke from '../img/duke.png';
import MarchMadness from '../img/marchmadness.png';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCubes, faArrowLeft, faPeopleGroup, faDollarSign} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';

function Homepage() {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    return (
        <div className="homepage-container">
            <header>
                <div className="header-start">
                    <FontAwesomeIcon icon={faCubes} />
                    <h1>BlockPool</h1>
                </div>
                <div className="header-end">
                    <button>Sign In</button>
                    <FontAwesomeIcon icon={faBars} onClick={() => setOpenSideMenu(true)}/>
                </div>
                
            </header>

            {
                currentView === 'home' && (
                    <div className="homepage-split">
                <div className="homepage-textbox">
                    <h1>Decentralized Pool Betting</h1>
                    <h2>Take a bigger piece of the pie. Secure betting pools without the middleman. Sign in with google and start betting.</h2>
                    <button>Sign In</button>
                </div>
                <div className="homepage-imagebox">
                    <h1>Upcoming Bets</h1>
                    <div className="homepage-item-container">

                        <div className="homepage-item">
                            <div>
                                <img src={bc} alt="bc" />
                                <p>Boston College</p>
                                <span>1.5</span>
                            </div>
                            VS
                            <div>
                                <span>1.5</span>
                                <p>Duke</p>
                                <img src={duke} alt="bc" />
                                
                            </div>
                            
                        </div>

                        <div className="homepage-item">
                            <div>
                                <img src={bc} alt="bc" />
                                <p>Boston College</p>
                                <span>1.5</span>
                            </div>
                            VS
                            <div>
                                <span>1.5</span>
                                <p>Duke</p>
                                <img src={duke} alt="bc" />
                                
                            </div>
                            
                        </div>

                        <div className="homepage-item">
                            <div>
                                <img src={bc} alt="bc" />
                                <p>Boston College</p>
                                <span>1.5</span>
                            </div>
                            VS
                            <div>
                                <span>1.5</span>
                                <p>Notre Dame University</p>
                                <img src={duke} alt="bc" />
                                
                            </div>
                            
                        </div>

                        <div className="homepage-item">
                            <div>
                                <img src={bc} alt="bc" />
                                <p>Boston College</p>
                                <span>1.5</span>
                            </div>
                            VS
                            <div>
                                <span>1.5</span>
                                <p>Duke asd asd asd a</p>
                                <img src={duke} alt="bc" />
                                
                            </div>
                            
                        </div>

                        <div className="homepage-item">
                            <div>
                                <img src={bc} alt="bc" />
                                <p>Boston College</p>
                                <span>1.5</span>
                            </div>
                            VS
                            <div>
                                <span>1.5</span>
                                <p>Duke</p>
                                <img src={duke} alt="bc" />
                                
                            </div>
                            
                        </div>

                        <div className="homepage-item">
                            <div>
                                <img src={bc} alt="bc" />
                                <p>Boston College</p>
                                <span>1.5</span>
                            </div>
                            VS
                            <div>
                                <span>1.5</span>
                                <p>Notre Dame University</p>
                                <img src={duke} alt="bc" />
                                
                            </div>
                            
                        </div>

                        <div className="homepage-item">
                            <div>
                                <img src={bc} alt="bc" />
                                <p>Boston College</p>
                                <span>1.5</span>
                            </div>
                            VS
                            <div>
                                <span>1.5</span>
                                <p>Duke asd asd asd a</p>
                                <img src={duke} alt="bc" />
                                
                            </div>
                            
                        </div>
                        </div>
                </div>
            </div>
                )
            }

            {
                currentView === 'pools' && (
                    <div className="pools-container">
                        <div className="homepage-textbox">
                            <h2>Take a bigger piece of the pie. Secure betting pools without the middleman. Sign in with google and start betting.</h2>
                            <button>Sign In</button>
                        </div>
                        <div className="pools-content">
                            <div className="pools-title">
                                <h1>Upcoming Bets</h1>
                            </div>
                            <div className="pools-row">
                                <div className="pool-item">
                                    <img src={MarchMadness} alt="March Madness" />
                                    <h3>2023 March Madness</h3>  
                                </div>
                            </div>
                            
                            <div className="pools-title">
                                <h1>Popular Betting Pools</h1>
                            </div>
                            <div className="pools-row">
                                <div className="pool-item">
                                    <img src={MarchMadness} alt="March Madness" />
                                    <h3>Pool #1</h3>  
                                </div>

                                <div className="pool-item">
                                    <img src={MarchMadness} alt="March Madness" />
                                    <h3>Pool #2</h3>  
                                </div>

                                <div className="pool-item">
                                    <img src={MarchMadness} alt="March Madness" />
                                    <h3>Pool #3</h3>  
                                </div>
                            </div>



                        </div>
                    </div>
                )
            }
            

            {
                openSideMenu && (
                    <div className="side-menu-container">
                        
                        <div className="side-menu-background" onClick={() => setOpenSideMenu(false)}></div>

                        <div className="side-menu">
                            <FontAwesomeIcon icon={faArrowLeft} onClick={() => setOpenSideMenu(false)}/>
                            <div className="side-menu-header">
                                <FontAwesomeIcon icon={faCubes} />
                            </div>
                            <div className="side-menu-body">
                                <div className="side-menu-item" onClick={() => setCurrentView('pools')}>
                                    <FontAwesomeIcon icon={faPeopleGroup}/>
                                    <p>Pools</p>
                                </div>
                                <div className="side-menu-item" onClick={() => setCurrentView('bets')}>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                    <p>My Bets</p>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
    }

export default Homepage;