import React from "react";
import styled from "styled-components";
import ListItemText from "@material-ui/core/ListItemText";
import Image from "../Image.jsx";

const StyledLink = styled.a`
  text-decoration: none;
`;

const Card = styled.li`
  list-style: none;
  display: flex;
  box-sizing: border-box;
  padding: 10px;
  width: 300px;
  margin: 16px;
  border-radius: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Item = ({ title, desc, url, metadata = { image: { url: "" } } }) => {
  return (
    <Card>
      <StyledLink href={url || ""}>
        <Image src={metadata.image && metadata.image.url} />
        <ListItemText primary={title} secondary={desc} />
      </StyledLink>
    </Card>
  );
};
export default Item;
