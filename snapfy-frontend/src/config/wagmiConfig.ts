import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

import { PROJECT_ID } from "@/constant";

const wagmiConfig = getDefaultConfig({
  appName: "Snapfy",
  projectId: PROJECT_ID,
  chains: [baseSepolia],
  ssr: true,
});

export default wagmiConfig;
