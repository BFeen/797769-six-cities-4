import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {Map as LeafletMap, Marker, Popup, TileLayer} from "react-leaflet";
import {offerPropTypes} from "../../mocks/offer-prop-type.js";


class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cityPosition: [52.38333, 4.9],
    }
  }
  
  render() {
    const {cityPosition} = this.state;

    const offerCords = [52.3709553943508, 4.89309666406198];
    const zoom = 12;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    return (
      <section className="cities__map map">
        <LeafletMap
          center={cityPosition}
          zoom={12}
          zoomControl={false}
          style={{width: `${512}px`, height: `${572}px`}}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>"
          />
          <Marker
            position={offerCords}
            icon={icon}
          >
            <Popup />
          </Marker>
        </LeafletMap>
      </section>
    );
  }
};

Map.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes)
};

export default Map;