//---------------- DOCKER COMMAND MAKERS ----------------//
//note: I don't think we should allow command text to be sent from the frontend, because someone can maliciously attack our computers with postman


//start or stop
function dockerStartOrStop(command: string, id?: number): string {
    if (id !== undefined) {
        return `docker ${command} ${id}`
    } else {
        return `docker ${command}`
    }
}


//show all container or images, actieve & inactive

function showAll(input: string): string {
    if (input === 'images') {
        return `docker images}`
    } else {
        return `docker ps -a`
    }
}

//