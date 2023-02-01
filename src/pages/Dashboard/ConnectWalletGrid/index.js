import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../../assets/css/ConnectWalletGrid.css";
import { TransactionContext } from "../../../context/TransactionContext";

const ConnectWalletGrid = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  return (
    <Card sx={{ margin: "0 auto" }}>
      <CardMedia component="div" className="connectWalletImage" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Crypto Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Send your Crypto across the world at a click of a button. 😀
        </Typography>
        {!currentAccount && (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectWalletGrid;
