import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Leaflet map components
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import axios from "axios"; // For making HTTP requests

function App() {
  // State to store earthquake data
  const [earthquakes, setEarthquakes] = useState([]);

  // Fetch earthquake data when component mounts
  useEffect(() => {
    axios
      .get("/api/earthquakes") // Call our backend API
      .then((res) => setEarthquakes(res.data.features)) // Store earthquake features
      .catch((err) => console.log(err)); // Log any errors
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header section */}
      <header className="text-center py-3 bg-blue-600 text-white shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold">
          🌍 Global Earthquake Map
        </h1>
        <p className="text-sm sm:text-base text-blue-100">
          Real-time data from USGS (past 24 hours)
        </p>
      </header>

      {/* Map container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[20, 0]} // Initial center of the map
          zoom={2}         // Initial zoom level
          className="w-full h-full rounded-none sm:rounded-lg shadow"
        >
          {/* Map tiles from OpenStreetMap */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Loop through earthquake data and create markers */}
          {earthquakes?.map((eq) => (
            <Marker
              key={eq.id} // Unique key for each marker
              position={[
                eq.geometry.coordinates[1], // Latitude
                eq.geometry.coordinates[0], // Longitude
              ]}
            >
              {/* Popup to show earthquake info */}
              <Popup className="text-sm">
                <strong>Magnitude:</strong> {eq.properties.mag}
                <br />
                <strong>Location:</strong> {eq.properties.place}
                <br />
                <strong>Time:</strong>{" "}
                {new Date(eq.properties.time).toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Footer section */}
      <footer className="text-center py-2 text-xs sm:text-sm bg-gray-200">
        Data Source: USGS Earthquake API | Built with React + Tailwind + Leaflet
      </footer>
    </div>
  );
}

export default App;
