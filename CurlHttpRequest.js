import fetch from 'node-fetch';

function CurlHttpRequest() {
    const headers = {};
    let response = {};
    let status = '';

    this.AddHeader = (value) => {
        const parts = value.split(':');
        headers[parts[0]] = parts[1].trim();
    };
    this.Get = async (url, data) => {
        await makeCall(url, headers, 'GET');
        return response;
    };
    this.Put = async (url, data) => {
        await makeCall(url, headers, 'PUT', data);
        return response;
    };
    this.Post = async (url, data) => {
        await makeCall(url, headers, 'POST', data);
        return response;
    };
    this.Status = () => {
        return status;
    };

    async function makeCall(url, headers, method, data) {
        try {
            const options = {
                method: method, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: headers,
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            };

            if (data) {
                options.body = data;
            }
            // Default options are marked with *
            // console.log(options);
            const result = await fetch(url, options);
            status = result.status;

            try {
                response = await result.json();
                response = JSON.stringify(response);
            } catch (error) {

            }
        } catch (error) {
            status = error.status;
            response = error;
            return response;
        }
    }
}

export default CurlHttpRequest;