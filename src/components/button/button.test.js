import React from "react";
import renderer from "react-test-renderer";
import Button from "./button.jsx";
import {ClassNames} from "../../common/const.js";


const children = `Submit`;
const {ButtonClassNames} = ClassNames;

describe(`Button snapshot testing`, () => {
  it(`Button rendering correctly`, () => {
    const tree = renderer.create(
        <Button
          className={ButtonClassNames.REVIEW}
          disabled={false}
        >{children}</Button>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Disabled Button rendering correctly`, () => {
    const tree = renderer.create(
        <Button
          className={ButtonClassNames.SIGN_IN}
          disabled={false}
        >{children}</Button>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
