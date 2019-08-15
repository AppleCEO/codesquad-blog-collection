import React, { useState } from "react";
import useInputs from "../useInputs.jsx";
import CONFIGS from "../../constants/configs.js";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  display: block;
  font-family: inherit;
  font-size: 100%;
  width: 100%;
  border: 1px solid #dae1e7;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0.75rem;
`;

const PostBUtton = styled.button`
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  border-radius: 0.25rem;
  border: 0 solid #dae1e7;
  background-color: #3fc1c9;
  color: #fff;
  min-width: 100px;
`;

const DivR = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const FormTitle = styled.h3`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Register = () => {
  const [state, onChange] = useInputs({
    author: "",
    title: "",
    description: "",
    category: "",
    url: "",
  });
  const { author, title, description, category, url } = state;

  const requestRegister = async data => {
    try {
      const res = await fetch(`${CONFIGS.url}/link`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    requestRegister(state);
  };

  return (
    <FormContainer>
      <FormTitle>링크 등록</FormTitle>
      <form onSubmit={handleSubmit}>
        <Input name="author" value={author} onChange={onChange} placeholder="작성자" />
        <Input name="title" value={title} onChange={onChange} placeholder="제목" />
        <Input name="description" value={description} onChange={onChange} placeholder="설명" />
        <Input name="category" value={category} onChange={onChange} placeholder="카테고리" />
        <Input name="url" value={url} onChange={onChange} placeholder="링크주소" />
        <DivR>
          <PostBUtton>등록</PostBUtton>
        </DivR>
      </form>
    </FormContainer>
  );
};

export default Register;
