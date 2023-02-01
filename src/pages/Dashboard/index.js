import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Grid, Snackbar } from "@mui/material";
import ConnectWalletGrid from "./ConnectWalletGrid";
import "../../assets/css/ConnectWalletGrid.css";
import InfoCard from "./InfoCard";
import SendEthereumForm from "./SendEthereumForm";
import { TransactionContext } from "../../context/TransactionContext";
import MuiAlert from "@mui/material/Alert";
import Transactions from "./Transactions";
import NoMetaMask from "../NoMetaMask";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { transactionStatus } = useContext(TransactionContext);

  useEffect(() => {
    if (transactionStatus) {
      setOpenSnackbar(true);
    } else {
      setOpenSnackbar(false);
    }
  }, [transactionStatus]);

  return (
    <>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={8} sx={{ p: 5 }}>
          <Grid container spacing={5}>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <ConnectWalletGrid />
            </Grid>
            <Grid item xs={6}>
              <InfoCard />
              <SendEthereumForm />
            </Grid>
            <Grid item xs={12}>
              <Transactions />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={transactionStatus}
          sx={{ width: "100%" }}
        >
          {transactionStatus === "success" ? (
            <strong>Hurray !!! Your transaction is successful.</strong>
          ) : (
            <strong>Ooppss !!! We're sorry your transaction failed.</strong>
          )}
        </Alert>
      </Snackbar>
      <NoMetaMask />
    </>
  );
};

export default Dashboard;
