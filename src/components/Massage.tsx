import { Paper, Stack } from "@mui/material";

function Massage(props: { sender: boolean; text: string }) {
  return (
    <Stack direction={props.sender ? "row-reverse" : "row"}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: 1,
          bgcolor: props.sender ? "primary.main" : "",
          color: props.sender ? "white" : "",
        }}
      >
        {props.text}
      </Paper>
    </Stack>
  );
}

export default Massage;
