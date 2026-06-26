import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SupportPage from "./pages/SupportPage";
import PlannerPage from "./pages/PlannerPage";
import TaskBreaker from "./pages/TaskBreaker";
import FocusMode from "./pages/FocusMode";
import CalmCorner from "./pages/CalmCorner";
import CameraBubblePage from "./pages/CameraBubblePage";
import NeuroRegulationCoach from "./pages/NeuroRegulationCoach";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/support", element: <SupportPage /> },
  { path: "/planner", element: <PlannerPage /> },
  { path: "/task-breaker", element: <TaskBreaker /> },
  { path: "/focus-mode", element: <FocusMode /> },
  { path: "/calm-corner", element: <CalmCorner /> },
  { path: "/camera-bubble", element: <CameraBubblePage /> },
  { path: "/coach", element: <NeuroRegulationCoach /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
