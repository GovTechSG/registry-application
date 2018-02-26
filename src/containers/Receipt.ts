import { connect } from "react-redux";

import { gotoNextStep, gotoStep } from "@src/actions";
import Receipt from "@src/components/Pages/Receipt";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  blockid: state.registry.receipt.blockid,
  hash: state.registry.form.hash,
  owner: state.registry.form.owner,
  txid: state.registry.receipt.txid
});

const mapDispatchToProps = (dispatch: any) => ({
  onGotoStep: (step: number) => {
    dispatch(gotoStep(step));
  }
});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(
  Receipt
);

export default containerFileReader;
