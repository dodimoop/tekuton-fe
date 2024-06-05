import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";

import React, { useState } from "react";

import { Delete, ListAlt } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider } from "react-hook-form";
import HobbyDrawer from "../../components/HobbyDrawer";
import MyButton from "../../components/MyButton";
import MyLoader from "../../components/MyLoader";
import MyToastContainer from "../../components/MyToastContainer";
import PageWrapper from "../../components/PageWrapper";
import { HobbyContext, useHobbyContext } from "./HobbyContext";

const Hobby = () => {
  const store = useHobbyContext();
  const queryClient = new QueryClient();
  const {
    handleSaveChange,
    dataHobby: hobby,
    detailHobby,
    setDetailHobby,
    isHobbyDrawerOpen,
    setIsHobbyDrawerOpen,
    handleRemoveHobby,
    isLoading,
    openDialog,
    setOpenDialog,
  } = store;

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      height: 1,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    // change background color
    "&:nth-of-type(odd)": {
      backgroundColor: "#e9f1ff",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // HANDLE TABLE AND PAGINATION
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleHobbyDrawerOpenClose = (item: any) => {
    setDetailHobby(item);
    setIsHobbyDrawerOpen(!isHobbyDrawerOpen);
    const isEdit = item !== null && typeof item === "object";
    if (isEdit) {
      store.methods.setValue("name", item?.name ?? "");
      store.methods.setValue("active", item?.active ?? false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog((prev) => !prev);
    location.reload();
  };

  const handleRemoveDialog = (item: any) => {
    setOpenDialog((prev) => !prev);
    setDetailHobby(item);
  };

  // Transition Dialog
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HobbyContext.Provider value={store}>
        <FormProvider {...store.methods}>
          <MyToastContainer />
          <PageWrapper>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ minHeight: "40px", display: "flex", alignItems: "center" }}
            >
              <Stack direction="column" spacing={2}>
                <Typography className="text-xl font-bold">
                  Hobby List
                </Typography>
              </Stack>
            </Grid>
            <HobbyDrawer
              open={isHobbyDrawerOpen}
              onClose={() => handleHobbyDrawerOpenClose(null)}
              detailHobby={detailHobby}
              handleSaveChange={() => handleSaveChange()}
            />
            {/* DIALOG */}
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialog}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                Are you sure you want to remove this data, {detailHobby?.name}?
              </DialogTitle>
              <DialogContentText ml={3}>
                Data will be permanently deleted!
              </DialogContentText>
              <DialogActions>
                <DialogActions>
                  <MyButton
                    variant="outlined"
                    color="warning"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </MyButton>
                  <MyButton
                    color="error"
                    onClick={() => {
                      setOpenDialog(false);
                      handleRemoveHobby(String(detailHobby?._id));
                    }}
                  >
                    Remove
                  </MyButton>
                </DialogActions>
              </DialogActions>
            </Dialog>
            {/* END DIALOG */}
            <Box mt={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <MyButton
                    onClick={() => {
                      store.methods.reset();
                      setIsHobbyDrawerOpen(true);
                    }}
                  >
                    Add Hobby
                  </MyButton>
                </Grid>
              </Grid>
            </Box>
            <Box py={2}>
              {isLoading ? (
                <MyLoader />
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">No.</StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">
                            Active
                          </StyledTableCell>
                          <StyledTableCell align="left">Status</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {hobby?.map((item: any, i: number) => (
                          <StyledTableRow key={i}>
                            <StyledTableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {i + 1}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item?.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item?.active ? (
                                <Chip
                                  label="Active"
                                  color="success"
                                  variant="filled"
                                />
                              ) : (
                                <Chip
                                  label="Inactive"
                                  color="error"
                                  variant="outlined"
                                />
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Edit/Detail">
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      handleHobbyDrawerOpenClose(item)
                                    }
                                    sx={{ color: "#00B4FF" }}
                                  >
                                    <ListAlt fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemoveDialog(item)}
                                    sx={{ color: "#FF0000" }}
                                  >
                                    <Delete fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={hobby?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </Box>
          </PageWrapper>
        </FormProvider>
      </HobbyContext.Provider>
    </QueryClientProvider>
  );
};

export default Hobby;
