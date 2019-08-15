import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import FlatPagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

const Pagination = props => {
  const [offset, setOffset] = useState(0);

  const { totalPages } = props.pageData;

  const handleClick = offset => {
    setOffset(offset);
    props.onClick(offset / 10 + 1);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <FlatPagination limit={10} offset={offset} total={totalPages * 10} onClick={(e, offset) => handleClick(offset)} />
    </MuiThemeProvider>
  );
};

export default Pagination;
