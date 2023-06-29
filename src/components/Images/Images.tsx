import React, { FC, useContext, useMemo } from 'react';
import './Images.scss';
import { UserContext } from '../../UserContext';
import { CreateCommands } from '../../components/Button/Create';
import { DeleteImageCommands } from '../Button/DeleteImage';
import { Image } from '../../types';
import Loader from '../Loader/Loader';

export const Images: FC = () => {
  const { availableImages } = useContext(UserContext);

  let images;

  const ImageContainer: React.FC<{ el: Image; index: number }> = React.memo(
    ({ el, index }) => {
      return (
        <li className="listImage" key={index}>
          <div className="image-info">
            <p className="image-title">{el.Repository}</p>
            <div className="image-subinfo">
              <p>Containers: {el.Containers}</p>
              <p>Time since created: {el.CreatedSince}</p>
            </div>
            <div className="image-subinfo">
              <p>Created At: {el.CreatedAt}</p>
              <p>Size: {el.Size}</p>
            </div>
            <div className="image-subinfo">
              <p>Tag: {el.Tag}</p>
              <p>ID: {el.ID}</p>
            </div>
          </div>
          <div className="cmdbutton">
            <DeleteImageCommands
              id={el.ID}
              cmdRoute={
                new URL('/image/remove-image-by-name', window.location.href)
              }
              fetchMethod="delete"
            />
            <CreateCommands
              name={el.Repository}
              cmdRoute={new URL('/image/run-images', window.location.href)}
              fetchMethod="post"
            />
          </div>
        </li>
      );
    }
  );

  if (typeof availableImages === 'string') {
    images = <Loader />;
  } else {
    images = useMemo(
      () =>
        availableImages.map((el, index) => (
          <ImageContainer el={el} index={index} key={`image${index}`} />
        )),
      [availableImages]
    );
  }

  return <div className="imagescontainer">{images}</div>;
};
