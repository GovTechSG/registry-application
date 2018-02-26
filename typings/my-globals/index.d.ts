declare module "my-globals" {
  import Web3 from "web3";

  global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
      web3: Web3;
    }
  }
}
