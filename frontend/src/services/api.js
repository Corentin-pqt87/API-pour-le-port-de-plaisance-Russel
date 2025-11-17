const API_URL = "https://api-pour-le-port-de-plaisance-russel.onrender.com";

/**
 * communication entre le site et l'api
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export async function login(email, password) {
  const res = await fetch(`${API_URL}/users/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}