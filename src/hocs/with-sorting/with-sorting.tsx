import React, {PureComponent} from "react";
import PropTypes from "prop-types";


const withSorting = (Component) => {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpened: false,
      };

      this._handleMenuClick = this._handleMenuClick.bind(this);
      this._handleSelectSortType = this._handleSelectSortType.bind(this);
    }

    _handleMenuClick() {
      this.setState(({
        isOpened: !this.state.isOpened,
      }));
    }

    _handleSelectSortType(sortType) {
      const {onSortTypeChange} = this.props;

      this.setState(({
        isOpened: false,
      }));

      onSortTypeChange(sortType);
    }


    render() {
      const {isOpened} = this.state;

      return (
        <Component
          isOpened={isOpened}
          onMenuClick={this._handleMenuClick}
          onSelectSortType={this._handleSelectSortType}
          {...this.props}
        />
      );
    }
  }

  WithSorting.propTypes = {
    onSortTypeChange: PropTypes.func.isRequired,
  };

  return WithSorting;
};

export default withSorting;
