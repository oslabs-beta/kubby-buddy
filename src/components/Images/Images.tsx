import React, { FC, useContext } from 'react';
import './Images.scss';
import { UserContext } from '../../UserContext';
import { CreateCommands } from '../../components/Button/Create';

export const Images: FC = () => {
  const { availableImages } = useContext(UserContext);

  let images;

  if (typeof availableImages === 'string') {
    images = (
      <div>
        <p>You have no running images</p>
      </div>
    );
  } else {
    images = availableImages.map((el, index) => (
      <li className="listImage" key={index}>
        <div className="image-info">
          <p>{el.Repository}</p>
          <div className="image-subinfo">
            <p>Containers: {el.Containers}</p>
            <p>Time since created: {el.CreatedSince}</p>
            <p>Created At: {el.CreatedAt}</p>
            <p>Size: {el.Size}</p>
            <p>Tag: {el.Tag}</p>
            <p>ID: {el.ID}</p>
          </div>
        </div>
        <div className="cmdbutton">
          <CreateCommands
            name={el.Repository}
            cmdRoute={new URL('/image/run-images', window.location.href)}
            fetchMethod="post"
          />
        </div>
      </li>
    ));
  }

  return <div className="imagescontainer">{images}</div>;
};
