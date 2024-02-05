import axios from 'axios'
const baseUrl = '/api'

const login = user => {    
    return axios.post(baseUrl + '/login', user)
}

const register = user => {
    return axios.post(baseUrl + '/register', user)
}

const update = user => {
    return axios.put(baseUrl + `/profile/${user.num}`, user)
}

const getProfileData = (userToken, userNum) => {
    return axios.get(baseUrl + `/profile/${userNum}`, { headers: {"Authorization" : `Bearer ${userToken}`} })
}

export default {
    login: login,
    register: register,
    update: update,
    getProfileData: getProfileData
}