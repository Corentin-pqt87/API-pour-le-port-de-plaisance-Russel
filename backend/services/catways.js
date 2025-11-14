const API_URL = "http://localhost:5000/catways";

export const getCatways = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    headers: { Authorization: token },
  });
  return res.json();
};

export const addCatway = async (catway) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(catway),
  });
  return res.json();
};

export const updateCatwayState = async (catwayNumber, state) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${catwayNumber}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ catwayState: state }),
  });
  return res.json();
};
