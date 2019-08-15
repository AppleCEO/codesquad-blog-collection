import React from "react";
import styled from "styled-components";
//  TODO

const replaceDefaultImag = e => {
  e.target.onerror = null;
  // todo default image로 대체
  e.target.src = "http://www.igdir.edu.tr/Addons/Resmi/Images/User-Profile/profil-19.png";
};

const StyledImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;
const Image = ({ src }) => {
  return <StyledImg src={src} onError={replaceDefaultImag} />;
};

export default Image;
