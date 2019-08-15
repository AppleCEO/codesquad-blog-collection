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

const Item = ({ title, desc, url, ...restProps }) => {
  return (
    <List>
      <StyledLink href={url}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={""} />
          </ListItemAvatar>
          <ListItemText primary={title} secondary={desc} />
        </ListItem>
      </StyledLink>
    </List>
  );
};

export default Item;
