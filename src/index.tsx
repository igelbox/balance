import * as React from "react";
import {render} from "react-dom";
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {Application} from './application';

import './index.scss'

injectTapEventPlugin();

render(<Application modules={[
    { path: 'dashboard', component: require('./modules/dashboard').Component },
    { path: 'documents', component: require('./modules/documents').Component },
    { path: 'documents/:id', component: require('./modules/documents/editor').Editor },
]}/>, document.getElementById('main'));
