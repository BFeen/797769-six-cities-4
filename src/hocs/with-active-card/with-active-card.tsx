import React, {PureComponent} from "react";


const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
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

  WithActiveCard.propTypes = {};

  return WithActiveCard;
};

export default withActiveCard;
