import { getCatways, addCatway, updateCatwayState } from "../services/catways";
import React, { useEffect, useState } from "react";

export default function Catway() {

  const [catways, setCatways] = useState([]);
  const [newCatwayNumber, setNewCatwayNumber] = useState("");
  const [newCatwayType, setNewCatwayType] = useState("long");
  const [newCatwayState, setNewCatwayState] = useState("");


  const fetchCatways = async () => {
    const data = await getCatways();
    setCatways(data);
  };

  useEffect(() => {
    fetchCatways();  
  }, []);

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

  return (
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
  );
}
