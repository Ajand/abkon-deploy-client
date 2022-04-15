import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  setTimeout(() => {
    setIsConnected(window?.ethereum?.selectedAddress ? true : false);
    setAccount(
      window?.ethereum?.selectedAddress ? window?.ethereum?.selectedAddress : ""
    );
  }, 500);

  const RPC_URL =
    "https://eth-rinkeby.alchemyapi.io/v2/vfhvTxxlrhwKNnsWfOgxYBKLQyNVuAFj";

  const desiredChain = "0x4";

  const connect = async () => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("Metamask does not exists");
    }
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);

    setIsConnected(true);

    window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: desiredChain }], // chainId must be in hexadecimal numbers
    });
  };

  const provider = account
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider(RPC_URL);

  const signer = provider.getSigner();

  return {
    isConnected,
    connect,
    RPC_URL,
    account,
    provider,
    signer,
  };
};

export default useConnection;
