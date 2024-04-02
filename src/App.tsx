import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Chats from "./Page/Chats";
import Login from "./Page/Login";

import SignUp from "./Page/SignUp";
import Protected from "./components/Protected";
import UploadInfor from "./Page/UploadInfor";
import { store } from "./Redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Chats />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  // {
  //   path: "/chat-room/:id",
  //   element: (
  //     <Protected>
  //       <ChatRoom />
  //     </Protected>
  //   ),
  // },
  {
    path: "/upload",
    element: (
      <Protected>
        <UploadInfor />
      </Protected>
    ),
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
