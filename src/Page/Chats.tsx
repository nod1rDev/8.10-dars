import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ChatItem from "../components/ChatItem";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, database, db } from "../firebase";
import { userData } from "../Utils/utils";
import ChatHeader from "../components/ChatHeader";
import { useSelector, useDispatch } from "react-redux";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { ArrowBackSharp, Send } from "@mui/icons-material";
import Massage from "../components/Massage";

function Chats() {
  const [users, setUsers] = useState([]);
  const [loadingg, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<any>();
  const [message, setMessage] = useState<any>();
  const [text, setText] = useState<string>("");

  const getDoc = async () => {
    const querySnapshot = await getDocs(collection(db, "contact"));
    let userr: any = [];
    querySnapshot.forEach((doc) => {
      userr.push({ id: doc.id, ...userData, ...doc.data() });
    });

    setUsers(userr);
    setLoading(false);
  };

  const nikName = useSelector((state: any) => state.User.userNikname);

  useEffect(() => {
    getDoc();
  }, []);
  useEffect(() => {
    console.log(message);
  }, [message]);

  const UserChat = (e: any) => {
    setActiveUser(e);
    let chatName =
      nikName > activeUser?.userName
        ? nikName + activeUser?.userName
        : activeUser?.userName + nikName;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${nikName}/${chatName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMessage(snapshot.val());
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const cahtRef = ref(database, `chats/${chatName}`);
    onValue(cahtRef, (snap) => {
      const data = snap.val();
      if (data) {
        setMessage(Object.values(data));
        
        
      }
    });
  };

  const senButton = () => {
    let chatName =
      nikName > activeUser?.userName
        ? nikName + activeUser?.userName
        : activeUser?.userName + nikName;
    const date = new Date();
    const time: string =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const cahtRef = ref(database, `chats/${chatName}/${time}`);
    set(cahtRef, {
      from: nikName,
      text,
    });
    setText("");
  };

  return (
    <Grid container>
      <Grid
        flexDirection={"column"}
        gap={50}
        xs={12}
        sm={4}
        sx={{ width: "100%", height: "100%" }}
      >
        <ChatHeader />
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
            users.map((e: any, i) => (
              <ChatItem
                key={i}
                onClick={() => UserChat(e)}
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
          <div>
            <Paper
              sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
            >
              <header className="flex px-4 items-center gap-6 py-3 w-full bg-slate-100">
                <IconButton color="primary" sx={{ display: { sm: "none" } }}>
                  <ArrowBackSharp />
                </IconButton>
                <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                  {activeUser ? activeUser?.name : "Nodirbek"}
                </Typography>
              </header>

              <Stack
                justifyContent={"flex-end"}
                spacing={2}
                sx={{ px: 2, flex: 1 }}
              >
                {message &&
                  message.map((e: any, i: number) => (
                    <Massage
                      key={i}
                      text={e.text}
                      sender={nikName == e.from ? true : false}
                    />
                  ))}
              </Stack>

              <Box display={"flex"} sx={{ gap: 2 }} m={2}>
                <TextField
                  fullWidth
                  label="Message..."
                  variant="outlined"
                  size="small"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <IconButton color="primary" onClick={senButton}>
                  <Send />
                </IconButton>
              </Box>
            </Paper>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Chats;
