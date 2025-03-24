import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";

import { PROJECT_ID } from "@/constant";

const wagmiConfig = getDefaultConfig({
  appName: "Snapfy",
  projectId: PROJECT_ID,
  chains: [base],
  ssr: true,
});

export default wagmiConfig;
