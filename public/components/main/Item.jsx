import React from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const StyledLink = styled.a`
  text-decoration: none;
`;

const StyleImg = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;

const Item = ({ title, desc, url, metadata = { image: { url: "" } } }) => {
  console.log(metadata);
  return (
    <List>
      <StyledLink href={url || ""}>
        <ListItem>
          <StyleImg src={metadata.image && metadata.image.url} />
          <ListItemText primary={title} secondary={desc} />
        </ListItem>
      </StyledLink>
    </List>
  );
};

export default Item;
