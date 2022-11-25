import { ConnectKitButton } from "connectkit";
import PushNotification from "./notifications";
import { Chat } from "@pushprotocol/uiweb";
import { useAccount } from "wagmi";

function App() {
  const { address } = useAccount();

  return (
    <>
      <ConnectKitButton />
      <PushNotification channel="C4Crypto" />
      <Chat
        account={address} //user address
        supportAddress="0xb44a29524433dBC639C35124459c741bC241d4f4" //support address
        apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
        env="staging"
      />
    </>
  );
}

export default App;
