import { createSlice } from "@reduxjs/toolkit";
const data1 = localStorage.getItem("userName");
const data2 = localStorage.getItem("userNikname");
const data3 = localStorage.getItem("userBio");
const data4 = localStorage.getItem("userEmail");
const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userName: data1 ? JSON.parse(data1) : "",
    userNikname: data2 ? JSON.parse(data2) : "",
    userBio: data3 ? JSON.parse(data3) : "",
    ready: false,
    email: data4 ? JSON.parse(data4) : "",
    userImg:
      "https://cdn.iconscout.com/icon/free/png-256/free-laptop-user-1-1179329.png",
  },
  reducers: {
    addData: (state, { payload }) => {
      state.userName = payload.name + payload.lastName;
      state.userNikname = payload.nikName;
      state.userBio = payload.bio;
      state.ready = true;
      state.email = payload.email;

      localStorage.setItem("userName", JSON.stringify(state.userName));
      localStorage.setItem("userNikname", JSON.stringify(state.userNikname));
      localStorage.setItem("userBio", JSON.stringify(state.userBio));
      localStorage.setItem("userEmail", JSON.stringify(state.email));
    },
  },
});

export const { addData } = userSlice.actions;

export const user = userSlice.reducer;
