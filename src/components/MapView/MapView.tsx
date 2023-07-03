import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";

const accesstoken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
if (!accesstoken) console.error("No access token for Mapbox found!");
else mapboxgl.accessToken = accesstoken;

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    const current = map.current;
    if (!current) return;
    current.on("move", () => {
      setLng(+current.getCenter().lng.toFixed(4));
      setLat(+current.getCenter().lat.toFixed(4));
    });
  });

  return (
    <div>
      <div ref={mapContainer} style={{ height: "400px" }}></div>
      <div>
        Long: {lng}, Lat: {lat}
      </div>
    </div>
  );
}
