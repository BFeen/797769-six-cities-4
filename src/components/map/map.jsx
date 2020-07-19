import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import cityPropTypes from "../../prop-types/city-prop-types.js";


class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._mapRef = createRef();
    this._markers = [];
  }

  render() {
    const {mapClassName} = this.props;
    return (
      <section
        ref={this._mapRef}
        className={`${mapClassName}__map map`}
      />
    );
  }

  componentDidMount() {
    const {city, offers} = this.props;
    const {coordinates: cityPosition} = city;
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

    offers.forEach((offer) => this._createMarker(offer));
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
    this._markers = [];
  }

  componentDidUpdate() {
    const {offers, city} = this.props;

    this._map.setView(city.coordinates, 12);

    this._markers.forEach((marker) => {
      this._map.removeLayer(marker);
    });

    this._markers = [];

    offers.forEach((offer) => this._createMarker(offer));
  }

  _createMarker(offer) {
    const {coordinates, title} = offer;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39],
    });

    this._markers.push(
        leaflet
          .marker(coordinates, {icon})
          .bindPopup(title).openPopup()
          .addTo(this._map)
    );
  }
}

Map.propTypes = {
  city: cityPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  mapClassName: PropTypes.string.isRequired,
};

export default Map;
