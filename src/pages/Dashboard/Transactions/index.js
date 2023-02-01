import { Grid } from "@mui/material";
import { useContext } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import TransactionCard from "./TransactionCard";

const Transactions = () => {
  const { transactions } = useContext(TransactionContext);
  return (
    <Grid container spacing={3}>
      {transactions &&
        transactions.map((transaction, index) => (
          <Grid item xs={4} key={index}>
            <TransactionCard
              addressTo={transaction.addressTo}
              addressFrom={transaction.addressFrom}
              amount={transaction.amount}
              message={transaction.message}
              timestamp={transaction.timestamp}
              keyword={transaction.keyword}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default Transactions;
