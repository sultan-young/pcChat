const groupList = (prevState = [], action)=> {
    const {type, data } = action;
    switch (type) {
        case 'deleteGroup':
            let newState = prevState.filter(item=> item._id !== data)
            return newState;
        case 'addGroup':
            return [data, ...prevState];
        case 'updateGroup': 
            return [...data];
        default:
            return prevState;
    }
}

export default groupList;
