import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../const';
import useMap from '../hooks/use-map';
import {Offer} from '../types/offer';
import {City} from '../types/city';
import 'leaflet/dist/leaflet.css';
import {OfferPreview} from "../types/offer-preview";

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
  city: City;
  offers: Offer[] | OfferPreview[];
  selectedOffer: Offer | null;
  extraClass?: string;
};

export default function Map(props: MapProps) {
  const {city, offers, selectedOffer, extraClass} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(selectedOffer !== null && offer.id === selectedOffer.id
            ? currentCustomIcon
            : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (offers.length > 0) {
        const center = offers[0].city;

        map.setView({
          lat: center.location.latitude,
          lng: center.location.longitude
        });
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section className={`map ${extraClass ? extraClass : ''}`} ref={mapRef} />
  );
}
