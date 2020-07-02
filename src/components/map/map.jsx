import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {offerPropTypes} from "../../mocks/offer-prop-type.js";


class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._mapRef = createRef();

    this.state = {
      cityPosition: [52.38333, 4.9],
    };
  }

  render() {
    return (
      <section
        id="map"
        ref={this._mapRef}
        className="cities__map map"
      />
    );
  }

  componentDidMount() {
    const {cityPosition} = this.state;
    const {offers} = this.props;
    const currentMap = this._mapRef.current;

    const zoom = 12;
    this._map = leaflet.map(currentMap, {
      center: cityPosition,
      zoom,
      zoomControl: false,
      marker: true
    });
    this._map.setView(cityPosition, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    offers.forEach((offer) => this._addMarker(offer, this._map));
  }

  _addMarker(offer, leafletMap) {
    const {coordinates, title} = offer;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39],
    });

    leaflet
      .marker(coordinates, {icon})
      .bindPopup(title).openPopup()
      .addTo(leafletMap);
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes)
};

export default Map;
