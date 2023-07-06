import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Vector2 } from "../types/common";

type AppContext = {
  playerPosition: Vector2;
  playerPositionAccuracy: number;
};

const AppContext = createContext({} as AppContext);

export function useApp() {
  const { playerPosition, playerPositionAccuracy } = useContext(AppContext);
  return { playerPosition, playerPositionAccuracy };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [playerPositionAccuracy, setPlayerPositionAccuracy] = useState(0);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPlayerPosition({
          y: position.coords.latitude,
          x: position.coords.longitude,
        });
        setPlayerPositionAccuracy(position.coords.accuracy);
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
    <AppContext.Provider value={{ playerPosition, playerPositionAccuracy }}>
      {children}
    </AppContext.Provider>
  );
}
