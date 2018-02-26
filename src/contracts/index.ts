const registryDef = require("./abi/Registry.json");

export enum ContractName {
  Registry = "Registry"
}

class ContractInterface {
  public abi: any;
  public json: any;
  public address: string;

  constructor(json: any, address?: string) {
    this.abi = json.abi;
    const networks = Object.keys(json.networks);
    const network = json.networks
      ? json.networks[networks[networks.length - 1]]
      : null; // assume last network

    this.address = address || (network && network.address);

    this.json = json;
  }

  public get() {
    return new window.web3.eth.Contract(this.abi, this.address);
  }
}

export const Contracts: { [name in ContractName]: ContractInterface } = {
  Registry: new ContractInterface(registryDef)
};
