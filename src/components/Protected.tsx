import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";

function Protected({ children }: { children: any }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.authStateReady().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="absolute top-5 md:top-10 right-2 md:right-5">
        <Alert severity="info">Please wait we are cheking your date</Alert>
      </div>
    );
  } else {
    if (auth.currentUser) {
      return children;
    }

    return <Navigate to={"/login"} />;
  }
}

export default Protected;
