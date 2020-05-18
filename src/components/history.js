import { browserHistory } from 'react-router';

const setUrlHistory = (obj) => {
    let url = new URL(window.location.href);
    const {name, value} = obj;
    url.searchParams.set(name, value);
    browserHistory.push(url);
}

export default setUrlHistory;