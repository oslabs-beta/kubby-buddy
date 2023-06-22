import * as React from 'react';
import favicon from '../../assets/favicon.png';
import './Loader.scss';

export default function Loader() {
  return (
    <div className="loader">
      <img className="loader-favicon" src={favicon} />
    </div>
  );
}
