import React from "react";
import { shallow } from "enzyme";
// import toJson from "enzyme-to-json";
// import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import Project from "../../src/components/Project";

describe("<Project />", () => {
  describe("render()", () => {
    test("renders the component", () => {
      const props = {
        project: {
          title: "title",
          body: "body",
          screenshot_url: "http://www.test.com",
          tag_names: ["tag1", "tag2"]
        }
      };
      const wrapper = shallow(<Project props={props} />);

      console.log(wrapper.debug());
      // const component = wrapper.dive();

      expect(wrapper.exists()).toBe(true);
      // expect(toJson(component)).toMatchSnapshot();
    });
  });
});
