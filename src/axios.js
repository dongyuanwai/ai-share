import axios from "axios"

const service = axios.create({
    baseURL:"https://openai3.xyz",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

export default service