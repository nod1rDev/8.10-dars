import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { createPortal } from "react-dom";
import { Avatar, Button, Drawer, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function ChatHeader(props: {
  img: string | any;
  name: string | any;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);
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
        <div className="h-full relative  w-[100vh] md:w-[45vh] py-4 px-6">
          <div className="flex flex-col gap-3 items-start justify-center">
            <Avatar
              src={
                props.loading && props.img
                  ? "https://cdn.iconscout.com/icon/free/png-256/free-laptop-user-1-1179329.png"
                  : props.img
              }
            />
            <Typography sx={{ fontWeight: "700" }}>
              {props.name ? props.name : "Alisher"}
            </Typography>
          </div>
          <div className=" absolute top-0 right-0">
            <IconButton onClick={() => setOpen(false)} color="primary">
              <ClearIcon />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </>
  );
}
