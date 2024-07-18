import React, { useState } from "react";
import styled from "styled-components";

const Circle = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f0f0;
  background-image: url(${(props) => props.imgsrc});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  font-size: 30px; /* Size of the plus sign */
  color: #333;
`;

const HiddenInput = styled.input`
  display: none;
`;

const CircleImageUploader = ({ image = null, setImage, disabled }) => {
  const handleImageChange = (e) => {
    if (disabled) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage({
        src: reader.result,
        file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <HiddenInput
        disabled={disabled}
        type="file"
        id="image-upload"
        onChange={handleImageChange}
        accept="image/*"
      />
      <Circle htmlFor="image-upload" imgsrc={image?.src}>
        {!image?.src && "+"}
      </Circle>
    </div>
  );
};

export default CircleImageUploader;
