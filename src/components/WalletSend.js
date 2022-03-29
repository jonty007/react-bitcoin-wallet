import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function WalletSend(props) {
  const [amount, setAmount] = useState(null);
  const [to, setTo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const txId = await props.computer.db.wallet.send(
      parseInt(amount * 1e8, 10),
      to
    );
    const message = `Sent\n${amount}\n\nTo\n${to}\n\nTransaction id\n${txId}`;
    console.log(message);
    alert(message);
    setShowAlert(true);
    setAlertMessage(message);
  };

  return (
    <>
      <h2>Send Amount</h2>

      <Card>
        <Box component="form" noValidate autoComplete="off" fullWidth>
          <TextField
            required
            id="outlined-required"
            label="Amount"
            disabled={showAlert}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <br />

          <TextField
            required
            id="outlined-required"
            label="To"
            fullWidth={true}
            disabled={showAlert}
            onChange={(e) => setTo(e.target.value)}
          />
          <br />
          <br />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={showAlert}
          >
            Send {props.computer.db.wallet.restClient.chain}
          </Button>

          <br />
        </Box>

        {showAlert ? (
          <>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Message — <strong>{alertMessage}</strong>
            </Alert>

            <Button
              onClick={() => {
                setShowAlert(false);
                setAlertMessage(null);
              }}
            >
              Send more!
            </Button>
          </>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
