import { createBrowserRouter } from "react-router";
import { GoalInput } from "./components/GoalInput";
import { ReasonInput } from "./components/ReasonInput";
import { TodayGoal } from "./components/TodayGoal";
import { Completion } from "./components/Completion";
import { History } from "./components/History";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GoalInput,
  },
  {
    path: "/reason",
    Component: ReasonInput,
  },
  {
    path: "/today",
    Component: TodayGoal,
  },
  {
    path: "/completion",
    Component: Completion,
  },
  {
    path: "/history",
    Component: History,
  },
]);
