import React from "react";
import MapComponent from "./components/MapContainer";

function App() {
    return (
        <div>
        <h1
            style={{
                textAlign: "center",
                fontFamily: "'Segoe UI', 'Montserrat', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: "2.6rem",
                marginTop: "36px",
                marginBottom: "28px",
                letterSpacing: "1px",
                background: "linear-gradient(90deg, #007BFF 20%, #00C6FF 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 24px rgba(0,123,255,0.12)",
                lineHeight: 1.2,
            }}
        >
            Mapa Open Source com Desenho
            <br />
            <span
                style={{
                    fontWeight: 500,
                    fontSize: "1.15rem",
                    color: "#222",
                    background: "none",
                    WebkitTextFillColor: "#222",
                    letterSpacing: "0.2px",
                    textShadow: "none",
                    display: "inline-block",
                    marginTop: "6px"
                }}
            >
    (Leaflet + React-Leaflet-Draw)
  </span>
        </h1>
            <MapComponent

                center={[-15.793889, -47.882778]}
                zoom={12}
                style={{ width: "100%", height: "600px", borderRadius: "12px" }}
                className="meu-mapa-custom"

            ></MapComponent>
        </div>
    );
}

export default App;
