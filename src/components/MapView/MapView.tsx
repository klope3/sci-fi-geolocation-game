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
  // const [zoom, setZoom] = useState(9);
  const [num, setNum] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 12,
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

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setNum((prev) => prev + 1);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (error.PERMISSION_DENIED) setPermissionDenied(true);
        console.error("Error retrieving location:", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

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
        Your Longitude: {location.longitude} Your Latitude: {location.latitude}
      </div>
      <div>Num: ${num}</div>
      {permissionDenied && <div>Permission to access location was denied!</div>}
    </div>
  );
}
