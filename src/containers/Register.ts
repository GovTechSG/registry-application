import { connect } from "react-redux";

import { hashFile, setOwner } from "@src/actions";
import Confirm from "@src/components/Pages/Register";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  hash: state.registry.form.hash,
  owner: state.registry.form.owner,
  preview: state.registry.form.preview
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetOwner: (owner: string) => dispatch(setOwner(owner))
});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(
  Confirm
);

export default containerFileReader;
