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

    offers.forEach((offer) => this._createMarker(offer, false));
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
    this._markers = [];
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this._map.setView(this.props.city.coordinates, 12);
    }

    if (this.props.offers !== prevProps.offers
        || this.props.activeCard !== prevProps.activeCard) {
      const {offers, activeCard} = this.props;


      this._markers.forEach((marker) => {
        this._map.removeLayer(marker);
      });

      this._markers = [];

      offers.forEach((offer) => {
        const isHovered = offer === activeCard;
        this._createMarker(offer, isHovered);
      });
    }
  }

  _createMarker(offer, isHovered) {
    const {coordinates, title} = offer;
    const icon = this._getIcon(isHovered);

    this._markers.push(
        leaflet
          .marker(coordinates, {icon})
          .bindPopup(title).openPopup()
          .addTo(this._map)
    );
  }

  _getIcon(isHovered) {
    const path = isHovered ? `img/pin-active.svg` : `img/pin.svg`;
    return leaflet.icon({
      iconUrl: path,
      iconSize: [27, 39],
    });
  }
}

Map.propTypes = {
  city: cityPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  mapClassName: PropTypes.string.isRequired,
  activeCard: PropTypes.oneOfType([
    offerPropTypes,
    PropTypes.object,
  ]).isRequired,
};

export default Map;
