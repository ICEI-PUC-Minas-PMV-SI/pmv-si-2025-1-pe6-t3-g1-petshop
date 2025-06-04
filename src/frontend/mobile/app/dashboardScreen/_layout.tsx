import DashboardScreen from "../../components/DashBoardScreen";
import React from "react";
import { Slot } from "expo-router";

export default function DashBoardLayout() {
  return (
    <DashboardScreen>
      <Slot />
    </DashboardScreen>
  );
}
