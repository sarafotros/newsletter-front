const gatewayAPIUrl = 'https://8koyu5qyv1.execute-api.eu-west-2.amazonaws.com/dev'
// const gatewayAPIUrl = 'https://oehrwzzfxh.execute-api.eu-west-2.amazonaws.com/dev'
const subscribeUrl = gatewayAPIUrl + '/subscribe';
// const subscribeUrl = gatewayAPIUrl + '/createSub';

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