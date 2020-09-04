const baseUrl = 'http://localhost:8000';

const subscribeUrl = baseUrl + '/subscribe/';

const get = (url) => {
    return fetch(url).then(resp => resp.json())
}


const post = (url, obj) =>{
    const configObj = {
        method : 'POST',
        headers: {
            "Content-Type": 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(obj)
    }
    return fetch(url, configObj)
}

const submitObj = (body) => {
    return post(subscribeUrl, body).then(resp => resp.json())
}

export default { submitObj }