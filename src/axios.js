import axios from "axios"

const service = axios.create({
    baseURL:"http://openai3.xyz"
})

export default service