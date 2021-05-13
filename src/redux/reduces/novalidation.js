const novalidation = (prevState = [], action)=> {
    const {type, data } = action;
    switch (type) {
        case 'deleteNova':
            let newState = prevState.filter(item=> item.username !== data)
            return newState;
        case 'addNova':
            return [data, ...prevState];
        case 'updateNova': 
            return [...data];
        default:
            return prevState;
    }
}

export default novalidation;
