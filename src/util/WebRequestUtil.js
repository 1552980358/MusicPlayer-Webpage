import axios from 'axios';

export function getResource(url, onSuccess) {
    axios.get(url,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': window.location.origin,
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '0'
        },
    }).then(onSuccess);
}

export function uploadFile(url, fileName, file, progress, onSuccess, onFailed) {
    let formData = new FormData();
    formData.append(fileName, file);
    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': window.location.origin,
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '0'
        },
        onUploadProgress: progress,
    }).then(onSuccess).catch(onFailed);
}