import React, { useState } from "react";
import useInputs from "../useInputs.jsx";
import CONFIGS from "../../constants/configs.js";

const Register = () => {
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
      console.log(res);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO: POST 요청 보내기
    console.log(state);
    requestRegister(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="author" value={author} onChange={onChange} placeholder="작성자" />
      <input name="title" value={title} onChange={onChange} placeholder="제목" />
      <input name="description" value={description} onChange={onChange} placeholder="설명" />
      <input name="category" value={category} onChange={onChange} placeholder="카테고리" />
      <input name="url" value={url} onChange={onChange} placeholder="링크주소" />
      <button>등록</button>
    </form>
  );
};

export default Register;
<button>등록</button>;
