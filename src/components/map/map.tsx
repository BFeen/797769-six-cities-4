import * as React from "react";
import {
  Map as LeafletMap,
  Marker,
  marker as leafletMarker,
  map,
  icon,
  tileLayer,
} from "leaflet";
import {IOffer, ICity} from "../../common/types";


interface Props {
  city: ICity;
  offers: IOffer[];
  mapClassName: string,
  activeCard?: IOffer;
}

class Map extends React.PureComponent<Props, {}> {
  private map: LeafletMap;
  private mapRef: React.RefObject<HTMLDivElement>;
  private markers: Marker[];

  constructor(props: Props) {
    super(props);

    this.map = null;
    this.mapRef = React.createRef();
    this.markers = [];
  }

  componentDidMount() {
    const {city, offers} = this.props;
    const {coordinates: cityPosition} = city;
    const currentMap = this.mapRef.current;

    const zoom = 12;
    this.map = map(currentMap, {
      center: cityPosition,
      zoom,
      zoomControl: false,
      // marker: true
    });
    this.map.setView(cityPosition, zoom);

    tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);

    offers.forEach((offer) => this._createMarker(offer, false));
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.city !== prevProps.city) {
      this.map.setView(this.props.city.coordinates, 12);
    }

    if (this.props.offers !== prevProps.offers
        || this.props.activeCard !== prevProps.activeCard) {
      const {offers, activeCard} = this.props;


      this.markers.forEach((marker) => {
        this.map.removeLayer(marker);
      });

      this.markers = [];

      offers.forEach((offer) => {
        const isHovered = offer === activeCard;
        this._createMarker(offer, isHovered);
      });
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
    this.markers = [];
  }

  _createMarker(offer: IOffer, isHovered: boolean) {
    const {coordinates, title} = offer;
    const icon = this._getIcon(isHovered);

    const marker = leafletMarker(coordinates, {icon})
      .bindPopup(title)
      .addTo(this.map);

    this.markers.push(marker);
  }

  _getIcon(isHovered: boolean) {
    const path = isHovered ? `/img/pin-active.svg` : `/img/pin.svg`;
    return icon({
      iconUrl: path,
      iconSize: [27, 39],
    });
  }

  render() {
    const {mapClassName} = this.props;
    return (
      <section
        ref={this.mapRef}
        className={`${mapClassName}__map map`}
      />
    );
  }
}

export default Map;
