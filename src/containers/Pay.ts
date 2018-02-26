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
    window.web3.eth.getAccounts().then(accounts => {
      // tslint:disable-next-line:no-console
      console.log(`Paid, registering using ${accounts[0]}`);
      dispatch(registerSubject(hash, owner, accounts[0]));
      dispatch(waitForTx());
      // HACK: Use websocket provider to listen on Parity, ganache-cli doesn't yet support in stable
      window.setTimeout(() => dispatch(processedTx()), 2000);
    });
  }
});

const container = connect(mapStateToProps, mapDispatchToProps)(Pay);

export default container;
