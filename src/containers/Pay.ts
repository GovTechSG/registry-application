import { connect } from "react-redux";

import {
  hashFile,
  processedTx,
  registerSubject,
  waitForTx
} from "@src/actions";
import Pay from "@src/components/Pages/Pay";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  hash: state.registry.form.hash,
  owner: state.registry.form.owner
});

const mapDispatchToProps = (dispatch: any) => ({
  onPayment: (hash: string, owner: string) => {
    const account = "0xf00";
    // tslint:disable-next-line:no-console
    console.log(`Paid, registering using ${account}`);
    dispatch(registerSubject(hash, owner, account));
    dispatch(waitForTx());
    window.setTimeout(() => dispatch(processedTx()), 10000);
  }
});

const container = connect(mapStateToProps, mapDispatchToProps)(Pay);

export default container;
