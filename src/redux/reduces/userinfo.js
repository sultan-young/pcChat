const userinfo = (prevState = {}, action)=> {
    const {type, userInfo = {}} = action;
    switch (type) {
        case 'change':
            let newState = {
                ...prevState,
                ...userInfo,
            }
            return newState;
        default:
            return prevState;
    }
}

export default userinfo;
