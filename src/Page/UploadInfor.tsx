import { AccountCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { auth, database, db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, set } from "firebase/database";

function UploadInfor() {
  const [loading, setloading] = useState(false);
  const [Names, setNames] = useState([]);
  const [correct, setCorrect] = useState(false);

  const [value, setValue] = useState<any>({
    name: "",
    lastName: "",
    bio: "",
    nikName: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    setloading(true);
    value.email = auth.currentUser?.email;

    const querySnapshot = await getDocs(collection(db, "users/"));
    let userrName: any = [];
    querySnapshot.forEach((doc: any) => {
      userrName.push({ id: doc.id, ...doc.data() });
    });
    setNames(userrName);

    Names.forEach((e: any) => {
      if (e.userName !== value.nikName) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    });

    if (!correct && loading) {
      alert("You have a mistake with your nik name");
    } else {
      await addDoc(collection(db, "users/"), {
        userName: value.nikName,
      });
      await addDoc(collection(db, "contact/"), {
        name: value.name,
        userName: value.nikName,
      });

      if (value.nikName !== "") {
        dispatch(addData(value));
        navigate("/");
      } else {
        alert("You have to write your userName");
      }
    }

    setloading(false);
  };

  return (
    <div className="flex flex-col gap-10 px-4 md:px-0 justify-center h-[100vh] items-center">
      <Avatar
        sx={{ width: "100px", height: "100px" }}
        src="https://cdn.iconscout.com/icon/free/png-256/free-laptop-user-1-1179329.png"
      />
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
        <div className="flex gap-6">
          <FormControl error={false} sx={{ display: "flex" }} variant="filled">
            <InputLabel htmlFor="component-filled">Name</InputLabel>
            <FilledInput
              value={value.name}
              onChange={handleChange}
              name="name"
              id="component-filled"
              defaultValue=""
            />
          </FormControl>

          <FormControl error={false} sx={{ display: "flex" }} variant="filled">
            <InputLabel htmlFor="component-filled">LastName</InputLabel>
            <FilledInput
              name="lastName"
              onChange={handleChange}
              value={value.lastName}
              id="component-filled"
              defaultValue=""
            />
          </FormControl>
        </div>
        <TextField
          sx={{ mb: -2 }}
          id="filled-multiline-static"
          label="Bio"
          multiline
          onChange={handleChange}
          value={value.bio}
          name="bio"
          rows={4}
          defaultValue=""
          variant="filled"
        />

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            onChange={handleChange}
            required
            name="nikName"
            sx={{ width: "60%" }}
            id="input-with-sx"
            value={value.nikName}
            label="NickName"
            variant="standard"
          />
        </Box>

        <Button
          disabled={loading}
          onClick={handleClick}
          sx={{ width: "40%", ml: "auto" }}
          variant="contained"
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}

export default UploadInfor;
