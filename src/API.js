const baseUrl = 'https://glacial-savannah-76541.herokuapp.com';
// const baseUrl = process.env.REACT_APP_API_URL;

const subscribeUrl = baseUrl + '/subscribe/';

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