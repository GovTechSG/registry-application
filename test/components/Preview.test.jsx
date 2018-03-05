import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Preview from "@src/components/Preview";

Enzyme.configure({ adapter: new Adapter() });

describe("Preview", () => {
  it("renders a default", () => {
    const wrapper = shallow(<Preview />);
    const preview = wrapper.find("div");
    expect(preview).to.have.length(1);
    expect(preview.text()).to.equal("💾");
  });

  it("renders if given a preview", () => {
    const wrapper = shallow(<Preview preview="something" />);
    const vid = wrapper.find("video");
    expect(vid.prop("poster")).to.equal("something");
    expect(vid.prop("src")).to.equal("something");
  });
});
