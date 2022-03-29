import React, { useState, useEffect } from "react";
import { Computer } from "bitcoin-computer-lib";
import "./App.css";

function App() {
  const [seed, setSeed] = useState(null);
  const [computer, setComputer] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState("");

  useEffect(() => {
    if (seed) {
      setComputer(
        new Computer({
          seed: seed, //describe install ostrich blast region era course junior feed acoustic galaxy annual
          chain: "LTC",
          network: "regtest",
          url: "http://127.0.0.1:3000",
        })
      );
    }
  }, [seed]);

  useEffect(() => {
    async function refresh() {
      if (computer) setBalance(await computer.db.wallet.getBalance());
    }
    refresh();
  }, [computer]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const txId = await computer.db.wallet.send(parseInt(amount * 1e8, 10), to);
    const message = `Sent\n${amount}\n\nTo\n${to}\n\nTransaction id\n${txId}`;
    console.log(message);
    alert(message);
  };

  const handleSeedSubmit = async (evt) => {
    evt.preventDefault();
    const seedValue = document.getElementById("seedValue").value;
    setSeed(seedValue);
  };

  return (
    <div className="App">
      <h2>Wallet</h2>
      {computer ? (
        <>
          <b>Address</b>&nbsp;{computer.db.wallet.getAddress().toString()}
          <br />
          <b>Public Key</b>&nbsp;{computer.db.wallet.getPublicKey().toString()}
          <br />
          <b>Balance</b>&nbsp;{balance / 1e8}{" "}
          {computer.db.wallet.restClient.chain}
          <h3>Send</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Amount&nbsp;
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></input>
            </label>
            <br />
            <label>
              To&nbsp;
              <input
                type="string"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              ></input>
            </label>
            <br />
            <input type="submit" value="Send Bitcoin"></input>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleSeedSubmit}>
            <label>
              Enter Seed Phrase to use Wallet!
              <input
                id="seedValue"
                type="string"
                style={{ width: "100%" }}
              ></input>
            </label>
            <br />
            <input type="submit" value="Set Seed Phrase"></input>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
