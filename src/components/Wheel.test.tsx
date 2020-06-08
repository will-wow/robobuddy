import React from "react";
import { shallow } from "enzyme";

import Wheel from "./Wheel";

describe("Wheel", () => {
  it("renders positive values for the front right wheel", () => {
    const wrapper = shallow(<Wheel side="right" direction="front" />);

    expect(wrapper.find("a-entity").prop("position")).toBe("0.1 0 0.125");
  });

  it("renders negative values for the back left wheel", () => {
    const wrapper = shallow(<Wheel side="left" direction="back" />);

    expect(wrapper.find("a-entity").prop("position")).toBe("-0.1 0 -0.125");
  });
});
