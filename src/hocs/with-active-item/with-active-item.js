import React, {PureComponent} from "react";
import PropTypes from "prop-types";


const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };

      this._handleItemClick = this._handleItemClick.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          onItemClick={this._handleItemClick}
        />
      );
    }

    _handleItemClick(newItem) {
      const {onItemClick} = this.props;

      this.setState(() => ({
        activeItem: newItem,
      }));

      onItemClick(newItem);
    }
  }

  WithActiveItem.propTypes = {
    onItemClick: PropTypes.func.isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
