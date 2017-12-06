import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3003/static'

const get = function(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            });
    })
}

const post = function(url, params) {
    return new Promise((resolve, reject) => {
        resolve();
    })
}

export default {
    get, post
}