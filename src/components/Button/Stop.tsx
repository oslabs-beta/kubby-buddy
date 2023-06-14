import React from "react";

// import { CommandButtonProps } from "../../types";

// const StopButton: React.FC<CommandButtonProps> = ({name,cmdRoute,fetchMethod}) => {
//     async function command(){
//         try{
//             const URL = cmdRoute
//             const response = await fetch(URL, {
//                 method: fetchMethod
//             })
//             const data = await response.json()
//             console.log('----', data)
//         }catch(err){
//             console.error(err)
//         }
//     }
//     return (
//         <button className='stop' onClick={command}>{name}</button>
//     )

// }

export const StopButton: React.FC = () =>{
    
    //helper
    const handleStop = async () => {
        try{
            const response = await fetch('/container/log', {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({name:`container-name`})
            })
            const data = await response.json()
            console.log(data)
        } catch(err){
            console.error(err)
        }
    }


    return (
        <button onClick={handleStop}>Stop Container</button>
    )

}