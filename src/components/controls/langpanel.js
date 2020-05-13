import React from 'react';

export const Langpanel = (props) => (
    <div className="langpanel">
        <div className="langpanel__buttons">
            <div className="langpanel__button">
                <a href="#" className="btn {(props.lang == 'ru') ? 'btn-blue' : 'btn-primary'}">РУ</a>
            </div>
            <div className="langpanel__button">
                <a href="#" className="btn {(props.lang == 'en') ? 'btn-blue' : 'btn-primary'}">ENG</a>
            </div>
        </div>
    </div>
);

export default Langpanel;

