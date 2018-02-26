import { connect } from "react-redux";

import { gotoNextStep } from "@src/actions";
import Process from "@src/components/Pages/Process";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  state: state.registry.state
});

const mapDispatchToProps = (dispatch: any) => ({
  onOk: () => {
    dispatch(gotoNextStep());
  }
});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(
  Process
);

export default containerFileReader;
