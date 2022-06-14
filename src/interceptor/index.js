import axios from 'axios';

export default function() {
    axios.interceptors.request.use(request => {
        console.log("intercept");
        var localData = localStorage.getItem('user');
        if (localData) {
            var localDataObject = JSON.parse(localData);
            const token = localDataObject.token;
            if (token) {
                request.headers.common.Authorization = "Bearer "+token;
            }
        }
        return request;
    });
}