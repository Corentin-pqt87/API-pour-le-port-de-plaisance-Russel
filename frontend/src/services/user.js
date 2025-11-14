const API_URL = "http://localhost:5000";

export async function getUsers() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users`, {
    headers: { "Authorization": token ?? "" }
  });
  return res.json();
}


export async function addUser(user) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ?? ""
    },
    body: JSON.stringify(user)
  });
  return res.json();
}


export async function updateUser(id, user) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ?? ""
    },
    body: JSON.stringify(user)
  });
  return res.json();
}


export async function deleteUser(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: { "Authorization": token ?? "" }
  });
  return res.json();
}
