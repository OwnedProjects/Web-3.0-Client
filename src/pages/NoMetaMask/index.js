import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import MetaMaskIcon from "../../assets/imgs/mm-logo.svg";
import ChromeIcon from "../../assets/imgs/Chrome.png";
import FirefoxIcon from "../../assets/imgs/Firefox.png";
import EdgeIcon from "../../assets/imgs/Edge.png";

const NoMetaMask = () => {
  const { isMetaMaskInstalled } = useContext(TransactionContext);
  //   console.log("isMetaMaskInstalled", isMetaMaskInstalled);
  return (
    !isMetaMaskInstalled &&
    isMetaMaskInstalled !== null && (
      <Dialog open={true} maxWidth="xl">
        <DialogTitle color="error">
          <AppBlockingIcon
            sx={{ marginTop: "5px", float: "left", fontSize: "2rem" }}
          />
          <Typography component="strong" sx={{ mx: 2, fontSize: "2rem" }}>
            No <img src={MetaMaskIcon} alt="Metamask Icon" width={180} />{" "}
            Extension Found !!!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Please install the same from the following Locations
          </Typography>
          <Typography variant="h5" sx={{ my: 1 }}>
            Extension For <img src={ChromeIcon} width={25} alt="Chrome Icon" />:
            <span> </span>
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
              rel="noreferrer"
            >
              Click here
            </a>
          </Typography>
          <Typography variant="h5" sx={{ my: 1 }}>
            Extension For <img src={FirefoxIcon} width={25} alt="Chrome Icon" />
            :<span> </span>
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
              target="_blank"
              rel="noreferrer"
            >
              Click here
            </a>
          </Typography>
          <Typography variant="h5" sx={{ my: 1 }}>
            Extension For <img src={EdgeIcon} width={25} alt="Chrome Icon" />:
            <span> </span>
            <a
              href="https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US"
              target="_blank"
              rel="noreferrer"
            >
              Click here
            </a>
          </Typography>
        </DialogContent>
      </Dialog>
    )
  );
};

export default NoMetaMask;
