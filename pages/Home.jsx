import React, { useState } from "react";

function Homepage({ onStart }) {
  const [selectedSphere, setSelectedSphere] = useState("Biosphere");

  const spheres = [
    "Biosphere",
    "Atmosphere",
    "Geosphere",
    "Hydrosphere"
  ];

  return (
    <div
      className="homepage"
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/assets/homepage.jpg")`
      }}
    >
      <h1>SPHEREBOUND</h1>
      <p>Explore the Four Spheres of Earth</p>

      <h2>Select Your Starting Sphere</h2>

      <div className="sphere-buttons">
        {spheres.map((sphere) => (
          <button
            key={sphere}
            className={
              selectedSphere === sphere ? "selected" : ""
            }
            onClick={() => setSelectedSphere(sphere)}
          >
            {sphere}
          </button>
        ))}
      </div>

      <button
        className="start-button"
        onClick={() => onStart(selectedSphere)}
      >
        START EXPLORING
      </button>
    </div>
  );
}

export default Homepage;
