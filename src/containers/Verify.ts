import { connect } from "react-redux";

import {
  getAccount,
  registerSubject,
  registerUser,
  retrieveSubject
} from "@src/actions";
import Verify from "@src/components/Pages/Verify";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  account: state.registry.account,
  onRegisterUser: (from: any) => registerUser(from),
  subject: state.registry.result.subject,
  subjectOwner: state.registry.result.subjectOwner
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetAccount: () => dispatch(getAccount()), // todo: move into app init
  onRegisterSubject: (subject: any, from: any, agent: any) =>
    dispatch(registerSubject(subject, from, agent)),
  onRetrieveSubject: (subject: any) => dispatch(retrieveSubject(subject))
});

const ContainedRegistry = connect(mapStateToProps, mapDispatchToProps)(Verify);

export default ContainedRegistry;
