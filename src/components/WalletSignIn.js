import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function WalletSignIn(props) {
  const [inputValue, setInputValue] = useState(null);

  const handleSubmit = () => {
    props.handleSubmit(inputValue);
  };

  return (
    <Box component="form" noValidate autoComplete="off" fullWidth>
      <TextField
        required
        id="outlined-required"
        label="Seed Phrase"
        fullWidth={true}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <br />
      <br />

      <Button variant="contained" onClick={handleSubmit}>
        Set Seed Phrase
      </Button>
    </Box>
  );
}
