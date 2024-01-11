import "./App.css";

import { AppContextProvider } from "./context/app-context";
import AppRoute from "./app-routes/app-route";

function App() {
  return (
    <div className="App">
      <AppContextProvider>

          <AppRoute />
   
      </AppContextProvider>
    </div>
  );
}

export default App;

