const API_URL = "http://localhost:5000";

export async function getReservation() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/reservation`, {
    headers: { "Authorization": token ? token : "" }
  });
  const data = await res.json();
  
  return Array.isArray(data) ? data : [];
}

export async function addReservation(reservation) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/reservation`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": token ? token : ""
    },
    body: JSON.stringify(reservation),
  });
  return res.json();
}

export async function updateReservation(id, reservation) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/reservation/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? token : ""
    },
    body: JSON.stringify(reservation),
  });
  return res.json();
}

export async function deleteReservation(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/reservation/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": token ? token : ""
    }
  });
  return res.json();
}
