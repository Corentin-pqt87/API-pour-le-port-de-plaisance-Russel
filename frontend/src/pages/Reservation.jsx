import React, { useEffect, useState } from "react";
import {getReservation, addReservation, updateReservation, deleteReservation} from "../services/reservation";

export default function Reservation() {

  const [reservation, setReservation] = useState([]);
  const [newReservation, setNewReservation] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",
  });

  // --- Récupérer Reservation ---
  const fetchReservation = async () => {
    const data = await getReservation();
    setReservation(data);
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  // --- Reservation Handle ---
  const handleAddReservation = async () => {
    await addReservation(newReservation);
    setNewReservation({ 
      catwayNumber: "", 
      clientName: "", 
      boatName: "", 
      startDate: "", 
      endDate: "" 
    });
    fetchReservation();
  };

  const handleDeleteReservation = async (id) => {
    await deleteReservation(id);
    fetchReservation();
  };

  return (
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
  );
}
