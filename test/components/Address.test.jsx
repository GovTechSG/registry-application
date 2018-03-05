import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Address from "@src/components/Address";

Enzyme.configure({ adapter: new Adapter() });

describe("Address", () => {
  it("renders unknown if no address supplied", () => {
    const wrapper = shallow(<Address />);
    const address = wrapper.find("div");
    expect(address).to.have.length(1);
    expect(address.text()).to.equal("Unknown");
  });

  it("renders the address if an address is supplied", () => {
    const wrapper = shallow(<Address address="foobar" />);
    const address = wrapper.find("div");
    expect(address).to.have.length(2);
    expect(address.at(1).text()).to.equal("foobar");
  });

  it("splits the address into lines if lines is given a value", () => {
    const wrapper = shallow(<Address address="foobar" lines={2} />);
    const address = wrapper.find("div");
    expect(address).to.have.length(3);
    expect(address.at(1).text()).to.equal("foo");
    expect(address.at(2).text()).to.equal("bar");
  });

  it("colors the address", () => {
    const wrapper = shallow(<Address address="foobar" />);
    const address = wrapper.find("div");
    expect(address).to.have.length(2);
    expect(address.at(0).props().style.color).to.equal("hsl(56, 90%, 40%)");
  });
});
