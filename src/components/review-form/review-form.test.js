import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";


describe(`ReviewForm snapshot testing`, () => {
  it(`Review form rendering correctly`, () => {
    const tree = renderer.create(
        <ReviewForm
          rating={null}
          comment={``}
          buttonText={`Submit`}
          isDisabled={true}
          onSubmit={() => {}}
          onCommentChange={() => {}}
          onRatingChange={() => {}}
          errorMessage={``}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Review form rendering correctly with another arguments`, () => {
    const tree = renderer.create(
        <ReviewForm
          rating={3}
          comment={`Some comment`}
          buttonText={`Sending...`}
          isDisabled={true}
          onSubmit={() => {}}
          onCommentChange={() => {}}
          onRatingChange={() => {}}
          errorMessage={``}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Review form rendering correctly with error`, () => {
    const tree = renderer.create(
        <ReviewForm
          rating={3}
          comment={`Some comment`}
          buttonText={`Submit`}
          isDisabled={true}
          onSubmit={() => {}}
          onCommentChange={() => {}}
          onRatingChange={() => {}}
          errorMessage={`Bad request`}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
