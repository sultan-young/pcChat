const avatoar = (prevState = {}, action)=> {
    const {type, option = {}} = action;
    switch (type) {
        case 'change':
            let newState = {
                ...prevState,
                ...option,
            }
            return newState;
        default:
            return prevState;
    }
}

export default avatoar;
