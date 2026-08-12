import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from "./Redux/store.js";
import App from './App.jsx'
import { Provider } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// import "./utils/leafletIcon";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    
      <StrictMode>
        <App />
      </StrictMode>
  
  </Provider>,
);
