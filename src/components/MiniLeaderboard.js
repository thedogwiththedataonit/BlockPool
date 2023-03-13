import './Homepage.css';
import React from 'react';

import { useState, useEffect } from 'react';

function MiniLeaderboard(props) {
    return (
        <div className="leaderboard-container">
            <h1>Leaderboard</h1>
                {
                props.leaderboard && props.leaderboard.map((item, index) => {
                    return (
                        <div className="leaderboard-item">
                            <h4>{item.place}.</h4>
                            <h5>{item.name}</h5>
                        </div>
                        )
                    }
                )}
                <div className="leaderboard-item" >                    <h4>...</h4>
                </div>
                <div className="leaderboard-item you" >
                    <h4>43.</h4>
                    <h5>You</h5>
                </div>

        </div>
    )
        
    
}

export default MiniLeaderboard;