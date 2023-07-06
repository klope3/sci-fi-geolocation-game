import mapboxgl, { Map } from "mapbox-gl";
import { useState, useEffect, useRef } from "react";

const accesstoken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
if (!accesstoken) console.error("No access token for Mapbox found!");
else mapboxgl.accessToken = accesstoken;
const initialLong = -92.4742;
const initialLat = 42.7293;

export function Test() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

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
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error retrieving location:", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "320px", height: "400px" }}></div>
      <h1>Player Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}
