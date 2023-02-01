import React, { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
  console.log(provider, signer, transactionContract);
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(null);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        setIsMetaMaskInstalled(false);
        return false;
      }
      setIsMetaMaskInstalled(true);
      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransaction = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18, //Conversion from GWEI to ETH
        })
      );
      setTransactions(structuredTransaction.reverse());
      //   console.log(availableTransactions);
    } catch (error) {}
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        setIsMetaMaskInstalled(false);
        return false;
      }
      setIsMetaMaskInstalled(true);
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log('No accounts found!');
      }
    } catch (error) {
      console.error(error);
      throw new Error('No Ethereum object.');
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      if (!ethereum) {
        setIsMetaMaskInstalled(false);
        return false;
      }
      setIsMetaMaskInstalled(true);
      const transactionContract = getEthereumContract();
      const transCount = await transactionContract.getTransactionCount();
      //   console.log("Transactions Count", transCount);
      localStorage.setItem('transactionCount', transCount);
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum object.');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setIsMetaMaskInstalled(false);
        return false;
      }
      setIsMetaMaskInstalled(true);
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('No Ethereum object.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        setIsMetaMaskInstalled(false);
        return false;
      }
      setIsMetaMaskInstalled(true);
      setTransactionStatus(null);
      setIsLoading(true);
      //Get the Data from the form directly into context
      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);
      const transactionContract = getEthereumContract();

      //Below this request is only sending Ethereum from 1 address to another
      await ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: '0x5208', // Should be in HEX i.e 21000 GWEI which is in ethereum -> 0.000021 eth
              value: parsedAmount._hex, // Should be in HEX and convert to hex first
            },
          ],
        })
        .then(async (response) => {
          console.log('In then send transaction');
          // Below: We need to store the transaction which happened above.
          const transactionHash = await transactionContract.addToBlockChain(
            addressTo,
            parsedAmount,
            message,
            keyword
          );
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          setIsLoading(false);
          console.log(`Success - ${transactionHash.hash}`);

          const transCount = await transactionContract.getTransactionCount();
          console.log('Transactions Count', transCount);
          setTransactionCount(transCount.toNumber());
          setTransactionStatus('success');
        })
        .catch((error) => {
          console.log('In catch Transaction failed');
          setTransactionStatus('error');
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      throw new Error('No Ethereum object.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleChange,
        formData,
        sendTransaction,
        isLoading,
        transactionCount,
        transactionStatus,
        transactions,
        isMetaMaskInstalled,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
