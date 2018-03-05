import {
  Action,
  ActionTypes,
  GetAccountAction,
  ReceiveReceiptAction,
  SetHashAction
} from "@src/types";
import { Dispatch } from "redux";

import { Contracts } from "@src/contracts";

// FIXME: Assuming first account
export const getAccount = () => (dispatch: Dispatch<GetAccountAction>) => {
  window.web3.eth.getAccounts().then(accounts => {
    dispatch({
      account: accounts[0],
      type: ActionTypes.GET_ACCOUNT
    });
  });
};

export const waitForTx = () => ({
  type: ActionTypes.WAIT_TX
});

export const processedTx = () => ({
  type: ActionTypes.PROCESSED_TX
});

export const receiveReceipt = tx => ({
  blockid: tx.blockHash,
  txid: tx.transactionHash,
  type: ActionTypes.RECEIVE_RECEIPT
});

// TODO: hook up dispatch
export const registerSubject = (
  subject: string,
  owner: string,
  agent: string
) => (dispatch: Dispatch<ReceiveReceiptAction>) => {
  Contracts.Registry.get()
    .methods.register(`0x${subject}`, owner)
    .send({ value: 10, from: agent, gas: 300000 })
    .then(tx => {
      dispatch(receiveReceipt(tx));
      // tslint:disable-next-line:no-console
      console.log(tx);
    })
    .then(() => dispatch(waitForTx()))
    .catch(console.error);
};

export const retrieveSubject = (subject: string) => (
  dispatch: Dispatch<Action>
) => {
  Contracts.Registry.get()
    .methods.retrieve(`0x${subject}`)
    .call()
    .then((result: any) => {
      dispatch({
        owner: result[1],
        subject: result[2],
        type: ActionTypes.RETRIEVE_SUBJECT
      });
    })
    .catch(console.log);
};

export const setHash = (hash: string) => ({
  hash,
  type: ActionTypes.SET_HASH
});

export const setPreview = (objectURL: any) => ({
  type: ActionTypes.SET_PREVIEW,
  url: objectURL
});

export const hashFile = (file: any) => (dispatch: Dispatch<SetHashAction>) => {
  const reader = new FileReader();

  reader.addEventListener("load", async res => {
    const hashBuffer = await window.crypto.subtle.digest(
      "SHA-256",
      reader.result
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map(b => ("00" + b.toString(16)).slice(-2))
      .join("");

    const blob = new Blob([reader.result]);
    const url = window.URL.createObjectURL(blob);
    dispatch(setPreview(url));
    dispatch(setHash(hashHex));
  });

  reader.readAsArrayBuffer(file.files[0]);
};

export const gotoNextStep = () => ({
  type: ActionTypes.GOTO_NEXT_STEP
});

export const gotoStep = (step: number) => ({
  step,
  type: ActionTypes.GOTO_STEP
});

export const setOwner = (owner: string) => ({
  owner,
  type: ActionTypes.SET_OWNER
});
