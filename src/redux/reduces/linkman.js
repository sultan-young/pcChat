const linkman = (prevState = [], action)=> {
    const {type, data } = action;
    switch (type) {
        case 'deleteLinkMan':
            let newState = prevState.filter(item=> item.username !== data)
            return newState;
        case 'addLinkMan':
            return [data, ...prevState];
        case 'updateLinkMan': 
            return [...data];
        default:
            return prevState;
    }
}

export default linkman;
