import { connect } from "react-redux";

import { hashFile } from "@src/actions";
import Preview from "@src/components/Preview";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  preview: state.registry.form.preview
});

const mapDispatchToProps = (dispatch: any) => ({});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(
  Preview
);

export default containerFileReader;
