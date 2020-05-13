import React from 'react';

import Sortpanel from './sortpanel';
import Viewpanel from './viewpanel';

export const Controls = () => (
    <div className="controls">










    
        <div className="controls__grid">
            <div className="controls__sort">
                <Sortpanel />
            </div>
            <div className="controls__view">
                <Viewpanel />
            </div>
        </div>
    </div>
);

export default Controls;
