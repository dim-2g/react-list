import { browserHistory } from 'react-router';

const setUrlHistory = (obj) => {
    let url = new URL(window.location.href);
    const {name, value} = obj;
    if (value) {
        url.searchParams.set(name, value);
    } else {
        url.searchParams.delete(name);
    }
    browserHistory.push(url);
}

export default setUrlHistory;
