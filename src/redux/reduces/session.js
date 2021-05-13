const session = (prevState = [], action)=> {
    const {type, data } = action;
    switch (type) {
        case 'deleteSession':
            let newState = prevState.filter(item=> item.username !== data)
            return newState;
        case 'addSession':
            return [data, ...prevState];
        case 'updateSession': 
            return [...data];
        default:
            return prevState;
    }
}

export default session;
