import reducer from "reducers/registry";
import * as Actions from "actions";
import { ActionTypes } from "@src/types";

describe("registry reducer", () => {
  it("should return the initial state", () => {
    const prevState = {};
    const nextState = reducer(undefined, prevState);
    const expected = {
      account: null,
      form: { hash: null, owner: "", preview: null },
      receipt: { blockid: null, txid: null },
      result: { subjectOwner: null, subject: null },
      state: "INIT",
      step: 1
    };
    expect(nextState).to.eql(expected);
  });

  it("should handle GET_ACCOUNT", () => {
    const prevState = { account: null };
    const nextState = reducer(prevState, {
      type: ActionTypes.GET_ACCOUNT,
      account: "testaccount"
    });
    const expected = { account: "testaccount" };
    expect(nextState).to.eql(expected);
  });

  it("should handle RETRIEVE_SUBJECT", () => {
    const prevState = { result: {} };
    const nextState = reducer(prevState, {
      owner: "owner",
      subject: "subject",
      type: ActionTypes.RETRIEVE_SUBJECT
    });
    const expected = {
      result: {
        subjectOwner: "owner",
        subject: "subject"
      }
    };
    expect(nextState).to.eql(expected);
  });

  it("should handle SET_HASH", () => {
    const prevState = { form: { hash: null } };
    const nextState = reducer(prevState, Actions.setHash("hash"));
    const expected = { form: { hash: "hash" } };
    expect(nextState).to.eql(expected);
  });

  it("should handle SET_PREVIEW", () => {
    const prevState = { form: { preview: null } };
    const nextState = reducer(prevState, Actions.setPreview("preview"));
    const expected = { form: { preview: "preview" } };
    expect(nextState).to.eql(expected);
  });

  it("should handle SET_OWNER", () => {
    const prevState = { form: { owner: null } };
    const nextState = reducer(prevState, Actions.setOwner("owner"));
    const expected = { form: { owner: "owner" } };
    expect(nextState).to.eql(expected);
  });

  it("should handle GOTO_STEP", () => {
    const prevState = { step: 1 };
    const nextState = reducer(prevState, Actions.gotoStep(5));
    const expected = { step: 5 };
    expect(nextState).to.eql(expected);
  });

  it("should handle GOTO_NEXT_STEP", () => {
    const prevState = { step: 1 };
    const nextState = reducer(prevState, Actions.gotoNextStep());
    const expected = { step: 2 };
    expect(nextState).to.eql(expected);
  });

  it("should handle SET_OWNER", () => {
    const prevState = { form: { owner: null } };
    const nextState = reducer(prevState, Actions.setOwner("owner"));
    const expected = { form: { owner: "owner" } };
    expect(nextState).to.eql(expected);
  });

  it("should handle WAIT_TX", () => {
    const prevState = { state: null };
    const nextState = reducer(prevState, Actions.waitForTx());
    const expected = { state: "WAIT" };
    expect(nextState).to.eql(expected);
  });

  it("should handle PROCESSED_TX", () => {
    const prevState = { state: null };
    const nextState = reducer(prevState, Actions.processedTx());
    const expected = { state: "PROCESSED" };
    expect(nextState).to.eql(expected);
  });

  it("should handle RECEIVE_RECEIPT", () => {
    const prevState = { receipt: {} };
    const nextState = reducer(
      prevState,
      Actions.receiveReceipt({ blockHash: "blockid", transactionHash: "txid" })
    );
    const expected = { receipt: { blockid: "blockid", txid: "txid" } };
    expect(nextState).to.eql(expected);
  });
});
