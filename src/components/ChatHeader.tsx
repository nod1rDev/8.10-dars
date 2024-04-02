import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import { Avatar, Drawer, Link, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ChatHeader() {
  const UserName = useSelector((state: any) => state.User.userName);
  const nikName = useSelector((state: any) => state.User.userNikname);
  const bio = useSelector((state: any) => state.User.userBio);
  const img = useSelector((state: any) => state.User.userImg);
  const email = useSelector((state: any) => state.User.email);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "8px 10px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ p: "10px" }}
          color="primary"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search " }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>

      <Drawer open={open}>
        <div className="h-full relative   w-[100vh] md:w-[45vh] py-4 px-6">
          <div className="flex mb-2 flex-col gap-3 items-start justify-center">
            <Avatar src={img} />
            <Typography sx={{ fontWeight: "700" }}>{UserName}</Typography>
          </div>
          <Divider />
          <Typography fontWeight={"700"} sx={{ mt: "8px" }}>
            UserName
          </Typography>
          <Link
            component="button"
            variant="body2"
            sx={{ mb: 2 }}
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            {nikName}
          </Link>

          <div className="flex flex-col mb-2">
            <Typography fontWeight={"700"} sx={{ mt: "8px" }}>
              UserEmail
            </Typography>
            <Link href="https://mail.google.com/mail/u/0/#inbox">{email}</Link>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <Typography fontWeight={"700"} sx={{ mt: "8px" }}>
              UserBio
            </Typography>
            <p className="max-w-[80%] text-[18px]">{bio}</p>
          </div>

          <Link
            component="button"
            variant="body2"
            fontSize={"22px"}
            display={"flex"}
            sx={{
              mt: { xs: "47%", md: "47vh" },
              ml: { xs: "45%", md: "24vh" },
            }}
            onClick={() => {
              signOut(auth);
              navigate("/signup");
            }}
          >
            Log Out
          </Link>

          <div className=" absolute top-1 left-[330px] md:left-[85%]">
            <IconButton onClick={() => setOpen(false)} color="primary">
              <ClearIcon />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </>
  );
}
