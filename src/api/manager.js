import axios from '~/axios.js'

export function login(username,password){
    return axios.post('/admin/login',{
        username,
        password
    })
}

export function getAccount(){
    return axios.get('/zhyhq.txt')
}

export function getApi(){
    return axios.get('/api.txt')
}
