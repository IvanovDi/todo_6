function createID(length) {
    length = (length > 0 ? length : 8);
    let id = '';

    for (let i = 0; i < length; i++) {
        id += Math.floor((Math.random() * 16)).toString(16);
    }

    return id;
}

export default createID;
