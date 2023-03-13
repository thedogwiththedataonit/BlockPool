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
import { faBars, faCubes, faCube, faArrowLeft, faPeopleGroup, faDollarSign, faHome, faQuestionCircle, faCheckCircle , faCrown, } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import MiniLeaderboard from './MiniLeaderboard';
import { authenticatedFetch } from './AuthenticatedFetch';
import {url} from './env';

function Home(props) {
    const [viewPool, setViewPool] = useState(false);
    const [teamIndex, setTeamIndex] = useState(0);
    const [winningList, setWinningList] = useState([]);
    const [preEditIndex, setPreEditIndex] = useState(false);
    const [schoolSelection, setSchoolSelection] = useState(true);
    const [bracketList, setBracketList] = useState([]);
    const [betCompleted, setBetCompleted] = useState(false);
    const signedIn = false;

    const [round, setRound] = useState(null);

    const triggerPoolView = (e, round) => {
        setRound(round);
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


        if ((teamIndex < props.schools.length -1 ) && (!betCompleted)) {
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
        else if ((teamIndex === props.schools.length -1) || (betCompleted)) {
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
    }
    const submitBet = async () => {
        //go through winningList and create an array of the winners
        const winners = winningList.map((item) => item.winner);
        console.log(winners);

        const response = await authenticatedFetch(url+'/bets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "round": round,
                "bet": winners,
                })
        })
        const data = await response;
        console.log(data)

    }


    return (
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

                                                    <div className="game-container-pool" onClick={(e) => triggerPoolView(e, 1)}>
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
                                                            <div className="pool-container-team" onClick={() => nextTeam(props.schools[teamIndex].firstTeam, props.schools[teamIndex].firstImage, props.schools[teamIndex].secondTeam, props.schools[teamIndex].secondImage)}>
                                                                <img src={props.schools[teamIndex].firstImage} alt="bc" />
                                                                <h1>{props.schools[teamIndex].firstTeam}</h1> 
                                                                
                                                            </div>
                                                            <h6>VS</h6>
                                                            <div className="pool-container-team" onClick={() => nextTeam(props.schools[teamIndex].secondTeam, props.schools[teamIndex].secondImage, props.schools[teamIndex].firstTeam, props.schools[teamIndex].firstImage)}>
                                                                <img src={props.schools[teamIndex].secondImage} alt="bc" />
                                                                <h1>{props.schools[teamIndex].secondTeam}</h1>
                                                            
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
            </div>

                            <div className="side-container">
                                <MiniLeaderboard leaderboard={props.leaderboard}></MiniLeaderboard>
                            </div>
                    </div> 
    )
}

export default Home