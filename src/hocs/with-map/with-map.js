import React, {PureComponent} from "react";
import Map from "../../components/map/map.jsx";


const withMap = (Component) => {
  class WithMap extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        city: {
          name: `Paris`,
          isActive: true,
          coordinates: [48.8589507, 2.2770201],
        },
      };
    }

    render() {
      return (
        <Component
          {...this.props}
          renderMap={(city, mapClassName, offers) => {
            return (
              <Map
                city={city}
                mapClassName={mapClassName}
                offers={offers}
              />
            );
          }}
        />
      );
    }
  }

  WithMap.propTypes = {};

  return WithMap;
}

export default withMap;
