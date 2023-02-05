# KnowledgeKeen - React application to Connect and Transact with Test Ethereum via MetaMask

Started this project as a learning and understanding of React and Solidity. Slowly and steadily enhanced this from a simple POC to a full-fledged application that can take any kind of Crypto as input and can be sent over a network for some gas fee.

## Network Switching

This was initially tested on the Ropsten network but as recently Ropsten was completely depreciated (you can still do the transactions, but cannot fetch the details). Hence, as a result, moved this application from the Ropsten test network to the Goerli test network with only a few modifications.

As of now, the application is much more customizable, and using only a few tweaks you can move from the Goerli test network to any other test network with ease.

## Technologies To Know

This project was packaged using `create-react-app` so no other addition library was required.

## Commands you need to know

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Things to `Note`

There are a couple of files missing in this project due to security configuration.

1. Create an .env file and add the key `REACT_APP_CONTRACT_ADDRESS`. The value for this key would be the transaction deployed address. Transaction deployed address is basically whenever you deploy the smart contract an unique id is generated which we use as a **Contract Address**.
2. Second file is `Transactions.json` located under `src/utils/`. This .json file is readily available under your server files `Smart_Contracts/artifacts/contracts/Transaction.sol/Transaction.json`, and you just need to copy paste this file from your server to client.
