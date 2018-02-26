export enum Steps {
  UPLOAD = 1,
  REGISTER = 2,
  PAY = 3,
  PROCESS = 4,
  RECEIPT = 5,
  VERIFY = 6
}

export interface CountersState {
  value: number;
}

export interface RegistryState {
  account: string;
  result: {
    // ugly, temporary shape
    subject: string;
    subjectOwner: string;
  };
  receipt: {
    txid: string;
    blockid: string;
  };
  form: {
    hash: string;
    owner: string;
    preview: any;
  };
  step: number;
  state: string; // enumify this
}

export interface State {
  counters: CountersState;
  registry: RegistryState;
}

export enum ActionTypes {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  GET_ACCOUNT = "GET_ACCOUNT",
  RETRIEVE_SUBJECT = "RETRIEVE_SUBJECT",
  SET_HASH = "SET_HASH",
  SET_PREVIEW = "SET_PREVIEW",
  SET_OWNER = "SET_OWNER",
  GOTO_STEP = "GOTO_STEP",
  GOTO_NEXT_STEP = "GOTO_NEXT_STEP",
  WAIT_TX = "WAIT_TX",
  PROCESSED_TX = "PROCESSED_TX",
  RECEIVE_RECEIPT = "RECEIVE_RECEIPT"
}

export interface IncrementAction {
  type: ActionTypes.INCREMENT;
  value: number;
}

export interface DecrementAction {
  type: ActionTypes.DECREMENT;
  value: number;
}

export interface SetHashAction {
  type: ActionTypes.SET_HASH;
  hash: string;
}

export interface GetAccountAction {
  account: string;
  type: ActionTypes.GET_ACCOUNT;
}

export interface RetrieveSubjectAction {
  owner: string;
  subject: string;
  type: ActionTypes.RETRIEVE_SUBJECT;
}

export interface SetPreviewAction {
  url: any;
  type: ActionTypes.SET_PREVIEW;
}

export interface GotoStepAction {
  step: number;
  type: ActionTypes.GOTO_STEP;
}

export interface SetOwnerAction {
  owner: string;
  type: ActionTypes.SET_OWNER;
}

export interface SetWaitTxAction {
  type: ActionTypes.WAIT_TX;
}

export interface ProcessedTxAction {
  type: ActionTypes.PROCESSED_TX;
}

export interface GotoNextStepAction {
  type: ActionTypes.GOTO_NEXT_STEP;
}

export interface ReceiveReceiptAction {
  blockid: string;
  txid: string;
  type: ActionTypes.RECEIVE_RECEIPT;
}

export type Action =
  | IncrementAction
  | DecrementAction
  | GetAccountAction
  | RetrieveSubjectAction
  | SetHashAction
  | SetPreviewAction
  | GotoStepAction
  | SetOwnerAction
  | SetWaitTxAction
  | GotoNextStepAction
  | ProcessedTxAction
  | ReceiveReceiptAction;
