import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReviewForm from "./review-form.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Review form e2e testing`, () => {
  it(`Should call onSubmit func when submit`, () => {
    const onSubmit = jest.fn();
    const mockEvent = {
      preventDefault() {}
    };
    
    const wrapper = shallow(
        <ReviewForm
          rating={3}
          comment={`Some comment`}
          buttonText={`Submit`}
          isDisabled={false}
          onSubmit={onSubmit}
          onCommentChange={() => {}}
          onRatingChange={() => {}}
          errorMessage={``}
        />
    );
    
    const form = wrapper.find(`form`);

    form.simulate(`submit`, mockEvent);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it(`Should handle Comment and Rating changes`, () => {
    const handleCommentChange = jest.fn();
    const mockEvent = {
      target: {
        value: `another comment`,
      }
    };

    const wrapper = shallow(
        <ReviewForm
          rating={3}
          comment={`Some comment`}
          buttonText={`Submit`}
          isDisabled={true}
          onSubmit={() => {}}
          onCommentChange={handleCommentChange}
          onRatingChange={() => {}}
          errorMessage={``}
        />
    );

    const commentInput = wrapper.find(`textarea.reviews__textarea`);

    commentInput.simulate(`change`, mockEvent);
    expect(handleCommentChange).toHaveBeenCalledTimes(1);
  });

  it(`Should handle Comment and Rating changes`, () => {
    const mockEvent = {
      target: {
        value: `1`,
      }
    };
    const handleRatingChange = jest.fn();
    const wrapper = shallow(
      <ReviewForm
        rating={3}
        comment={`Some comment`}
        buttonText={`Submit`}
        isDisabled={true}
        onSubmit={() => {}}
        onCommentChange={() => {}}
        onRatingChange={handleRatingChange}
        errorMessage={``}
      />
    );

    const ratingInput = wrapper.find(`input.form__rating-input`).at(0);

    ratingInput.simulate(`change`, mockEvent);

    expect(handleRatingChange).toHaveBeenCalledTimes(1);
  });
});