function login(prevState = false, action) {
    const { type } = action;
    switch (type) {
        case 'login':
            return true;
        case 'logout':
            return false;
        default:
            return prevState;
    }
}

export default login;