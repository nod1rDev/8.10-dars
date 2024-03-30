import { Paper, Stack } from "@mui/material";
import React from "react";

function Massage({ sender }: { sender?: string }) {
  return (
    <Stack direction={sender == "me" ? "row-reverse" : "row"}>
      <Paper
        sx={{
          px: 2,
          py: 1,
          bgcolor: sender == "me" ? "primary.main" : "",
          color: sender ? "white" : "",
        }}
      >
        hello
      </Paper>
    </Stack>
  );
}

export default Massage;
