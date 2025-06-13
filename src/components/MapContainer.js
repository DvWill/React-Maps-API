import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Corrige o ícone padrão do Leaflet em alguns ambientes
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const pontosTuristicos = [
    {
        nome: "Parque Nacional de Brasília (Água Mineral)",
        lat: -15.7033,
        lng: -47.9640,
        ano: 1961,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Parque_Nacional_de_Bras%C3%ADlia.jpg"
    },
    {
        nome: "Catedral Metropolitana de Brasília",
        lat: -15.7989,
        lng: -47.8750,
        ano: 1970,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Catedral_Brasilia.jpg"
    },
    {
        nome: "Lago Paranoá",
        lat: -15.7806,
        lng: -47.8225,
        ano: 1959,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Lago_Parano%C3%A1_-_Bras%C3%ADlia.jpg"
    },
    {
        nome: "Congresso Nacional",
        lat: -15.7997,
        lng: -47.8646,
        ano: 1960,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Congresso_Nacional_-_Bras%C3%ADlia%2C_Brasil.jpg"
    },
    {
        nome: "Memorial Juscelino Kubitschek",
        lat: -15.7921,
        lng: -47.9252,
        ano: 1981,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Memorial_JK_-_Bras%C3%ADlia%2C_Brasil.jpg"
    },
    {
        nome: "Praça dos Três Poderes",
        lat: -15.7992,
        lng: -47.8618,
        ano: 1960,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/5/56/Pra%C3%A7a_dos_Tr%C3%AAs_Poderes_-_Bras%C3%ADlia.jpg"
    },
    {
        nome: "Pontão do Lago Sul",
        lat: -15.8297,
        lng: -47.8387,
        ano: 2002,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Pont%C3%A3o_do_Lago_Sul.jpg"
    },
    {
        nome: "Torre de TV de Brasília",
        lat: -15.7892,
        lng: -47.8921,
        ano: 1967,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Torre_de_TV_de_Bras%C3%ADlia.jpg"
    },
    {
        nome: "Praça dos Cristais",
        lat: -15.7920,
        lng: -47.8645,
        ano: 1970,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Pra%C3%A7a_dos_Cristais_-_Bras%C3%ADlia.jpg"
    },
    {
        nome: "Parque da Cidade Sarah Kubitschek",
        lat: -15.8057,
        lng: -47.9136,
        ano: 1978,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Parque_da_Cidade_Sarah_Kubitschek.jpg"
    },
    {
        nome: "Palácio da Alvorada",
        lat: -15.7653,
        lng: -47.8256,
        ano: 1958,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/3/38/Pal%C3%A1cio_da_Alvorada_-_Bras%C3%ADlia%2C_Brasil.jpg"
    },
    {
        nome: "Santuário Dom Bosco",
        lat: -15.8150,
        lng: -47.8918,
        ano: 1970,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Santu%C3%A1rio_Dom_Bosco_-_Bras%C3%ADlia.jpg"
    },
    {
        nome: "Ponte JK (Juscelino Kubitschek)",
        lat: -15.8347,
        lng: -47.8433,
        ano: 2002,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ponte_JK_-_Bras%C3%ADlia.jpg"
    },
];


// Estilos modernos para a box flutuante
const box_style = {
    position: "absolute",
    top: "30px",
    right: "30px",
    background: "rgba(255, 255, 255, 0.95)",
    border: "2px solid #007BFF",
    borderRadius: "12px",
    padding: "20px",
    zIndex: 1000,
    maxWidth: "350px",
    boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    animation: "fadeIn 0.4s ease-in-out",
};

const button_style = {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "bold",
    float: "right",
    marginLeft: "10px",
    transition: "background-color 0.3s ease",
};

const list_style = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    maxHeight: "200px",
    overflowY: "auto",
};

const list_item_style = {
    marginBottom: "12px",
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
};


function BoxFlutuante({ pontos, onClose }) {
    if (!pontos.length) return null;
    return (
        <div style={{
            position: "absolute",
            top: "30px",
            right: "30px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "2px solid #007BFF",
            borderRadius: "12px",
            padding: "20px",
            zIndex: 1000,
            maxWidth: "350px",
            boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#333",
            animation: "fadeIn 0.4s ease-in-out",
        }}>
            <button
                onClick={onClose}
                style={{
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    float: "right",
                    marginLeft: "10px",
                    transition: "background-color 0.3s ease",
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#007BFF"}
            >
                Fechar
            </button>
            <h3 style={{ marginTop: 0 }}>Pontos Turísticos na Área</h3>
            <ul style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                maxHeight: "200px",
                overflowY: "auto",
            }}>
                {pontos.map((p, i) => (
                    <li key={i} style={{
                        marginBottom: "12px",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "8px",
                    }}>
                        <strong>{p.nome}</strong><br />
                        Ano: {p.ano}<br />
                        {p.imagem && (
                            <img
                                src={p.imagem}
                                alt={p.nome}
                                style={{
                                    width: "100%",
                                    maxWidth: "200px",
                                    borderRadius: "8px",
                                    marginTop: "8px",
                                    marginBottom: "4px",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}


function MapComponent() {
    const [boxPontos, setBoxPontos] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const featureGroupRef = useRef(null);

    // Função chamada ao desenhar uma nova área
    const onCreated = (e) => {
        let pontosDentro = [];
        if (e.layerType === "circle") {
            const center = e.layer.getLatLng();
            const radius = e.layer.getRadius();
            pontosDentro = pontosTuristicos.filter((p) => {
                const ponto = L.latLng(p.lat, p.lng);
                return center.distanceTo(ponto) <= radius;
            });
        }
        // Para polígonos, use turf.js para evitar erro de .contains()
        setBoxPontos(pontosDentro);
        setShowBox(true);
    };

    return (
        <div style={{ position: "relative" }}>
            <MapContainer
                center={[-15.793889, -47.882778]}
                zoom={12}
                style={{ width: "100%", height: "600px" }}
                id="map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup ref={featureGroupRef}>
                    <EditControl
                        position="topright"
                        onCreated={onCreated}
                        draw={{
                            rectangle: false,
                            polyline: false,
                            polygon: true,
                            circle: true,
                            marker: false,
                            circlemarker: false,
                        }}
                    />
                </FeatureGroup>
                {pontosTuristicos.map((ponto, idx) => (
                    <Marker key={idx} position={[ponto.lat, ponto.lng]}>
                        <Popup>
                            <strong>{ponto.nome}</strong><br />
                            Ano: {ponto.ano}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {showBox && (
                <BoxFlutuante
                    pontos={boxPontos}
                    onClose={() => setShowBox(false)}
                />
            )}
        </div>
    );
}

export default MapComponent;
