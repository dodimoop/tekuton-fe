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
import MyButton from "../../components/MyButton";
import MyLoader from "../../components/MyLoader";
import MyToastContainer from "../../components/MyToastContainer";
import PageWrapper from "../../components/PageWrapper";
import UserDrawer from "../../components/UserDrawer";
import { UserContext, useUserContext } from "./UserContext";
import { Hobby } from "./UserTypes";

// Transition Dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const User = () => {
  const store = useUserContext();
  const queryClient = new QueryClient();
  const {
    handleSaveChange,
    isLoading,
    users,
    userDetail,
    setUserDetail,
    isUserDrawerOpen,
    setIsUserDrawerOpen,
    handleRemoveUser,
    dataHobbies,
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

  const [openDialog, setOpenDialog] = useState(false);

  const handleUserDrawerOpenClose = (item: any) => {
    setUserDetail(item);
    setIsUserDrawerOpen(!isUserDrawerOpen);
    const isEdit = item !== null && typeof item === "object";
    if (isEdit) {
      store.methods.setValue("firstName", item.firstName ?? "");
      store.methods.setValue("lastName", item.lastName ?? "");
      store.methods.setValue("age", item.age ?? null);
      store.methods.setValue("email", item.email ?? "");
      store.methods.setValue(
        "hobby_ids",
        item.hobby_ids?.map((hobby: any) => hobby._id) || []
      );
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog((prev) => !prev);
    location.reload();
  };

  const handleRemoveDialog = (item: any) => {
    setOpenDialog((prev) => !prev);
    setUserDetail(item);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={store}>
        <FormProvider {...store.methods}>
          <MyToastContainer />
          <PageWrapper>
            <Grid
              item
              xs={6}
              sm={6}
              sx={{ minHeight: "40px", display: "flex", alignItems: "center" }}
            >
              <Stack direction="column" spacing={2}>
                <Typography className="text-xl font-bold">User List</Typography>
              </Stack>
            </Grid>
            <UserDrawer
              open={isUserDrawerOpen}
              onClose={() => handleUserDrawerOpenClose(null)}
              userDetail={userDetail}
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
                Are you sure you want to remove, {userDetail?.firstName || ""}{" "}
                {userDetail?.lastName || ""}?
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
                      handleRemoveUser(String(userDetail?._id));
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
                      setUserDetail(null);
                      store.methods.reset();
                      setIsUserDrawerOpen(true);
                    }}
                  >
                    Add User
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
                          <StyledTableCell align="right">
                            First Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Last Name
                          </StyledTableCell>
                          <StyledTableCell align="center">Age</StyledTableCell>
                          <StyledTableCell align="center">
                            Email
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Hobby
                          </StyledTableCell>
                          <StyledTableCell align="left">Status</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users?.map((user: any, i: number) => (
                          <StyledTableRow key={i}>
                            <StyledTableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {i + 1}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {user?.firstName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {user?.lastName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {user?.age}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {user?.email}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {user?.hobby_ids
                                ? user?.hobby_ids.map((item: Hobby) => (
                                    <Chip
                                      key={item?._id}
                                      label={item?.name || ""}
                                      variant="outlined"
                                      style={{ margin: "0.5rem" }}
                                    />
                                  ))
                                : "-"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Edit/Detail">
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      handleUserDrawerOpenClose(user)
                                    }
                                    sx={{ color: "#00B4FF" }}
                                  >
                                    <ListAlt fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemoveDialog(user)}
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
                    count={users?.length || 0}
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
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default User;
