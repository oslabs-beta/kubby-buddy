import React, { FC, useContext } from "react";
import "./Images.scss";
import { UserContext } from "../../UserContext";

export const Images: FC = () => {
  const { availableImages } = useContext(UserContext);

  return (
    <div className="imagescontainer">
      {availableImages.map((el, index) => (
        <li className="listImage" key={index}>
          <div className="image-info">
            <p>{el.Repository}</p>
          </div>
        </li>
      ))}
    </div>
  );
};
