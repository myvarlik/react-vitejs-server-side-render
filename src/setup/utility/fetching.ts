import axios from "axios";

export const fetching = function (options: any, thenHandler: any = null, catchHandler: any = null) {
    const { token, cancel } = axios.CancelToken.source();
    options.cancelToken = token;

    let request = axios(options)
    if (thenHandler)
        request = request.then(thenHandler)
    if (catchHandler)
        request = request.catch(catchHandler)

    request.cancel = cancel;
    return request;
}