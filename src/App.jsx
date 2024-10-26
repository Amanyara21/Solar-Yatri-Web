import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Listing from "./components/Dashboard/Listing";
import DashPage from "./components/Dashboard/DashPage";
import DetailPage from "./components/Dashboard/CompleteDetail";
import HomePage from "./components/HomeScreen";
import UserOrders from "./components/UserOrders";
import {ChatBot} from "./components/ChatBot";
import AddProject from "./components/AddProject";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoute user={user}>
          <HomePage />
        // </ProtectedRoute>
      ),
    },
    {
      path: "/orders",
      element: <UserOrders />,
    },
    {
      path: "/add-project",
      element: <AddProject />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/admin",
      element: <DashPage/>,
    },
    {
      path: "/admin/listing",
      element: <Listing />,
    },
    {
      path: "/admin/detail",
      element: <DetailPage />,
    },
    {
      path: "/chatbot",
      element: <ChatBot />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
