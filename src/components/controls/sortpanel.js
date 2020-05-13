import React from 'react';

export const Sortpanel = () => (
    <div className="sortpanel">
        <div className="controls__header">
            Сортировка
        </div>
        <div className="sortpanel__buttons">
            <div className="sortpanel__button">
                <a href="#" className="btn btn-blue">ID</a>
            </div>
            <div className="sortpanel__button">
                <a href="#" className="btn btn-primary">Имя</a>
            </div>
            <div className="sortpanel__button">
                <a href="#" className="btn btn-primary">Возраст</a>
            </div>
        </div>
        <div className="sortpanel__directions">
            <div className="sortpanel__direction">
                <a href="#" className="btn btn-primary">По-возрастанию</a>
            </div>
            <div className="sortpanel__direction">
                <a href="#" className="btn btn-primary">По-убыванию</a>
            </div>
        </div>
    </div>
);

export default Sortpanel;

