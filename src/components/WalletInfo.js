import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function WalletInfo(props) {
  return (
    <>
      <h2>Wallet Info</h2>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Address
          </Typography>
          <Typography variant="h5" component="div">
            {props.address}
          </Typography>

          <br />

          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Balance
          </Typography>
          <Typography variant="h5" component="div">
            {props.balance} {props.network}
          </Typography>

          <br />

          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Public Key
          </Typography>
          <Typography variant="h5" component="div">
            {props.publicKey}
          </Typography>
        </CardContent>

        <CardActions>
          <Button variant="contained" onClick={props.handleSignOut}>
            Sign Out
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
