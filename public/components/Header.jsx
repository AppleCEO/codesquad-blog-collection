import React from "react";
import styled from "styled-components";

const Wrapper = styled.h1`
  font-size: 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #3f51b5;

  a {
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #fff;
    padding-left: 2rem;
    padding-right: 2rem;
    text-decoration: none;
  }

  p {
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #fff;
    padding-left: 2rem;
    padding-right: 2rem;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <a href="/">LINKSQUAD</a>
      <p>코드스쿼드 학생들 블로그 링크를 공유하기 위해서 Dominic, Allen, Nailer, Dali가 해커톤에서 만든 서비스입니다.</p>
    </Wrapper>
  );
};

export default Header;
