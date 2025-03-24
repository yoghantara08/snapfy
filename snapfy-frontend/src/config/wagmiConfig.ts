import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

import { PROJECT_ID } from "@/constant";

const wagmiConfig = getDefaultConfig({
  appName: "Snapfy",
  projectId: PROJECT_ID,
  chains: [sepolia],
  ssr: true,
});

export default wagmiConfig;
