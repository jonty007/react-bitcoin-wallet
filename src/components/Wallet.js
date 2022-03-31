import React, { useState, useEffect } from "react";
import { Computer } from "bitcoin-computer-lib";
import WalletInfo from "./WalletInfo";
import WalletSignIn from "./WalletSignIn";
import WalletSend from "./WalletSend";

export default function Wallet() {
  const [seed, setSeed] = useState(null);
  const [computer, setComputer] = useState(null);
  const [balance, setBalance] = useState(0);

  const handleSeedSubmit = (value) => {
    console.log("this called with value: ", value);
    setSeed(value);
  };

  const handleSignOut = () => {
    setSeed(null);
    setComputer(null);
    setBalance(0);
  };

  useEffect(() => {
    if (seed) {
      setComputer(
        new Computer({
          seed: seed, //describe install ostrich blast region era course junior feed acoustic galaxy annual
          chain: "LTC",
          network: "testnet",
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

  return (
    <>
      {computer ? (
        <>
          <WalletInfo
            address={computer.db.wallet.getAddress().toString()}
            balance={balance / 1e8}
            publicKey={computer.db.wallet.getPublicKey().toString()}
            network={computer.db.wallet.restClient.chain}
            handleSignOut={handleSignOut}
          />

          <br />

          <WalletSend computer={computer} />
        </>
      ) : (
        <>
          {" "}
          <WalletSignIn handleSubmit={handleSeedSubmit} />{" "}
        </>
      )}
    </>
  );
}
