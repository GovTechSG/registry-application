import { Action, ActionTypes, RegistryState } from "@src/types";

export default (
  state: RegistryState = {
    account: null,
    form: { hash: null, owner: "", preview: null },
    receipt: { blockid: null, txid: null },
    result: { subjectOwner: null, subject: null },
    state: "INIT", // todo: enumify this
    step: 1
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.GET_ACCOUNT:
      return {
        ...state,
        account: action.account
      };
    case ActionTypes.RETRIEVE_SUBJECT:
      return {
        ...state,
        result: {
          subject: action.subject,
          subjectOwner: action.owner
        }
      };
    case ActionTypes.SET_HASH:
      return {
        ...state,
        form: {
          ...state.form,
          hash: action.hash
        }
      };
    case ActionTypes.SET_PREVIEW:
      return {
        ...state,
        form: {
          ...state.form,
          preview: action.url
        }
      };
    case ActionTypes.SET_OWNER:
      return {
        ...state,
        form: {
          ...state.form,
          owner: action.owner
        }
      };
    case ActionTypes.GOTO_STEP:
      return {
        ...state,
        step: action.step
      };
    case ActionTypes.GOTO_NEXT_STEP:
      return {
        ...state,
        step: state.step + 1
      };
    case ActionTypes.WAIT_TX:
      return {
        ...state,
        state: "WAIT"
      };
    case ActionTypes.PROCESSED_TX:
      return {
        ...state,
        state: "PROCESSED"
      };
    case ActionTypes.RECEIVE_RECEIPT:
      return {
        ...state,
        receipt: {
          blockid: action.blockid,
          txid: action.txid
        }
      };
    default:
      return state;
  }
};
