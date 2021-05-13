const avatoar = (prevState = {}, action)=> {
    const {type, option = {}} = action;
    switch (type) {
        case 'changeAvatoar':
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
