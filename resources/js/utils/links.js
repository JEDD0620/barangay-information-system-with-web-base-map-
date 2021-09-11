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


export const getParams = (k) => {
    let url = new URL(window.location.href);
    return url.searchParams.get(k);
}

export const setParams = (k, v) => {
    const url = new URL(window.location.href);
    url.searchParams.set(k, v);
    window.history.replaceState(null, null, url);
    return true;
}