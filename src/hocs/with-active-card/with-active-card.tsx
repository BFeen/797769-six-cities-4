import * as React from "react";
import {Subtract} from "utility-types";
import {IOffer} from "../../common/types";


interface State {
  activeCard: IOffer | {};
}

const withActiveCard = (Component) => {
  class WithActiveCard extends React.PureComponent<{}, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: {},
      };

      this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
      this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);
    }

    _handleCardMouseEnter(offer) {
      this.setState(() => ({
        activeCard: offer,
      }));
    }

    _handleCardMouseLeave() {
      this.setState(() => ({
        activeCard: {},
      }));
    }

    render() {
      const {activeCard} = this.state;

      return (
        <Component
          {...this.props}
          onCardMouseEnter={this._handleCardMouseEnter}
          onCardMouseLeave={this._handleCardMouseLeave}
          activeCard={activeCard}
        />
      );
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
