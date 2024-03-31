import { ArrowBackSharp, Send } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Massage from "../components/Massage";

function ChatRoom() {
  return (
    <div>
      <Paper sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <header className="flex px-4 items-center gap-6 py-3 w-full bg-slate-100">
          <IconButton color="primary" sx={{ display: { sm: "none" } }}>
            <ArrowBackSharp />
          </IconButton>
          <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
            Alex
          </Typography>
        </header>

        <Stack justifyContent={"flex-end"} spacing={2} sx={{ px: 2, flex: 1 }}>
          <Massage sender={"me"} />
          <Massage />
          <Massage sender={"me"} />
          <Massage />
        </Stack>

        <Box display={"flex"} sx={{ gap: 2 }} m={2}>
          <TextField
            fullWidth
            label="Message..."
            variant="outlined"
            size="small"
          />
          <IconButton color="primary">
            <Send />
          </IconButton>
        </Box>
      </Paper>
    </div>
  );
}

export default ChatRoom;
