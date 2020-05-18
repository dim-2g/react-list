import React from 'react';

export const Langpanel = (props) => {
    const changeLang = function(e, lang) {
        e.preventDefault();
        props.changeLang(lang);
    }
    return (
    <div className="langpanel">
        <div className="langpanel__buttons">
            <div className="langpanel__button">
                <a href="#" className={props.lang==='ru' ? 'btn btn-blue' : 'btn btn-primary'} onClick={(e) => changeLang(e, 'ru')}>РУ</a>
            </div>
            <div className="langpanel__button">
                <a href="#" className={props.lang==='en' ? 'btn btn-blue' : 'btn btn-primary'} onClick={(e) => changeLang(e, 'en')}>ENG</a>
            </div>
        </div>
    </div>
)};

export default Langpanel;