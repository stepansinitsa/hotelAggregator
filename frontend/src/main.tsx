import "bootstrap/dist/css/bootstrap.min.css";
import "izitoast/dist/css/iziToast.min.css";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Routing from "./App";
import store from "./store/configureStore";
import "./assets/css/app.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <Routing />
  </Provider>
);