import * as React from 'react';
import * as $ from 'jquery';

import { Collapsible } from '../materialize/Collapsible';

declare let Materialize;

import './ProductList.scss';

export const ProductList = (props: {
  items: any[],
  onChange: (items) => any,
}) =>
  <Collapsible>
    {props.items.map((item) =>
      <li key={item.id}>
        <div className="collapsible-header">
          <div className="main">
            <div className="title">{item.title}</div>
            <div className="text grey-text text-darken-2">{item.value} кг</div>
          </div>
          <div className="right">
            <div>{item.total} руб</div>
            {item.discount ? <div className="red-text">{item.discount}</div> : undefined}
          </div>
        </div>
        <div className="collapsible-body">
          <div className="row">
            <div className="input-field col s12">
              <input id="last_name" type="number" className="validate" value={item.value} onChange={(event) => {
                const str = (event.target as any).text;
                const value = str ? Number(str) : undefined;
                const nitems = props.items.map((i) => {
                  return i === item ? { ...item, value } : i;
                });
                props.onChange(nitems);
              }} />
              <label htmlFor="last_name" className="active">Количество</label>
            </div>
          </div>
          <a className="waves-effect waves-light btn green right">Применить</a>
          <a className="waves-effect waves-light btn red" onClick={() => {
            const nitems = props.items.filter((i) => i !== item);
            props.onChange(nitems);
            Materialize.toast($('<div>Товар удалён <a class="btn-flat yellow-text">Восстановить</a></div>'), 5000);
          }}>Удалить</a>
        </div>
      </li>)}
  </Collapsible>;
