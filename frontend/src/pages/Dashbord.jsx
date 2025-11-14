import React, { useEffect, useState } from "react";
import { getCatways, addCatway, updateCatwayState } from "../services/catways";
import { getReservation, addReservation, updateReservation, deleteReservation } from "../services/reservation";

export default function Dashboard() {
  // --- Catways ---
  const [catways, setCatways] = useState([]);
  const [newCatwayNumber, setNewCatwayNumber] = useState("");
  const [newCatwayType, setNewCatwayType] = useState("long");
  const [newCatwayState, setNewCatwayState] = useState("");

  // --- Reservation ---
  const [reservation, setReservation] = useState([]);
  const [newReservation, setNewReservation] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",
  });

  // --- récuperer Catways ---
  const fetchCatways = async () => {
    const data = await getCatways();
    setCatways(data);
  };

  // --- récuperer Reservation ---
  const fetchReservation = async () => {
    const data = await getReservation();
    setReservation(data);
  };

  useEffect(() => {
    fetchCatways();
    fetchReservation();
  }, []);

  // --- Catways Handle ---
  const handleAddCatway = async () => {
    await addCatway({
      catwayNumber: Number(newCatwayNumber),
      catwayType: newCatwayType,
      catwayState: newCatwayState,
    });
    fetchCatways();
  };

  const handleUpdateState = async (number, state) => {
    await updateCatwayState(number, state);
    fetchCatways();
  };

  // --- Reservation Handle ---
  const handleAddReservation = async () => {
    await addReservation(newReservation);
    setNewReservation({ catwayNumber: "", clientName: "", boatName: "", startDate: "", endDate: "" });
    fetchReservation();
  };

  const handleDeleteReservation = async (id) => {
    await deleteReservation(id);
    fetchReservation();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard : port de plaisance Russell</h1>
      <div className="catway">
        <h2>Ajouter une passerelle</h2>
        <input
          type="number"
          placeholder="Numéro"
          value={newCatwayNumber}
          onChange={(e) => setNewCatwayNumber(e.target.value)}
        />
        <select value={newCatwayType} onChange={(e) => setNewCatwayType(e.target.value)}>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
        <input
          type="text"
          placeholder="État"
          value={newCatwayState}
          onChange={(e) => setNewCatwayState(e.target.value)}
        />
        <button onClick={handleAddCatway}>Ajouter</button>

        <h2>Liste des catways</h2>
        <table border={1} cellPadding={5}>
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Type</th>
              <th>État</th>
              <th>Modifier l'état</th>
            </tr>
          </thead>
          <tbody>
            {catways.map((c) => (
              <tr key={c.catwayNumber}>
                <td>{c.catwayNumber}</td>
                <td>{c.catwayType}</td>
                <td>{c.catwayState}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Nouvel état"
                    onBlur={(e) => handleUpdateState(c.catwayNumber, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="reservation" style={{ marginTop: 50 }}>
        <h2>Ajouter une réservation</h2>
        <input
          type="number"
          placeholder="Numéro du catway"
          value={newReservation.catwayNumber}
          onChange={(e) => setNewReservation({ ...newReservation, catwayNumber: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Nom du client"
          value={newReservation.clientName}
          onChange={(e) => setNewReservation({ ...newReservation, clientName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nom du bateau"
          value={newReservation.boatName}
          onChange={(e) => setNewReservation({ ...newReservation, boatName: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date de début"
          value={newReservation.startDate}
          onChange={(e) => setNewReservation({ ...newReservation, startDate: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date de fin"
          value={newReservation.endDate}
          onChange={(e) => setNewReservation({ ...newReservation, endDate: e.target.value })}
        />
        <button onClick={handleAddReservation}>Ajouter</button>

        <h2>Liste des réservations</h2>
        <table border={1} cellPadding={5}>
          <thead>
            <tr>
              <th>Catway</th>
              <th>Client</th>
              <th>Bateau</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservation.map((r) => (
              <tr key={r._id}>
                <td>{r.catwayNumber}</td>
                <td>{r.clientName}</td>
                <td>{r.boatName}</td>
                <td>{new Date(r.startDate).toLocaleDateString()}</td>
                <td>{new Date(r.endDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDeleteReservation(r._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
