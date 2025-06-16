import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import DriverContext from "./context/DriverContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DriverContext>
      <UserContext>
        <SocketProvider>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="dark"
              transition={Slide}
            />
          </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </DriverContext>
  </StrictMode>
);
