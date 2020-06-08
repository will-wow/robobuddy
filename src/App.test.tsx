import React from "react";
import { shallow } from "enzyme";

import AppScene from "./components/AppScene";
import App from "./App";

test("renders learn react link", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(AppScene)).toHaveLength(1);
});
