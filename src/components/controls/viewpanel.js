import React from 'react';
import classNames from 'classnames';
import i18next from 'i18next';

export const Viewpanel = (props) => {
    const { view } = props;
    const { setView } = props;
    const tableClass = classNames('btn', {'btn-blue':view=='table'}, {'btn-primary':view!='table'});
    const previewClass = classNames('btn', {'btn-blue':view=='preview'}, {'btn-primary':view!='preview'});
    return (
    <div className="viewpanel">
        <div className="controls__header">
            {i18next.t('view')}
        </div>
        <div className="viewpanel__buttons">
            <div className="viewpanel__button">
                <a href="#" className={tableClass} onClick={() => setView('table')}>{i18next.t('table_view')}</a>
            </div>
            <div className="viewpanel__button">
                <a href="#" className={previewClass} onClick={() => setView('preview')}>{i18next.t('preview_view')}</a>
            </div>
        </div>
    </div>
)};

export default Viewpanel;
