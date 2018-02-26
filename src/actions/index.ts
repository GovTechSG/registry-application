import { Action, ActionTypes, IncrementAction } from "@src/types";
import { Dispatch } from "redux";

import { Contracts } from "@src/contracts";

export const increment = (value: number = 1) => ({
  type: ActionTypes.INCREMENT,
  value
});

export const decrement = (value: number = 1) => ({
  type: ActionTypes.DECREMENT,
  value
});

export const incrementAsync = (value: number = 1, delay: number = 1000) => (
  dispatch: Dispatch<IncrementAction>
) => setTimeout(() => dispatch(increment(value)), delay);

// FIXME: Assuming first account
export const getAccount = () => (dispatch: Dispatch<Action>) => {
  window.web3.eth.getAccounts().then(accounts => {
    dispatch({
      account: accounts[0],
      type: ActionTypes.GET_ACCOUNT
    });
  });
};

// TODO: hook up dispatch
export const registerUser = (from: string) => {
  Contracts.Registry.get()
    .methods.signup()
    .send({ value: 10, from, gas: 300000 })
    .then(console.log)
    .catch(console.log);
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
) => (dispatch: Dispatch<Action>) => {
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

export const hashFile = (file: any) => (dispatch: Dispatch<Action>) => {
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
