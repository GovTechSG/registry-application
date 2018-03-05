import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Breadcrumbs, { Breadcrumb } from "@src/components/Breadcrumbs";

Enzyme.configure({ adapter: new Adapter() });

describe("Breadcrumbs", () => {
  it("renders a default", () => {
    const wrapper = shallow(<Breadcrumbs />);
    const preview = wrapper.find(Breadcrumb);
    expect(preview).to.have.length(6);
  });
});
