import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./constants/ProtectedRoute";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/DashBoard/DashBoard";
import Transaction from "./pages/Transaction/Transaction";
import Hotel from "./pages/Hotel/Hotel";
import Room from "./pages/Room/Room";
import User from "./pages/User/User";
import NewHotel from "./pages/NewHotel/NewHotel";
import NewRoom from "./pages/NewRoom/NewRoom";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/list/transactions"
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/list/hotels"
            element={
              <ProtectedRoute>
                <Hotel />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/list/rooms"
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/list/users"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/create/hotel"
            element={
              <ProtectedRoute>
                <NewHotel />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/create/room"
            element={
              <ProtectedRoute>
                <NewRoom />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
