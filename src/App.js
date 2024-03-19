import "./App.css";

import { AppContextProvider } from "./context/app-context";
import AppRoute from "./app-routes/app-route";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <RecoilRoot>
          <AppRoute />
        </RecoilRoot>
      </AppContextProvider>
    </div>
  );
}

export default App;
