import { Avatar, Grid, List, Paper } from "@mui/material";
import ChatItem from "../components/ChatItem";
import ChatRoom from "./ChatRoom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { userData } from "../Utils/utils";
import ChatHeader from "../components/ChatHeader";

function Chats() {
  const [users, setUsers] = useState([]);
  const [loadingg, setLoading] = useState(true);

  const getDoc = async () => {
    const querySnapshot = await getDocs(collection(db, "contact"));
    let userr: any = [];
    querySnapshot.forEach((doc) => {
      userr.push({ id: doc.id, ...userData, ...doc.data() });
    });

    setUsers(userr);
    setLoading(false);
  };

  const userInfo: object | any = auth.currentUser;

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <Grid container>
      <Grid
        flexDirection={"column"}
        gap={50}
        xs={12}
        sm={4}
        sx={{ width: "100%", height: "100%" }}
      >
        <ChatHeader
          name={userInfo.displayName}
          img={userInfo.photoURL}
          loading={loadingg}
        />
        <List
          sx={{
            width: "100%",
            maxWidth: "98%",
            mt: "20px",
            pl: "24px",
            py: "10px",
            bgcolor: "background.paper",
          }}
        >
          {!loadingg ? (
            users.map((e: any) => (
              <ChatItem
                img={e.image}
                name={e.name}
                online={e.isOnline}
                messageDate={e.messageTime}
              />
            ))
          ) : (
            <div className=" absolute top-[50vh]  right-[30vh]">
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
              </div>
            </div>
          )}
        </List>
      </Grid>

      <Grid
        sx={{ height: "100vh", display: { xs: "none", sm: "block" } }}
        sm={8}
      >
        <Paper sx={{ height: "100vh" }}>
          <ChatRoom />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Chats;
