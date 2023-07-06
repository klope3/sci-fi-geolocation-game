import "./App.css";
import { MapView } from "./components/MapView/MapView";
import { AppProvider } from "./components/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <MapView />
      </AppProvider>
    </>
  );
}

export default App;
