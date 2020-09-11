import * as React from "react";
import {Subtract} from "utility-types";
import {IOffer} from "../../common/types";


interface State {
  activeItem: IOffer | {};
}

interface InjectedProps {
  onItemClick: (newItem: IOffer) => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: {},
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

  return WithActiveItem;
};

export default withActiveItem;
