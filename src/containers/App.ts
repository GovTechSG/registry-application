import { connect } from "react-redux";

import { gotoStep } from "@src/actions";
import App from "@src/components/App";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  step: state.registry.step
});

// export interface RegistryProps {
//   onGetAccount: () => void;
//   onRegisterUser: (from: string) => void
//   onRegisterSubject: (subject: string, account: string) => void;
//   onRetrieveSubject: (subject: string) => void;
//   subject: string;
//   subjectOwner: string;
// };

const mapDispatchToProps = (dispatch: any) => ({
  onGotoStep: (step: number) => dispatch(gotoStep(step)) // todo: also set preview
});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(App);

export default containerFileReader;
