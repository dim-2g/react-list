import React from 'react';
import i18next from 'i18next';

export const Sortpanel = () => (
    <div className="sortpanel">
        <div className="controls__header">
            {i18next.t('sort')}
        </div>
        <div className="sortpanel__buttons">
            <div className="sortpanel__button">
                <a href="#" className="btn btn-blue">ID</a>
            </div>
            <div className="sortpanel__button">
                <a href="#" className="btn btn-primary">{i18next.t('sort_by_name')}</a>
            </div>
            <div className="sortpanel__button">
                <a href="#" className="btn btn-primary">{i18next.t('sort_by_age')}</a>
            </div>
        </div>
        <div className="sortpanel__directions">
            <div className="sortpanel__direction">
                <a href="#" className="btn btn-primary">{i18next.t('sort_dir_asc')}</a>
            </div>
            <div className="sortpanel__direction">
                <a href="#" className="btn btn-primary">{i18next.t('sort_dir_desc')}</a>
            </div>
        </div>
    </div>
);

export default Sortpanel;

