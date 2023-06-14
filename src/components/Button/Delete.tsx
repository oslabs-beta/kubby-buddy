// /prune-stopped-containers

import React from "react";


export const DeleteButton: React.FC = () => {

    //helper
    const handleDelete = async () => {
        try{
            const response = await fetch('/container/prune-stopped-containers', {
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({name:`container-name`})
            })
            const data = await response.json()
            console.log('test---->:' + data)
    
        } catch(err){
            console.error(err)
        }

    }

    return (
        <button onClick={handleDelete}>Delete Container</button>
    )

}