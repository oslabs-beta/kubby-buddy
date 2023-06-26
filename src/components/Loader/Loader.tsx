//@ts-ignore
import * as React from 'react';
// import favicon from '../../assets/favicon.png';
import './Loader.scss';
const favicon = require('../../assets/favicon.png');

export default function Loader() {
  return (
    <div className="loader">
      <img className="loader-favicon" src={favicon} />
    </div>
  );
}
