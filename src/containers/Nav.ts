import { connect } from "react-redux";

import { gotoStep } from "@src/actions";
import Nav from "@src/components/Nav";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  step: state.registry.step
});

const mapDispatchToProps = (dispatch: any) => ({
  onGotoStep: (step: number) => dispatch(gotoStep(step))
});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default containerFileReader;
