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


import dude1 from '../img/dude1.png';
import dude2 from '../img/dude2.png';
import dude3 from '../img/dude3.png';

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCubes, faCube, faArrowLeft, faPeopleGroup, faDollarSign, faHome, faQuestionCircle, faCheckCircle , faCrown, } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import Bracket from './Bracket';


import { createAvatar } from '@dicebear/core';
import * as style from '@dicebear/bottts-neutral';

function Homepage() {
    const [currentView, setCurrentView] = useState('home');
    const [viewPool, setViewPool] = useState(false);
    const [teamIndex, setTeamIndex] = useState(0);
    const [winningList, setWinningList] = useState([]);
    const [aboutPage, setAboutPage] = useState('aboutus');
    const [betsPage, setBetsPage] = useState('all');
    const [bracketList, setBracketList] = useState([]);

    const [preEditIndex, setPreEditIndex] = useState(false);
    const signedIn = false;

    const [schoolSelection, setSchoolSelection] = useState(true);
    const [betCompleted, setBetCompleted] = useState(false);

    const [leaderboard, setLeaderboard] = useState([]);

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
    const handleAboutTab = (e, value) => {
        //add class "about-tab-selected to the e.target
        for (let i = 0; i < e.target.parentElement.children.length; i++) {
            e.target.parentElement.children[i].classList.remove('about-tab-selected');
        }
        e.target.classList.add('about-tab-selected');

        setAboutPage(value);
    }
    const handleBetsTab = (e, value) => {
        for (let i = 0; i < e.target.parentElement.children.length; i++) {
            e.target.parentElement.children[i].classList.remove('bets-tab-selected');
        }
        e.target.classList.add('bets-tab-selected');

        setBetsPage(value);
    }

    const nextTeam = (winningTeam, winningImg, losingTeam, losingImg) => {

        console.log(teamIndex)
        //check if winningList has winner being "TBD"

        const TDB = winningList.find((item) => item.winner === "TBD") ? winningList.find((item) => item.winner === "TBD") : false;
        console.log(TDB)
        
        if (TDB) {
            //replace TBD with winningTeam
            const newWinningList = winningList.map((item) => {
                if (item.winner === "TBD") {
                    item.winner = winningTeam;
                    item.winnerImage = winningImg;
                    item.loser = losingTeam;
                    item.loserImage = losingImg;
                }
                return item;
            })
            setWinningList(newWinningList);
            console.log(teamIndex)
            if (betCompleted) {
                setSchoolSelection(false);
            }
            if ((!betCompleted) || (preEditIndex == false))  {
                setTeamIndex(teamIndex);
            }
            if (preEditIndex !== false) {
                setTeamIndex(preEditIndex);
                setPreEditIndex(false);
            }
            return;
        }


        if ((teamIndex < exampleSchoolData.length -1 ) && (!betCompleted)) {
            setBracketList([...bracketList, {
                "id": "1_"+(teamIndex+1), //64_1
                "name": "Match " + (teamIndex + 1),
                "nextMatchId": "2_" + Math.ceil((teamIndex+1)/2),
                "tournamentRoundText": "Round 1 - Game " + (teamIndex + 1),
                "startTime": "March 16th",
                "state": "DONE",
                "participants": [
                    {
                        "id": winningTeam,
                        "resultText": "Prediction - WIN",
                        "isWinner": true,
                        "status": null,
                        "name": winningTeam,
                    },
                    {
                        "id": losingTeam,
                        "resultText": "Prediction - LOSS",
                        "isWinner": false,
                        "status": null,
                        "name": losingTeam,
                    }
                ],

            }
            ])

            setWinningList([...winningList, {
                winner: winningTeam,
                loser: losingTeam,
                winnerImage: winningImg,
                loserImage: losingImg,

            }
            ])
            console.log(preEditIndex)
            if (preEditIndex == false) {
                setTeamIndex(teamIndex + 1);
            }
            else {
                setTeamIndex(preEditIndex + 1);
                setPreEditIndex(false);
            }
        }
        else if ((teamIndex === exampleSchoolData.length -1) || (betCompleted)) {
            setBracketList([...bracketList, {
                "id": "1_"+(teamIndex+1), //64_1
                "name": "Match " + (teamIndex + 1),
                "nextMatchId": Math.ceil((teamIndex+1)/2),
                "tournamentRoundText": "Round 1 - Game " + (teamIndex + 1),
                "startTime": "March 16th",
                "state": "DONE",
                "participants": [
                    {
                        "id": winningTeam,
                        "resultText": "Prediction - WIN",
                        "isWinner": true,
                        "status": null,
                        "name": winningTeam,
                    },
                    {
                        "id": losingTeam,
                        "resultText": "Prediction - LOSS",
                        "isWinner": false,
                        "status": null,
                        "name": losingTeam,
                    }
                ],

            }
            ])
            
            setWinningList([...winningList, {
                winner: winningTeam,
                loser: losingTeam,
                winnerImage: winningImg,
                loserImage: losingImg,
            }
            ])
            setSchoolSelection(false);
            setBetCompleted(true);
        }
    }

    const editWinner = (index) => {
        //find the index of the winner in the exaaampleSchoolData
        setSchoolSelection(true);
        const oldIndex = teamIndex;
        setTeamIndex(index);
        //replace the winner name at the index of the winningList with the winner name
        const match = winningList[index];
        
        const newState = setWinningList(winningList.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    winner: "TBD",
                    loser: "TBD",
                    winnerImage: false,
                    loserImage: false,
                }
            }
            return item;
        }))
        setPreEditIndex(oldIndex);
        
        //set the nextTeam to the index

        //update the winningList by changing the winner and loser to "" at the index

        //remove the winner and loser from the winningList
        //const newWinningList = winningList.filter((item) => item.winner !== winner && item.loser !== loser);
        //setWinningList(newWinningList);
    }

    const submitBet = () => {
        console.log(winningList)
    }

    const exampleSchoolData = [
        {
            firstTeam: 'Boston College',
            secondTeam: 'Duke University',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'First Round',
        },
        {
            firstTeam: 'Harvard University',
            secondTeam: 'Michigan State University',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'First Round',
        },
        {
            firstTeam: 'Syracuse University',
            secondTeam: 'North Carolina State University',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'First Round',
        },
        {
            firstTeam: 'Miami University',
            secondTeam: 'University of Florida',
            firstImage: bc,
            secondImage: duke,
            time: 'March 16th at 2pm',
            round: 'First Round',
        },

            
    ]

    const exampleLeaderboardData = [
        {
            name: 'John Doe',
            place: 1,
            winnings: 100,
        },
        {
            name: 'Jane Doe',
            place: 2,
            winnings: 50,
        },
        {
            name: 'John Doe',
            place: 3,
            winnings: 25,
        },
        {
            name: 'John Doe',
            place: 4,
            winnings: 10,
        },
        {
            name: 'John Doe',
            place: 5,
            winnings: 5,
        },
        {
            name: 'John Doe',
            place: 6,
            winnings: 2,
        },
        {
            name: 'John Doe',
            place: 7,
            winnings: 1,
        },
        {
            name: 'John Doe',
            place: 8,
            winnings: 0,
        },

    ]

    useEffect(() => {
        //loop through the exampleLeaderboardData and create a new key avatar 
        for (let i = 0; i < exampleLeaderboardData.length; i++) {
            exampleLeaderboardData[i].avatar = createAvatar(style, {
                size: 128,
                seed: exampleLeaderboardData[i].name,
                eyes: ["bulging","hearts","eva", "robocop", "roundFrame01", "roundFrame02", "happy", "frame1"]
                // ... other options
              }).toDataUriSync();

              console.log(exampleLeaderboardData[i].avatar)
        }
        setLeaderboard(exampleLeaderboardData);
    }, [])


    return (
        <div className="homepage-container">
            <header>
                <div className="header-start">
                    <FontAwesomeIcon icon={faCubes} />
                    <h1>BlockPool</h1>
                </div>
                <div className="header-end">
                    <button>Sign In</button>
                </div>
                
            </header>
            <div className="side-menu-divider">
                        <div className="side-menu">
                            <div className="side-menu-item" onClick={() => setCurrentView("home")}>
                                <FontAwesomeIcon icon={faHome} />
                                <h2>Home</h2>
                            </div>

                            <div className="side-menu-item" onClick={() => setCurrentView("about")}>
                                <FontAwesomeIcon icon={faCube} />
                                <h2>About us</h2>
                            </div>

                            <div className="side-menu-item" onClick={() => setCurrentView("leaderboard")}>
                                <FontAwesomeIcon icon={faPeopleGroup} />
                                <h2>Leaderboard</h2>
                            </div>

                            <div className="side-menu-item" onClick={() => setCurrentView("bets")}>
                                <FontAwesomeIcon icon={faDollarSign} />
                                <h2>My Brackets</h2>
                            </div>


                        </div>
            {
                currentView === 'home' && (
                    <div className="homepage-divider">

                            <div className="middle-container">
                                {
                                    !signedIn && (
                                        <div className="sign-in-container">
                                            <div className="sign-in-textbox">
                                                <h1>Decentralized Pool Betting</h1>
                                                <h2>Take a bigger piece of the pie. Secure sports bracket without the middleman. Sign in with google and place your March Madness predictions.</h2>
                                                <button>Sign In</button>
                                            </div>
                                            <img src={players} alt="players" />
                                        </div>
                                    )
                                }
                                

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
                                                        <h1>First Round</h1>
                                                    </div>

                                                    <div className="game-container-pool">
                                                        <p>TBA</p>
                                                        <img src={pool2}></img>
                                                        <h1>Second Round</h1>
                                                    </div>

                                                    <div className="game-container-pool">
                                                        <p>TBA</p>
                                                        <img src={pool3}></img>
                                                        <h1>Sweet 16</h1>
                                                    </div>

                                                    <div className="game-container-pool">
                                                        <p>TBA</p>
                                                        <img src={pool4}></img>
                                                        <h1>Elite Eight - Finals</h1>
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
                                                    <img src={MarchMadness}></img>
                                                    <p>First Round</p>
                                                </div>
                                            </div>
                                            <div className="pool-container-content">
                                                
                                                {
                                                    schoolSelection && ( 
                                                        <>
                                                        <p>Game {teamIndex + 1}</p>
                                                        <section>
                                                            <div className="pool-container-team" onClick={() => nextTeam(exampleSchoolData[teamIndex].firstTeam, exampleSchoolData[teamIndex].firstImage, exampleSchoolData[teamIndex].secondTeam, exampleSchoolData[teamIndex].secondImage)}>
                                                                <img src={exampleSchoolData[teamIndex].firstImage} alt="bc" />
                                                                <h1>{exampleSchoolData[teamIndex].firstTeam}</h1> 
                                                                
                                                            </div>
                                                            <h6>VS</h6>
                                                            <div className="pool-container-team" onClick={() => nextTeam(exampleSchoolData[teamIndex].secondTeam, exampleSchoolData[teamIndex].secondImage, exampleSchoolData[teamIndex].firstTeam, exampleSchoolData[teamIndex].firstImage)}>
                                                                <img src={exampleSchoolData[teamIndex].secondImage} alt="bc" />
                                                                <h1>{exampleSchoolData[teamIndex].secondTeam}</h1>
                                                            
                                                            </div>
                                                        </section>
                                                        
                                                        </>
                                                    )
                                                }
                                                {
                                                    winningList.length > 0 && (
                                                    <table>
                                                        <tbody>
                                                        <tr>
                                                            <th style={{'width': '50px'}}>#</th>
                                                            <th>Team</th>
                                                            <th>Team</th>
                                                            <th>Winner</th>
                                                            <th></th>
                                                        </tr>
                                                        
                                                        {
                                                            winningList.map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td style={{'textAlign': 'start'}}>
                                                                            <p>{index+1}</p>
                                                                            </td>
                                                                        <td>
                                                                            <span>
                                                                                {
                                                                                    item.winnerImage ? (
                                                                                        <img src={item.winnerImage}></img>
                                                                                    ) : (
                                                                                        <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
                                                                                    )
                                                                                }
                                                                                
                                                                                {item.winner}
                                                                            </span>
                                                                            
                                                                        </td>
                                                                        <td>
                                                                            <span>
                                                                                {
                                                                                    item.loserImage ? (
                                                                                        <img src={item.loserImage}></img>
                                                                                    ) : (
                                                                                        <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
                                                                                    )
                                                                                }
                                                                                {item.loser}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span>
                                                                            {
                                                                                    item.winnerImage ? (
                                                                                        <img src={item.winnerImage}></img>
                                                                                    ) : (
                                                                                        <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
                                                                                    )
                                                                                }
                                                                                {item.winner}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                !preEditIndex && (
                                                                                    <span className="edit-selection" onClick={() => editWinner(index)}>
                                                                                        Edit
                                                                                    </span>
                                                                                )
                                                                            }
                                                                            
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                )
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                    )
                                                }
                                               
                                                {
                                                    !schoolSelection && (
                                                        <div className="pool-container-footer">
                                                            <button onClick={() => submitBet()}>
                                                                <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                                                                Submit Prediction</button>
                                                        </div>
                                                    )
                                                }
                                                
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

                            <div className="side-container">
                                <div className="leaderboard-container">
                                    <h1>Leaderboard</h1>
                                    {
                                        leaderboard && leaderboard.map((item, index) => {
                                            return (
                                                <div className="leaderboard-item">
                                                    <h4>{item.place}.</h4>
                                                    <h5>{item.name}</h5>
                                                </div>
                                            )
                                        }
                                    )}
                                    <div className="leaderboard-item" >
                                                    <h4>...</h4>
                                    </div>
                                    <div className="leaderboard-item you" >
                                                    <h4>43.</h4>
                                                    <h5>You</h5>
                                    </div>

                                </div>
                            </div>
                    </div> 
                )
            }
            {
                currentView === 'about' && (
                    <div className="about-page">
                        <div className="about-content">
                            <nav>
                                <span className="about-tab-selected" onClick={(e) => handleAboutTab(e, 'aboutus')}>About Us</span>
                                <span onClick={(e) => handleAboutTab(e, 'foundingstory')}>Founding Story</span>
                                <span onClick={(e) => handleAboutTab(e, 'contestrules')}>Contest Rules</span>

                            </nav>
                            {
                                aboutPage === 'aboutus' && (
                                    <div className="aboutus">

                                        <h1>Welcome to Blockpool!</h1>
                                        <h2>
                                        Every March, the NCAA tournament provides a perfect opportunity for people to test their luck in bracket betting pools. It’s a way to participate in some friendly competition along with an option to potentially make some money. In its current state, however, there are only two ways to run a betting pool.
                                        </h2>
                                        <h3>
                                            There is an organizer who is in charge of collecting the money and paying it out. This person alone is responsible for making sure everyone pays and organizing the pool. Oftentimes, people forget to pay or the person in charge forgets to collect the money. Bottom line: there’s a single point of failure.
                                        </h3>
                                        <h3>
                                        Use a betting/bracket website that clumps you together with other strangers. These companies are usually very unclear with their fee structure and don’t let you create free pools with your friends.
                                        </h3>
                                        
                                        <p>
                                            At the moment, to participate in betting pools, you must make the tradeoff between transparency and centralization; the user has to either deal with some hidden fees or place their trust in a single person to run things correctly.
                                            What if this didn’t have to be the case? At Blockpool, our goal is to create a completely transparent and decentralized way to host pool bets. We accomplish this through the use of smart contracts: computer code on a blockchain network that can automate payments based on certain conditions. Now, instead of having to trust a single individual or a betting company that extorts you on fees, you place your trust in a piece of code that automatically and transparently pays out the winner for free. So for this March Madness, we’re putting our code to the test. While we can’t let our users bet on outcomes yet, we’re going to give away a bunch of money to simulate the real thing. Head over to the contest rules page to get an idea of our contest.
                                            However, our goals don’t stop here. The next step is to expand past March Madness and offer fully customizable free betting pools secured by blockchain technology. We hope to offer an alternative betting pool site for people who believe in transparency and fair gambling. Currently, the closest you can get to our ideal is participating in pools hosted by betting companies who charge at least 20% for their services. Eventually, we hope to be able to use our smart contracts to scale pool betting into a completely customizable/decentralized social event for you and your friends to create and participate in.
                                            Overall, Blockpool serves three main purposes: Take the fee extortion out of betting, add transparency, and hopefully add customization to a completely stagnant industry. We hope you can join us on our journey.
                                        </p>
                                    </div>
                                )
                            }

                            {
                                aboutPage === 'foundingstory' && (
                                    <div className="foundingstory">
                                        <h1>Our Team</h1>
                                        <div className="headshot-container">
                                            <img src={dude1}></img>
                                            <img src={dude2}></img>
                                            <img src={dude3}></img>
                                        </div>
                                        <p>
                                        The Blockpool idea was born out of a BC class where a professor challenged his students to create a project that effectively used blockchain technology to improve a current issue they faced in their life. As devout gamblers, Harry and Leo wanted a better solution to the gambling pools they participated in with their friends. Often the pools were with random people and everyone was forced to trust one individual to handle the Venmos from everyone. They couldn’t understand why no one had used blockchain to solve this issue. So they dedicated the whole semester to building a project that accommodated their needs.
Following some encouragement from Tzuo Law, the Economics professor who graded the project, the duo decided to pursue the idea further. They continued to build out the specifics over break, and during the spring semester, they brought on two new members to the team, Thomas and Colin, to help with some of the technical aspects of the project. Since then, they’ve been awarded a grant from the Economics Department at Boston College and accepted into the Start@Shea Accelerator.
We’re extremely grateful to everyone who’s helped us get the website to where it is now. Most notably all the help from our two primary mentors, Lewis Tseng and Tzuo Law, for their constant encouragement and guidance.
We’re not done, stay tuned for what comes next…
                                        </p>
                                    </div>
                                )
                            }

                            {
                                aboutPage === 'contestrules' && (
                                    <div className="contestrules">
                                        <h1>How to Play</h1>
                                        <p>
                                        Our contest will look a little different than a traditional March Madness bracket or betting pool, but stick with us, I’ll explain everything here. We need to test a lot of our code during this contest, and we’re giving away a ton of money to encourage as much participation as possible.
                                        To start, we’ll have four different bracket challenges. Each challenge, except the last, will consist of “one bracket round”, and there will be a winner after each round. So after the round of 64, there will be a winner for that challenge, and then we’ll send out an email blast notifying everyone to make their picks for the next challenge. In total, everyone will enter picks for four rounds and there will be four challenge winners: winner after the round of 64, winner after the round of 32, winner after the round of 16, and winner from the elite 8 to the final game. So instead of a normal bracket here’s what our challenges will look like. 
                                        So you may be wondering, if I win the first round why should I fill out a bracket for the second round? Well, we’ll have a leaderboard. The top ten in that leaderboard OVER ALL FOUR rounds will also win prizes. So everyone should participate in each challenge to be eligible for the leaderboard. We’ll make sure to send an email to notify you to get your new picks in after each round. The beauty of this is you get a fresh start after each round no matter how badly you did! We hope it encourages maximum participation.
                                        Prize Structure:
                                        Winner of each pool (4 total winners) = 100 (4)
                                        Top 10 Leaderboard (People who do the best in all total pools):
                                        Overall winner: 400
                                        Second Place: 200
                                        Third Place: 100
                                        Fourth and Fifth: 50(2) = 100
                                        Sixth and Tenth: 25(5) = 125
                                        We’re giving away 1,325 dollars!
                                        Since only BC students are participating in this giveaway, in the event of a tie we’ll email the students affected and they can decide how to handle it. We’ll also be using the email you signed up with to send out the prizes, so make sure it’s correct.
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            {
                currentView === 'leaderboard' && (
                    <div className="leaderboard-page">
                        <div className="leaderboard-content">
                            <div className="top-three-board">
                                <div className="third">
                                    <h1>3</h1>
                                    {
                                        leaderboard && leaderboard[2] && (
                                            <img loading="lazy" src={leaderboard[2].avatar}></img>
                                        )
                                    }
                                    
                                    <h3>{leaderboard[0].name}</h3>
                                    <p>{leaderboard[0].winnings} Points</p>
                                </div>

                                <div className="first">
                                    <h1>1</h1>
                                    <FontAwesomeIcon icon={faCrown} />
                                    {
                                        leaderboard && leaderboard[0] && (
                                            <img loading="lazy" src={leaderboard[0].avatar}></img>
                                        )
                                        
                                    }
                                    
                                    <h3>{leaderboard[0].name}</h3>
                                    <p>{leaderboard[0].winnings} Points</p>
                                </div>

                                <div className="second">
                                    <h1>2</h1>
                                    {
                                        leaderboard && leaderboard[1] && (
                                            <img loading="lazy" src={leaderboard[1].avatar}></img>
                                        )
                                    }
                                    <h3>{leaderboard[0].name}</h3>
                                    <p>{leaderboard[0].winnings} Points</p>
                                </div>
                            </div>

                            <table>
                                <tbody>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Points</th>
                                    </tr>
                                    
                                        {
                                        leaderboard && (leaderboard.slice(2)).map((user, index) => {
                                            return (
                                                <tr>
                                                    <td>{user.place}</td>
                                                    <td>
                                                        <span>
                                                            <img loading="lazy" src={user.avatar}></img>
                                                            {user.name}
                                                        </span>
                                                    </td>
                                                    <td>{user.winnings}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    

                                </tbody>
                            </table>
                            
                            
                        </div>
                    </div>
                )
            }
            {
                currentView === 'bets' && (
                    <div className="bets-page">
                        <div className="bets-content">
                            <nav>
                                <span className="bets-tab-selected" onClick={(e) => handleBetsTab(e, 'all')}>All</span>
                                <span onClick={(e) => handleBetsTab(e, '64')}>First Round</span>
                                <span onClick={(e) => handleBetsTab(e, '32')}>Second Round</span>
                                <span onClick={(e) => handleBetsTab(e, '16')}>Sweet 16</span>
                                <span onClick={(e) => handleBetsTab(e, 'finals')}>Elite Eight - Finals</span>
                            </nav>
                            <Bracket 
                                data={bracketList}
                            />
                        </div>
                    </div>
                )
            }
            </div>

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
            
        </div>
    );
    }

export default Homepage;