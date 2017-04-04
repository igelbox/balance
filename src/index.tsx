import * as React from 'react';
import { render } from 'react-dom';
import { Application } from './Application';

import './index.scss';

import * as $ from 'jquery';
(window as any).jQuery = $;
import 'materialize-css/dist/js/materialize';

render(<Application />, document.getElementById('main'));
