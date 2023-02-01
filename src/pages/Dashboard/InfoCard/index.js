import { Card, CardContent, IconButton, Typography } from "@mui/material";
import EtheriumLogo from "../../../assets/imgs/ethereum.svg";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useContext } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import { shortenAddress } from "../../../utils/shortenAddress";

const InfoCard = () => {
  const { currentAccount } = useContext(TransactionContext);
  return (
    <Card className="gradientCard">
      <CardContent>
        <div>
          <div className="ethereumRoundedBorder">
            <img src={EtheriumLogo} alt="EtheriumImage" width={20} />
          </div>
          <IconButton sx={{ float: "right", color: "#fff" }}>
            <InfoOutlined />
          </IconButton>
        </div>
        <div className="addressWrapper">
          <Typography variant="body1" color="#fff" display="block">
            Address
          </Typography>
          <Typography
            variant="body2"
            color="#f5f5dc"
            gutterBottom
            display="block"
          >
            {shortenAddress(currentAccount)}
          </Typography>
          <Typography variant="h4" color="#fff">
            Ethereum
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
