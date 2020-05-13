import React from 'react';

export const Viewpanel = () => (
    <div className="viewpanel">
        <div className="controls__header">
            Вид
        </div>
        <div className="viewpanel__buttons">
            <div className="viewpanel__button">
                <a href="#" className="btn btn-blue">Таблица</a>
            </div>
            <div className="viewpanel__button">
                <a href="#" className="btn btn-primary">Превью</a>
            </div>
        </div>
    </div>
);

export default Viewpanel;
