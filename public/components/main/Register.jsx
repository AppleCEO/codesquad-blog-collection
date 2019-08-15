import React, { useState } from "react";
import useInputs from "../useInputs.jsx";
import CONFIGS from "../../constants/configs.js";
import styled from "styled-components";

const Input = styled.input`
  display: block;
`;
const makeDelay = timeInMs => {
  return new Promise(res => setTimeout(res, timeInMs));
};

const Register = props => {
  const [registerSuccess, setRegisterSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const [state, onChange] = useInputs({
    author: "",
    title: "",
    description: "",
    category: "",
    url: ""
  });

  const { author, title, description, category, url } = state;

  const requestRegister = async data => {
    try {
      const res = await fetch(`${CONFIGS.url}/link`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      console.log("res", res);
      setRegisterSuccess(res.status === 201 ? true : false);
    } catch (err) {
      console.warn(err);
      setRegisterSuccess(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await requestRegister(state);

    setLoading(false);
    await makeDelay(1000);
    props.onClose();
  };

  return (
    <>
      {loading && <h4>등록중...</h4>}
      {registerSuccess && <h4>등록되었습니다!</h4>}
      {!loading && !registerSuccess && (
        <>
          <h3>링크 등록</h3>
          <form onSubmit={handleSubmit}>
            <Input name="author" value={author} onChange={onChange} placeholder="작성자" />
            <Input name="title" value={title} onChange={onChange} placeholder="제목" />
            <Input name="description" value={description} onChange={onChange} placeholder="설명" />
            <Input name="category" value={category} onChange={onChange} placeholder="카테고리" />
            <Input name="url" value={url} onChange={onChange} placeholder="링크주소" />
            <button>등록</button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
