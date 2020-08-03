import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});

it(`SignIn rendering correctly`, () => {
  const tree = shallow(
      <SignIn
        onSubmit={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
