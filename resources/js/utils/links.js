export const tosef = (str) => {
    if (!!str) {
        return str.replace(/[^\w\s]/gi, "").trim().replace(/\s+/g, '-').toLowerCase().replace(/^-/, '');
    } else {
        return str
    }
}

export const getParamsID = () => {
    return window.location.pathname.split('.').pop()
}