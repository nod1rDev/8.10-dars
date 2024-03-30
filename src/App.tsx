import { Button, CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Chats from "./Page/Chats";
import Login from "./Page/Login";
import ChatRoom from "./Page/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chats />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat-room/:id",
    element: <ChatRoom />,
  },
]);

function App() {
  return (
    <div>
      <CssBaseline />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
