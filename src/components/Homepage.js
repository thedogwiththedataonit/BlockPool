import './Homepage.css';
import React from 'react';
import bc from '../img/bc.png';
import duke from '../img/duke.png';
import MarchMadness from '../img/marchmadness.png';
import players from '../img/basketballplayers.png';
import pool1 from '../img/pool1.jpeg';
import pool2 from '../img/pool2.jpeg';
import pool3 from '../img/pool3.jpeg';
import pool4 from '../img/pool4.png';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCubes, faArrowLeft, faPeopleGroup, faDollarSign} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';

function Homepage() {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [currentView, setCurrentView] = useState('home');
    const [viewPool, setViewPool] = useState(false);
    const [poolSideDrawer, setPoolSideDrawer] = useState(false);
    const [teamIndex, setTeamIndex] = useState(0);
    const [winningList, setWinningList] = useState([]);

    const triggerPoolView = (e) => {

        //apply .bets-container-slide-out to bets-container
        const betsContainer = document.querySelector('.bets-container');
        //add the class for 1 second

        betsContainer.classList.add('bets-container-slide-out');

        setTimeout(() => {
            betsContainer.classList.remove('bets-container-slide-out');

            setViewPool(true);
        }
        , 350);


    }

    const nextTeam = () => {
        if (teamIndex < exampleSchoolData.length - 1) {
            setTeamIndex(teamIndex + 1);

            //add the winning school to the winning list
            setWinningList([...winningList, {
                winner: exampleSchoolData[teamIndex].firstTeam,
                loser: exampleSchoolData[teamIndex].secondTeam,
                winnerImage: exampleSchoolData[teamIndex].firstImage,
                loserImage: exampleSchoolData[teamIndex].secondImage,
            }
            ])
            console.log(teamIndex)
        }
    }

    const exampleSchoolData = [
        {
            firstTeam: 'Boston College',
            secondTeam: 'Duke University',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'Round of 64',
        },
        {
            firstTeam: 'Harvard University',
            secondTeam: 'Michigan State University',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'Round of 64',
        },
        {
            firstTeam: 'Syracuse University',
            secondTeam: 'North Carolina State University',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'Round of 64',
        },
                {
            firstTeam: 'Miami University',
            secondTeam: 'University of Florida',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'Round of 64',
        },
            
    ]
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
                    <div className="middle-container">
                        <div className="sign-in-container">
                            <div className="sign-in-textbox">
                                <h1>Decentralized Pool Betting</h1>
                                <h2>Take a bigger piece of the pie. Secure betting pools without the middleman. Sign in with google and start betting.</h2>
                                <button>Sign In</button>
                            </div>
                            <img src={players} alt="players" />
                        </div>

                        {
                            !viewPool && (
                                <div className="bets-container">
                                    <div className="bets-container-header">
                                        <span>All</span>
                                        <span>Upcoming</span>
                                        <span>Completed</span>
                                    </div>
                                    <div className="bet-container-match">
                                        <div className="bet-container-match-header">
                                            <img src={MarchMadness} alt="MarchMadness" />
                                            <h4>March Madness</h4>
                                        </div>
                                        <div className="game-container">

                                            <div className="game-container-pool" onClick={(e) => triggerPoolView(e)}>
                                                <p>Start</p>
                                                <img src={pool1}></img>
                                                <h1>Round of 64</h1>
                                            </div>

                                            <div className="game-container-pool">
                                                <p>TBA</p>
                                                <img src={pool2}></img>
                                                <h1>Round of 32</h1>
                                            </div>

                                            <div className="game-container-pool">
                                                <p>TBA</p>
                                                <img src={pool3}></img>
                                                <h1>Round of 16</h1>
                                            </div>

                                            <div className="game-container-pool">
                                                <p>TBA</p>
                                                <img src={pool4}></img>
                                                <h1>Finals</h1>
                                            </div>
                                            {
                                                /*
                                            
                                            <div className="bet-container-game">
                                                <div className="game-time">
                                                    <h6>Round of 64</h6>
                                                    <h5>March 16th at 2pm</h5>
                                                </div>
                                                <img src={bc} alt="bc" />
                                                <p>Boston College</p>
                                                <span>2 : 3</span>
                                                <p className="second-team">Duke University</p>
                                                <img src={duke} alt="bc" />
                                                <button onClick={(e) => triggerPoolView(e)}>View Pools</button>
                                            </div>
                                            <div className="bet-container-game">
                                                <div className="game-time">
                                                    <h6>Round of 64</h6>
                                                    <h5>March 16th at 2pm</h5>
                                                </div>
                                                <img src={bc} alt="bc" />
                                                <p>Boston College</p>
                                                <span>2 : 3</span>
                                                <p className="second-team">Duke University</p>
                                                <img src={duke} alt="bc" />
                                                <button>View Pools</button>
                                            </div>
                                            <div className="bet-container-game">
                                                <div className="game-time">
                                                    <h6>Round of 64</h6>
                                                    <h5>March 16th at 2pm</h5>
                                                </div>
                                                <img src={bc} alt="bc" />
                                                <p>Boston College</p>
                                                <span>2 : 3</span>
                                                <p className="second-team">Duke University</p>
                                                <img src={duke} alt="bc" />
                                                <button>View Pools</button>
                                            </div>
                                            <div className="bet-container-game">
                                                <div className="game-time">
                                                    <h6>Round of 64</h6>
                                                    <h5>March 16th at 2pm</h5>
                                                </div>
                                                <img src={bc} alt="bc" />
                                                <p>Boston College</p>
                                                <span>2 : 3</span>
                                                <p className="second-team">Duke University</p>
                                                <img src={duke} alt="bc" />
                                                <button>View Pools</button>
                                            </div>
                                            */
                                            }
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                        {
                            viewPool && (
                                <div className="pool-container">
                                    <div className="pool-container-header">
                                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => setViewPool(false)}/>
                                        
                                        <div className="pool-container-title">
                                            <h1>Round of 64</h1>
                                        </div>

                                        
                                        
                                    </div>
                                    <div className="pool-container-content">
                                        <section>
                                            <div className="pool-container-team" onClick={() => nextTeam()}>
                                                <h1>{exampleSchoolData[teamIndex].firstTeam}</h1> 
                                                <img src={exampleSchoolData[teamIndex].firstImage} alt="bc" />
                                            </div>
                                            <div className="pool-container-team">
                                                <h1>{exampleSchoolData[teamIndex].secondTeam}</h1>
                                                <img src={exampleSchoolData[teamIndex].secondImage} alt="bc" />
                                            </div>
                                        </section>
                                        <table>
                                            <tr>
                                                <th>Team</th>
                                                <th>Team</th>
                                                <th>Winner</th>
                                            </tr>
                                            
                                            {
                                                winningList.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <span>
                                                                    <img src={bc}></img>
                                                                    {item.winner}
                                                                </span>
                                                                
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    <img src={duke}></img>
                                                                    {item.loser}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    <img src={bc}></img>
                                                                    {item.winner}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        
                                                    )
                                                })
                                            }
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                        





                    {
                        /*
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
                    */
                }
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

            {
                poolSideDrawer && (
                    <div className="pool-side-drawer-container">
                        <div className="side-menu-background" onClick={() => setPoolSideDrawer(false)}></div>
                        <div className="pool-side-drawer">
                            <FontAwesomeIcon icon={faArrowLeft} onClick={() => setPoolSideDrawer(false)}/>
                            <h1>Create Pool/Join Pool</h1>
                        </div>
                    </div>
                )
            }
        </div>
    );
    }

export default Homepage;