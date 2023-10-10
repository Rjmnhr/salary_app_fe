import "./App.css";
import AppRoute from "./app-route";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./context/app-context";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="358548465106-r5chlblorittbvh8s7k4huue4t9dl584.apps.googleusercontent.com">
        <AppContextProvider>
          <AppRoute />
        </AppContextProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
