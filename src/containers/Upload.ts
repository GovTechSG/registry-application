import { connect } from "react-redux";

import { hashFile } from "@src/actions";
import Upload from "@src/components/Pages/Upload";
import { State } from "@src/types";

const mapStateToProps = (state: State) => ({
  preview: state.registry.form.preview
});

const mapDispatchToProps = (dispatch: any) => ({
  onLoadFile: (e: any) => dispatch(hashFile(e))
});

const containerFileReader = connect(mapStateToProps, mapDispatchToProps)(
  Upload
);

export default containerFileReader;
