import React from "react";
import Catway from "./Catway";
import Reservation from "./Reservation";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard : port de plaisance Russell</h1>

      <Catway />
      <Reservation />
    </div>
  );
}