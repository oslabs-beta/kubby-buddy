import React from 'react'

export const StartButton: React.FC = () =>{
    
    //helper
    const handleStart = async () => {
        try{
            const response = await fetch('/container/start', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: `container-name`})
            })
            const data = await response.json()
            console.log(data)
        } catch(err){
            console.error(err)
        }

    }

    return (
        <button onClick={handleStart}>Start Container</button>
    )
}

