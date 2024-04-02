import { configureStore } from "@reduxjs/toolkit";
import { user } from "./userSlice";

export const store = configureStore({
  reducer: {
    User: user,
  },
});

// const name = useSelector((store: any) => store.User.userName);
// import { useSelector, useDispatch } from "react-redux";
