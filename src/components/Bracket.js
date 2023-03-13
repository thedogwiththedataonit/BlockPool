import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';
import React, { useState, useEffect } from 'react';



function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export const SingleElimination = (props) => {

    const [bracketList, setBracketList] = useState([]);
    console.log(props.data)
    const { height, width } = useWindowDimensions();
    console.log(height, width);
    const customTheme = createTheme({
        textColor: { main: '#fafafa', highlighted: '#fafafa', dark: '#fafafa' },
        matchBackground: { wonColor: 'green', lostColor: 'red' },
        score: {
          background: { wonColor: 'transparent', lostColor: 'transparent' },
          text: { highlightedWonColor: '#fafafa', highlightedLostColor: '#fafafa' },
        },
        border: {
          color: 'transparent',
          highlightedColor: 'orange',
        },
        roundHeader: { backgroundColor: '#fafafa', fontColor: '#000' },
        connectorColor: 'grey',
        connectorColorHighlight: '#fafafa',
        svgBackground: 'transparent',
      });
    
    const matches = [
        {
            "id": 260010,
            "name": "Round 0 - Match 0",
            "nextMatchId": 260000,
            "tournamentRoundText": "1",
            "startTime": "2021-05-30",
            "state": "DONE",
            "participants": [
                {
                    "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
                    "resultText": "WON",
                    "isWinner": true,
                    "status": null,
                    "name": "giacomo123"
                },
                {
                    "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                    "resultText": "LOST",
                    "isWinner": false,
                    "status": null,
                    "name": "giacomo122"
                }  
            ]
        },
        {
            "id": 260000,
            "name": "Round 1 - Match 1",
            "nextMatchId": 260001,
            "tournamentRoundText": "1",
            "startTime": "2021-05-30",
            "state": "DONE",
            "participants": [
                {
                    "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
                    "resultText": "WON",
                    "isWinner": false,
                    "status": null,
                    "name": "giacomo123"
                },
                {
                    "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                    "resultText": null,
                    "isWinner": true,
                    "status": null,
                    "name": "giacomo122"
                }  
            ]
        },
        {
            "id": 260000,
            "name": "Round 1 - Match 1",
            "nextMatchId": 260001,
            "tournamentRoundText": "1",
            "startTime": "2021-05-30",
            "state": "DONE",
            "participants": [
                {
                    "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
                    "resultText": "WON",
                    "isWinner": false,
                    "status": null,
                    "name": "giacomo123"
                },
                {
                    "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                    "resultText": null,
                    "isWinner": true,
                    "status": null,
                    "name": "giacomo122"
                }  
            ]
        },
        {
            "id": 260001,
            "name": "Round 2 - Match 2",
            "nextMatchId": 260005,
            "tournamentRoundText": "1",
            "startTime": "2021-05-30",
            "state": "DONE",
            "participants": [
                {
                    "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
                    "resultText": "WON",
                    "isWinner": false,
                    "status": null,
                    "name": "giacomo123"
                },
                {
                    "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                    "resultText": null,
                    "isWinner": true,
                    "status": null,
                    "name": "giacomo122"
                }  
            ]
        },
        {
            "id": 260001,
            "name": "Round 2 - Match 2",
            "nextMatchId": 260005,
            "tournamentRoundText": "1",
            "startTime": "2021-05-30",
            "state": "DONE",
            "participants": [
                {
                    "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
                    "resultText": "WON",
                    "isWinner": false,
                    "status": null,
                    "name": "giacomo123"
                },
                {
                    "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                    "resultText": null,
                    "isWinner": true,
                    "status": null,
                    "name": "giacomo122"
                }  
            ]
        }, 
        {
            "id": 260005,
            "name": "Final - Match",
            "nextMatchId": null,
            "tournamentRoundText": "4",
            "startTime": "2021-05-30",
            "state": "DONE",
            "participants": [
                {
                    "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
                    "resultText": "WON",
                    "isWinner": false,
                    "status": null,
                    "name": "giacomo123"
                },
                {
                    "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                    "resultText": null,
                    "isWinner": true,
                    "status": null,
                    "name": "giacomo122"
                }
            ]
        },
    ]

    //give me 68 unqiue schools
    const collegesArr = ["Alabama", "Arkansas", "Abilene Christian", "Arizona", "Baylor", "Clemson", "Colorado", "Creighton", "Drake", "Florida", "Florida State", "Georgetown", "Georgia Tech", "Gonzaga", "Grand Canyon", "Houston", "Illinois", "Iona", "Iowa", "Kansas", "Liberty", "Loyola Chicago", "LSU", "Maryland", "Michigan", "Michigan State", "Missouri", "Mount St. Mary's", "North Carolina", "North Texas", "Norfolk State", "Ohio State", "Oklahoma", "Oklahoma State", "Oregon", "Oregon State", "Purdue", "St. Bonaventure", "St. Mary's", "San Diego State", "Seton Hall", "South Dakota State", "Syracuse", "Texas", "Texas Southern", "Texas Tech", "UCLA", "UCSB", "UConn", "USC", "Utah State", "VCU", "Virginia", "Virginia Tech", "Wisconsin", "Winthrop", "West Virginia", "Western Kentucky", "Wichita State", "Xavier", "Yale"];

    const generateBracket = (colleges) => {
        console.log(colleges)
        if (colleges.length === 2) {
            const match = {
                "id": "final",
                "name": "Final - Match",
                "nextMatchId": null,
                "tournamentRoundText": "4",
                "startTime": "2021-05-30",
                "state": "DONE",
                "participants": [
                    {
                        "id": colleges[0],
                        "resultText": "LOST",
                        "isWinner": false,
                        "status": null,
                        "name": colleges[0]
                    },
                    {
                        "id": colleges[1],
                        "resultText": "WON",
                        "isWinner": true,
                        "status": null,
                        "name": colleges[1]
                    }
                ]
            }
            setBracketList(...bracketList, match)
            return true
        }
        else {
            let bracket = []
            for (let i = 0; i < colleges.length; i++) {
                console.log(i)
                const match = {
                    "id": "round1_"+ (parseInt(i)+1),
                    "name": "Round 1 - Match 1",
                    "nextMatchId": "round2_"+ (Math.floor((i)/2)+1) ,
                    "tournamentRoundText": "1",
                    "startTime": "2021-05-30",
                    "state": "DONE",
                    "participants": [
                        {
                            "id": colleges[i],
                            "resultText": "LOST",
                            "isWinner": false,
                            "status": null,
                            "name": colleges[i]
                        },
                        {
                            "id": colleges[i + 1],
                            "resultText": "WON",
                            "isWinner": true,
                            "status": null,
                            "name": colleges[i + 1]
                        }
                    ]
                }
                bracket.push(match)
            }
            console.log(bracket)
            setBracketList(bracket)
            //generateBracket(bracketList)
        }   
    }
    //remove any duplicates
    const simpleBracket = [
        //68 teams
        {
            "id": "1_1",
            "name": "Round 1 - Match 1",
            "nextMatchId": "2_1",
            "tournamentRoundText": "1",
            "startTime": "2021-05-30",
            "state": "DONE",
            "participants": [
                {
                    "id": "University of Texas at Arlington",
                    "resultText": "WON",
                    "isWinner": false,
                    "status": null,
                    "name": "University of Texas at Arlington"
                },
                {
                    "id": "Baylor University",
                    "resultText": null,
                    "isWinner": true,
                    "status": null,
                    "name": "Baylor University"
                }
            ]
        },

    ]

    useEffect(() => {
        //get the props.data
        //create the next matches, and link them to the previous ones
        //grab props.data and create the next matches

        //update bracketList with the new matches
        //const newBracketList = createNextMatches(props.data)
        console.log(props.data)
        //setBracketList(newBracketList)
        //setBracketList(generateBracket(colleges))


        //generateBracket(collegesArr)
        console.log(bracketList)
        

    }, [])

    const createNextMatches = (data) => {
        //recursive function that takes a list, and returns a list with the next matches

        //get the round from the first i in the list.id
        const round = parseInt(data[0].id.split("_")[0])
        console.log(round)

        if (round === 1) {
            return false
        }

        if (data.length === 1) {
            return false
        }
        console.log(data)
        const roundMatches = []
        for (let i = 1; i < data.length; i+=2) { //iterate by 2
                //check if data has a winner == true, if not, return "TBD"
                console.log(i)
                const firstParticipants = data[i].participants
                const secondParticipants = data[i-1].participants

                //check who has the winner == true
                let firstWinner = "TBD"
                let secondWinner = "TBD"

                for (let j = 0; j < firstParticipants.length; j++) {
                    if (firstParticipants[j].isWinner === true) {
                        firstWinner = firstParticipants[j].name
                    }
                }
                
                for (let j = 0; j < secondParticipants.length; j++) {
                    if (secondParticipants[j].isWinner === true) {
                        secondWinner = secondParticipants[j].name
                    }
                }

                console.log(firstWinner, secondWinner)
                const nextGame = {
                    "id": (round/2) + "_" + (i/2),
                    "name": "Match " + (round/2) + " " + (i/2), 
                    "nextMatchId": false,
                    "tournamentRoundText": "32",
                    "startTIme": "March 30",
                    "state": "DONE",
                    "participants": [
                        {
                            "id": firstWinner,
                            "resultText": "Won",
                            "isWinner": false,
                            'status': null,
                            "name": firstWinner,
                        },
                        {
                            "id": secondWinner,
                            "resultText": "Lost",
                            "isWinner": false,
                            'status': null,
                            "name": secondWinner,
                        }

                    ]
                }

                //append to bracketList
                roundMatches.push(nextGame)

        }
        console.log(roundMatches)
        //push each match in roundMatches to setBracketList
        for (let i = 0; i < roundMatches.length; i++) {
            data.push(roundMatches[i])
        }

        createNextMatches(roundMatches)
    }


    return (
        <>
        {
            //bracketList && bracketList.length > 0 && (
                <SingleEliminationBracket
                    matches={matches}
                    theme={customTheme}
                    matchComponent={Match}
                    options={{
                        style: {
                        roundHeader: {
                            backgroundColor: customTheme.roundHeader.backgroundColor,
                            fontColor: customTheme.roundHeader.fontColor,
                        },
                        connectorColor: customTheme.connectorColor,
                        connectorColorHighlight: customTheme.connectorColorHighlight,
                        },
                    }}
                    svgWrapper={({ children, ...props }) => (
                    <SVGViewer 
                        width={width-200} 
                        height={height-60} 
                        background={customTheme.svgBackground}
                        SVGBackground={customTheme.svgBackground}
                        {...props}>
                        {children}
                    </SVGViewer>
                    )}
        />
            //)
        }
        </>
        
    )
}

export default SingleElimination;


  