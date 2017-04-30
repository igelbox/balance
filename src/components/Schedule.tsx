import * as React from 'react';

import './Schedule.scss';

const DOWS = 'пн,вт,ср,чт,пт,сб,вс'.split(',').map(s => s.toUpperCase()); //.map(s => s[0].toUpperCase() + s.substring(1));

export const Schedule = (props: {
  data: {
    name: string,
    schedule: {},
  }[]
}) => {
  const days = [];
  for (let i = 0; i < 30; ++i) {
    days.push({
      day: i + 1,
      dow: (i + 5) % 7,
    });
  }
  return <div className="schedule">
    <table className="centered bordered">
      <thead>
        <tr>
          <th />
          {days.map((d) => <th key={d.day} className={d.dow >= 5 ? 'we we' + (d.dow - 4) : ''}>{d.day} {DOWS[d.dow]}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.data.map((pers) => <tr key={pers.name}>
          <th className="fixed">{pers.name}</th>
          {days.map((d) => {
            const w = pers.schedule[d.day];
            const s = [];
            if (w) {
              /*if (w[0] !== 10) {
                s.push('с ' + fmttime(w[0]));
              }
              if (w[1] !== 22) {
                s.push('по ' + fmttime(w[1]));
              }*/
              s.push(w.map(fmttime).join(' - '));
            }
            return <td key={d.day} className={d.dow >= 5 ? ' we we' + (d.dow - 4) : ''}><a className={w ? 'used' : ''} onClick={() => alert(d.day)}>{s.join('\n')}</a></td>;
          })}
        </tr>)}
      </tbody>
    </table>
  </div>;
}

function fmttime(t) {
  const nh = t | 0;
  let sm = String((60 * (t - nh)) | 0);
  if (sm.length < 2) {
    sm = '0' + sm;
  }
  return nh + ':' + sm;
}
