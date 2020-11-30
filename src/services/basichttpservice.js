import axios from 'axios';

export const basicHttpService = {
    getRequest: (url) => (
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .catch((err) => (err))
    ),
    createRequest: (url, data) => (
        axios.post(url, data, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    ),
    updateRequest: (url, data) => (
        axios.patch(url, data, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    ),
    deleteRequest: (url) => (
        axios.delete(url, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
        })
    ),
}

export default basicHttpService;
