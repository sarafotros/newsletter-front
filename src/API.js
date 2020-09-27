const gatewayAPIUrl = 'https://8koyu5qyv1.execute-api.eu-west-2.amazonaws.com/dev/'
const baseUrl = 'https://glacial-savannah-76541.herokuapp.com';
// const baseUrl = process.env.REACT_APP_API_URL;


// const subscribeUrl = baseUrl + '/subscribe/';
const subscribeUrl = gatewayAPIUrl + '/subscribe/';

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