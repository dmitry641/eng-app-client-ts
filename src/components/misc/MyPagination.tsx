import { Box, Pagination } from "@mui/material";
import React from "react";

interface MyPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPage: number;
}
export const MyPagination: React.FC<MyPaginationProps> = ({
  currentPage,
  maxPage,
  onPageChange,
}) => {
  if (maxPage === 1) return null;
  return (
    <Box mt={2} display="flex" justifyContent="center">
      <Pagination
        page={currentPage}
        onChange={(_, p) => onPageChange(p)}
        count={maxPage}
        variant="outlined"
        shape="rounded"
        sx={{ "& .MuiPagination-ul": { flexWrap: "nowrap" } }}
      />
    </Box>
  );
};
