import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import "../../../assets/css/ConnectWalletGrid.css";
import { TransactionContext } from "../../../context/TransactionContext";

const SendEthereumForm = () => {
  const {
    handleChange,
    formData,
    sendTransaction,
    isLoading,
    transactionStatus,
  } = useContext(TransactionContext);

  useEffect(() => {
    // console.log("transactionStatus", transactionStatus);
    if (transactionStatus === "success") {
      setTimeout(() => {
        window.location.reload();
      }, 10000);
    }
  }, [transactionStatus]);
  const handleSubmit = () => {
    const { addressTo, amount, keyword, message } = formData;
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <Card sx={{ mt: 3 }} className="sendEthForm">
      <CardContent>
        <TextField
          fullWidth
          placeholder="Address To"
          name="addressTo"
          sx={{ my: 1 }}
          onChange={(e) => handleChange(e, "addressTo")}
        />
        <TextField
          type="number"
          fullWidth
          placeholder="Amount (ETH)"
          name="amount"
          inputProps={{
            step: 0.0001,
          }}
          sx={{ my: 1 }}
          onChange={(e) => handleChange(e, "amount")}
        />
        <TextField
          fullWidth
          placeholder="Keyword"
          name="keyword"
          sx={{ my: 1 }}
          onChange={(e) => handleChange(e, "keyword")}
        />
        <TextField
          fullWidth
          placeholder="Enter Message"
          name="message"
          sx={{ my: 1 }}
          onChange={(e) => handleChange(e, "message")}
        />
        <Divider sx={{ my: 2, background: "black" }} />

        {!isLoading ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
          >
            Send Now
          </Button>
        ) : (
          <div className="textCenter">
            <CircularProgress color="secondary" />
            <Typography variant="body1" color="primary">
              Please wait... we're processing your transaction
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SendEthereumForm;
