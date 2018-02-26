import { connect } from "react-redux";

import { gotoStep } from "@src/actions";
import Breadcrumbs from "@src/components/Breadcrumbs";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  currentStep: state.registry.step
});

const mapDispatchToProps = (dispatch: any) => ({
  onGotoStep: (step: number) => {
    dispatch(gotoStep(step));
  }
});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(
  Breadcrumbs
);

export default containerFileReader;
