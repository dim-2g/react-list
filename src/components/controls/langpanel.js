import React from 'react';

export const Langpanel = (props) => (
    <div className="langpanel">
        <div className="langpanel__buttons">
            <div className="langpanel__button">
                <a href="#" className={props.lang==='ru' ? 'btn btn-blue' : 'btn btn-primary'} onClick={() => props.changeLang('ru')}>РУ</a>
            </div>
            <div className="langpanel__button">
                <a href="#" className={props.lang==='en' ? 'btn btn-blue' : 'btn btn-primary'} onClick={() => props.changeLang('en')}>ENG</a>
            </div>
        </div>
    </div>
);

export default Langpanel;

