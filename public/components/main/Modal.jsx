import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled, { keyframes } from "styled-components";
import Modal from "@material-ui/core/Modal";
import Register from "./Register.jsx";
import Fab from "@material-ui/core/Fab";
import Image from "../Image.jsx";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #eee",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2),
  },
  floating: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const plusImgSrc = `https://image.flaticon.com/icons/svg/60/60740.svg`;

  const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

  const Button = styled.div`
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      animation: ${bounce} 0.5s linear alternate;
    }
  `;

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.floating} onClick={handleOpen}>
        <Button>
          <Image src={plusImgSrc} alt="" width="50" height="50" />
        </Button>
      </Fab>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Register onClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}
