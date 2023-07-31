import React, { useEffect, useState } from 'react';
import './Machine.css'
import Key from './Key.js'
import keyboardKeys from '../data/keyboardKeys.js'

const Machine = () => {
    const [screenText, setScreenText] = useState('');
    const [volume, setVolume] = useState(50)

    const handleVolume = (event) => {
        const newVolume = parseInt(event.target.value);
        setVolume(newVolume)
    }

    useEffect(()=>{
        setScreenText('Volume: ' + volume)
    },[volume]);

    const keys = keyboardKeys.map((item) =>{
        return <Key volume={volume} char={item.char} id={item.id} key={item.id} aud={item.aud} setText={setScreenText}/>
    })

    return(
        <div className='Machine' id="drum-machine">
            <div className='keys-container'>
                {keys}
            </div>
            <div className='controls'>
                <div className='screen' id="display">
                    <p>{screenText}</p>
                </div>
                <p>Volume</p>
                <input type='range' min='0' max='100' value={volume} onChange={handleVolume} className='range'/>
            </div> 
           
        </div>
    )
}

export default Machine;