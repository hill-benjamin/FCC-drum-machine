import React, { useState, useEffect, useCallback } from 'react';
import './Key.css'


const Key = ({volume, char, id, key, aud, setText}) => {
    const [isActive, setIsActive] = useState(false)

    const playAudio = useCallback(() => {
        if(isActive === false){ 
            const audio = document.getElementById(char);
            audio.currentTime = 0;
            audio.volume = volume / 100;
            audio.play();
            setText(audio.dataset.name)
            setIsActive(true);

            setTimeout(()=>{
                setIsActive(false)
            },50)
        }
    },[isActive, volume, setText, char]);

    useEffect(()=>{
        const handleKeyPress = (event) => {
            const keyPressed = event.key.toUpperCase();
            if (keyPressed === char){playAudio(char)};
          };
       
            document.addEventListener('keydown', handleKeyPress);
            return()=>{
                document.removeEventListener('keydown',handleKeyPress);
            };
    },[volume, char, playAudio])

    return(
        <button className={`key drum-pad ${isActive ? 'active' : ''}`} id={id} key={id} onClick={()=>{playAudio()}}>
            {char} 
            <audio id={char} className='clip' src={aud} data-name={id}/>
        </button>
    )
}

export default Key;