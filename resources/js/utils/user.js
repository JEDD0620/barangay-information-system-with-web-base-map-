import Axios from "axios"

export const queryUser = async (setUser) => {
    let user = localStorage.getItem('user');
    if (!!user) {
        setUser(JSON.parse(user));
    } else {
        fetchUser(setUser)
    }
}

export const logoutUser = () => {
    Axios.post('/logout')
        .then(res => {
            localStorage.removeItem('user');
            location = '/login'
        }).catch(err => console.log(err))
}

const fetchUser = (setUser) => {
    Axios.get('/api/user')
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data))
            setUser(res.data);
        }).catch(err => console.log(err))
}