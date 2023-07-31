import React, { useState, useEffect, useCallback } from 'react';
import './Key.css'


const Key = (props) => {
    const [isActive, setIsActive] = useState(false)

    const playAudio = useCallback((selector) => {
        if(isActive === false){ 
            const audio = document.getElementById(selector);
            audio.currentTime = 0;
            audio.volume = props.volume / 100;
            audio.play();
            props.setText(audio.dataset.name)
            setIsActive(true);

            setTimeout(()=>{
                setIsActive(false)
            },1)
        }
    },[isActive, props.volume, props.setText]);

    useEffect(()=>{
        const handleKeyPress = (event) => {
            const keyPressed = event.key.toUpperCase();
            if (keyPressed === props.char){playAudio(props.char)};
          };
       
            document.addEventListener('keydown', handleKeyPress);
            return()=>{
                document.removeEventListener('keydown',handleKeyPress);
            };
    },[props.volume, props.char, playAudio])

    return(
        <button className={`key drum-pad ${isActive ? 'active' : ''}`} id={props.id} key={props.id} onClick={()=>{playAudio(props.char)}}>
            {props.char} 
            <audio id={props.char} className='clip' src={props.aud} data-name={props.id}/>
        </button>
    )
}

export default Key;