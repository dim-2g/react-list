import React from 'react';
import classNames from 'classnames';
import i18next from 'i18next';
import Tap from 'react-interactions'

import setUrlHistory from '../history';
import PropTypes from "prop-types";
import Langpanel from "./langpanel";

export const Viewpanel = (props) => {
    const { view } = props;
    //const { setView } = props;
    const tableClass = classNames('btn', {'btn-blue':view=='table'}, {'btn-primary':view!='table'});
    const previewClass = classNames('btn', {'btn-blue':view=='preview'}, {'btn-primary':view!='preview'});
    const setView = function(e, view) {
        e.preventDefault();
        props.setView(view);
        props.reinitVisibleUsers(view);
        setUrlHistory({name:'view', value:view});
    }
    return (
    <div className="viewpanel">
        <div className="controls__header">
            {i18next.t('view')}
        </div>
        <div className="viewpanel__buttons">
            <div className="viewpanel__button">
                <button className={tableClass} onClick={(e) => setView(e, 'table')}>
                    {i18next.t('table_view')}
                    <Tap scale fade waves />
                </button>
            </div>
            <div className="viewpanel__button">
                <button className={previewClass} onClick={(e) => setView(e, 'preview')}>
                    {i18next.t('preview_view')}
                    <Tap scale fade waves />
                </button>
            </div>
        </div>
    </div>
)};

Viewpanel.propTypes = {
    lang: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    setView: PropTypes.func.isRequired,
    reinitVisibleUsers: PropTypes.func.isRequired,
};

export default Viewpanel;
