import * as React from "react";
import {Subtract} from "utility-types";


interface State {
  isOpened: boolean;
}

interface InjectingProps {
  onSortTypeChange: (sortType: string) => void;
}

const withSorting = (Component) => {
  type P = React.ComponentProps<typeof Component>
  type T = Subtract<P, InjectingProps>

  class WithSorting extends React.PureComponent<T, State> {
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

  return WithSorting;
};

export default withSorting;
