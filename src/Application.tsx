import * as React from 'react';
import * as $ from 'jquery';

import { buildClassName } from './utils';
import { Icon } from './materialize/Icon';
import { Navbar } from './materialize/Navbar';
import * as Dropdown from './materialize/Dropdown';
import { Tab, Tabs } from './materialize/Tabs';
import { Modal } from './materialize/Modal';

import { ProductList } from './components/ProductList';
import { Schedule } from './components/Schedule';

import schedule_data from './schedule.data';

export class Application extends React.Component<any, {
  items: any[],
  cash: number,
}> {
  state = {
    items: [{
      id: 0,
      title: 'Земляничный (чай ройбуш)',
      value: 0.185,
      total: 730.75,
      discount: '- 15%',
    }, {
      id: 1,
      title: 'Молочный (чай пуэр)',
      value: 0.095,
      total: 274.55,
    }],
    cash: 0,
  };

  constructor() {
    super();
  }

  render() {
    const count = this.state.items.length;
    const total = this.state.items.reduce((a, e) => a + e.total, 0);
    return <div>
      <Navbar
        title={'Чек: ' + n2f(total, 2) + ' р'}
        right={
          <ul>
            <li><a href="#action-close"><Icon name="done" /></a></li>
            <Dropdown.Button constrainWidth={false} alignment="right" activates="dropdown-more"><Icon name="more_vert" /></Dropdown.Button>
          </ul>
        }
        content={
          <Tabs transparent={true} fixedWidth={true}>
            <Tab active={true} href="#view-goods" className={buildClassName({ yellowText: !!count })}>Товары{count ? ': ' + count : ''}</Tab>
            <Tab href="#view-certs">Сертификаты</Tab>
            <Tab href="#view-client">Клиент</Tab>
          </Tabs>
        }
      />
      <ul id="dropdown-more" className="dropdown-content right">
        <li><a href="#"><Icon name="credit_card" />Карта клиента</a></li>
        <li className="divider"></li>
        <li><a href="#!"><Icon name="clear" />Очистить чек</a></li>
      </ul>

      <ul className="side-nav" id="mobile-demo">
        <li>
          <div className="userView light-blue">
            {/*<a href="#!user"><img className="circle" src="../logo.png" /></a>*/}
            <a href="#!name"><span className="name white-text">Кассир</span></a>
            <a href="#!email"><span className="email white-text">jdandturk@gmail.com</span></a>
          </div>
        </li>
        <li className="active"><a href="#!">Касса</a></li>
        <li><a href="#!">Ассортимент</a></li>
        <li><div className="divider"></div></li>
        <li><a className="waves-effect" href="#!">Выйти</a></li>
      </ul>

      {count ? <div id="view-goods" className="row">
        <div className="col s12">
          <ProductList
            items={this.state.items}
            onChange={(items) => this.setState({
              ...this.state,
              items,
            })}
          />
        </div>
      </div> : undefined}

      <Schedule data={schedule_data} />

      <div className="fixed-action-btn">
        <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.addItem.bind(this)}>
          <Icon name="add" />
        </a>
      </div>
      <Modal id="action-close" fixedFooter bottomSheet>
        <div className="modal-content row">
          <Tabs fixedWidth>
            <Tab active href="#pay-cash">Наличные</Tab>
            <Tab href="#pay-card">Карта</Tab>
          </Tabs>
          <form className="row">
            <div id="pay-cash">
              <div className="input-field col s4">
                <input id="total" type="number" value={String(total)} readOnly />
                <label htmlFor="total" className="active">Сумма</label>
              </div>
              <div className="input-field col s4">
                <input id="cash" type="number" autoFocus
                  value={String(this.state.cash)}
                  onChange={(event) => {
                    this.setState({
                      ...this.state,
                      cash: Number((event.target as any).value),
                    });
                  }}
                />
                <label htmlFor="cash">Наличные</label>
              </div>
              <div className="input-field col s4">
                <input id="payback" type="number" readOnly value={String(n2f(this.state.cash - total, 2))} />
                <label htmlFor="payback" className="active">Сдача</label>
              </div>
            </div>
            <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea" />
              <label htmlFor="textarea1">Комментарий</label>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Закрыть чек</a>
        </div>
      </Modal>
      <ul id="dropdown-more" className="dropdown-content right-menu">
        <li><a href="#"><Icon name="credit_card"/>Карта клиента</a></li>
        <li className="divider"></li>
        <li><a href="#!"><Icon name="clear"/>Очистить чек</a></li>
      </ul>
    </div>;
  }

  componentDidMount() {
  }

  addItem() {
    const items = [{
      id: Math.random(),
      title: 'ejhgqj bhqgbr e',
      value: n2f(Math.random(), 3),
      total: n2f(Math.random() * 1000, 2),
      discount: [undefined, '- 5%', '- 10%', '- 15%'][(Math.random() * 4) | 0],
    } as any].concat(this.state.items);
    this.setState({
      ...this.state,
      items,
    });
  }
}

function n2f(n, d) {
  const k = Math.pow(10, d);
  return Math.floor(n * k) / k;
}
