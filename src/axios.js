import axios from "axios"

const service = axios.create({
    baseURL:"https://openai3.xyz"
})

export default service