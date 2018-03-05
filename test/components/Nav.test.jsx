import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Nav from "@src/components/Nav";

Enzyme.configure({ adapter: new Adapter() });

describe("Nav", () => {
  it("renders", () => {
    const wrapper = shallow(<Nav />);
    const nav = wrapper.find("div");
    expect(nav).to.have.length(1);
    expect(wrapper.find(".prev")).to.have.length(1);
    expect(wrapper.find(".next")).to.have.length(1);
  });

  it("hides buttons if hidden", () => {
    const wrapper = shallow(<Nav showNext={false} showPrev={false} />);
    const prev = wrapper.find(".prev");
    expect(prev).to.have.length(0);
    const next = wrapper.find(".next");
    expect(next).to.have.length(0);
  });

  it("disables buttons if disabled", () => {
    const wrapper = shallow(<Nav canNext={false} canPrev={false} />);
    const prev = wrapper.find(".prev");
    expect(prev).to.have.length(1);
    expect(prev.prop("disabled")).to.eq(true);
    const next = wrapper.find(".next");
    expect(next).to.have.length(1);
    expect(next.prop("disabled")).to.eq(true);
  });
});
