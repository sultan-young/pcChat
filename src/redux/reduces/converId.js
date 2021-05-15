const currentConverId = (prevState = '', action)=> {
    const {type, currentConverId = ''} = action;
    switch (type) {
        case 'changeConverId':
            return currentConverId;
        default:
            return prevState;
    }
}

export default currentConverId;
