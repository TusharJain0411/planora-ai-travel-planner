import react, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Layout from './pages/Layout'
import "./App.css"
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Explore from "./pages/Explore";
import Home from "./components/Home";
import TraverlDetails from './pages/TraverlDetails';
import Itinerary from './pages/Itinerary';
import Trips from './pages/Trips';
import ExploreTrip from "./pages/ExploreTrip";
import EditTravelDetails from './pages/EditTravelDetails';
import AuthRedirectHandler from "./components/AuthRedirectHandler";


function App() {

const theme = useSelector((item) => item.commonStates.theme);


  return (
    <>
      <AuthRedirectHandler />
      <div className={`${theme ? "dark-bg" : "light-bg"}`}>
        <Toaster position="top-right" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Explore />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/traveldetailpage"
              element={
                <ProtectedRoute>
                  <TraverlDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trips"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Trips />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/itinerary/:tripId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Itinerary />
                  </Layout>
                  /
                </ProtectedRoute>
              }
            />

            <Route
              path="/explore/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ExploreTrip />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-trip/:tripId"
              element={
                <ProtectedRoute>
                  <EditTravelDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App
