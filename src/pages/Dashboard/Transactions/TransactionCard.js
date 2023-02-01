import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../../../assets/css/ConnectWalletGrid.css";
import { shortenAddress } from "../../../utils/shortenAddress";
import { Chip } from "@mui/material";

export default function TransactionCard({
  addressTo,
  addressFrom,
  amount,
  keyword,
  message,
  timestamp,
}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="transactionCard">
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="#fff" gutterBottom>
            From: {shortenAddress(addressTo)}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="#fff">
            To: {shortenAddress(addressFrom)}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="#fff">
            Amount: {amount}
          </Typography>
          <Typography variant="body2">
            Message:
            <br />
            {message}
          </Typography>
          <Chip color="info" size="small" label={timestamp} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    </Box>
  );
}
