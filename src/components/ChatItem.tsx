import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { Badge, Divider } from "@mui/material";
import { Person } from "@mui/icons-material";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px #eee`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
function ChatItem(props: {
  name: string;
  online: boolean;
  img: string;
  messageDate: string;
  onClick: any;
}) {
  return (
    <div onClick={props.onClick} className=" cursor-pointer">
      <ListItem >
        <ListItemAvatar>
          {props.online ? (
            <StyledBadge
              badgeContent={5}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              overlap="circular"
              color="primary"
            >
              <Avatar src={props.img}></Avatar>
            </StyledBadge>
          ) : (
            <Avatar src={props.img}></Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={props.name} secondary={props.messageDate} />
      </ListItem>
      <Divider />
    </div>
  );
}

export default ChatItem;
