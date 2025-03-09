import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="text-2xl">
      <ConnectButton
        label="Connect Wallet"
        showBalance={false}
        accountStatus={"address"}
      />
      <h1 className="font-inter">Hello World</h1>
    </div>
  );
}
