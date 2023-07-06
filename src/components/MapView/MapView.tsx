import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { useApp } from "../AppProvider";

const accesstoken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
if (!accesstoken) console.error("No access token for Mapbox found!");
else mapboxgl.accessToken = accesstoken;
const initialLong = -92.4742;
const initialLat = 42.7293;

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(initialLong);
  const [lat, setLat] = useState(initialLat);
  // const [zoom, setZoom] = useState(9);
  const { playerPosition } = useApp();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initialLong, initialLat],
      zoom: 17,
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

  function panBy(latLong: number[]) {
    const point = new mapboxgl.Point(latLong[0], latLong[1]);
    map.current?.panBy(point);
  }

  return (
    <div>
      <div ref={mapContainer} style={{ width: "320px", height: "400px" }}></div>
      <div>
        Long: {lng}, Lat: {lat}
      </div>
      <div>
        <button onClick={() => panBy([-0.001, 0])}>West</button>
        <button onClick={() => panBy([0, 0.001])}>North</button>
        <button onClick={() => panBy([0.001, 0])}>East</button>
        <button onClick={() => panBy([0, -0.001])}>South</button>
      </div>
      <div>
        Your Longitude: {playerPosition.x} Your Latitude: {playerPosition.y}
      </div>
    </div>
  );
}
