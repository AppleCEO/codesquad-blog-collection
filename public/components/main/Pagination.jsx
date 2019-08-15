import React, { useState } from "react";
import styled from "styled-components";
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

  const PaginationWrapper = styled.div`
    box-sizing: border-box;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-bottom: 1rem;
  `;

  return (
    <PaginationWrapper>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <FlatPagination
          limit={10}
          offset={offset}
          total={totalPages * 10}
          onClick={(e, offset) => handleClick(offset)}
        />
      </MuiThemeProvider>
    </PaginationWrapper>
  );
};

export default Pagination;
