import React from 'react';
import Tap from 'react-interactions'
import PropTypes from "prop-types";

export const Langpanel = (props) => {
    const changeLang = function(e, lang) {
        e.preventDefault();
        props.changeLang(lang);
    };
    return (
    <div className="langpanel">
        <div className="langpanel__buttons">
            <div className="langpanel__button">
                <button
                    className={props.lang==='ru' ? 'btn btn-blue' : 'btn btn-primary'}
                    onClick={(e) => changeLang(e, 'ru')}
                >
                    РУ
                    <Tap scale fade waves />
                </button>
            </div>
            <div className="langpanel__button">
                <button
                    className={props.lang==='en' ? 'btn btn-blue' : 'btn btn-primary'}
                    onClick={(e) => changeLang(e, 'en')}
                >
                    ENG
                    <Tap scale fade waves />
                </button>
            </div>
        </div>
    </div>
)};

Langpanel.propTypes = {
    lang: PropTypes.string,
    changeLang: PropTypes.func.isRequired,
};

export default Langpanel;
