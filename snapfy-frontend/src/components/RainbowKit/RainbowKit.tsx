import { ReactNode } from "react";

import { RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import wagmiConfig from "@/config/wagmiConfig";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const customTheme: Theme = {
  blurs: {
    modalOverlay: "6px",
  },
  colors: {
    accentColor: "#ff007a",
    accentColorForeground: "#FFFFFF",
    actionButtonBorder: "#dadada",
    actionButtonBorderMobile: "#dadada",
    actionButtonSecondaryBackground: "#efefd5",
    closeButton: "#5e6a5e",
    closeButtonBackground: "#ffffe3",
    connectButtonBackground: "#ff007a",
    connectButtonBackgroundError: "#ff007a",
    connectButtonInnerBackground: "#ff007a",
    connectButtonText: "#FFFFFF",
    connectButtonTextError: "#FFFFFF",
    connectionIndicator: "#26a17b",
    downloadBottomCardBackground: "#efefd5",
    downloadTopCardBackground: "#ffffe3",
    error: "#ff007a",
    generalBorder: "#dadada",
    generalBorderDim: "#adad9b",
    menuItemBackground: "#efefd5",
    modalBackdrop: "rgba(0, 0, 0, 0.75)",
    modalBackground: "#ffffe3",
    modalBorder: "#dadada",
    modalText: "#0e100e",
    modalTextDim: "#5e6a5e",
    modalTextSecondary: "#adad9b",
    profileAction: "#efefd5",
    profileActionHover: "#ff007a",
    profileForeground: "#ffffe3",
    selectedOptionBorder: "#ff007a",
    standby: "#ff007a",
  },
  fonts: {
    body: "",
  },
  radii: {
    actionButton: "4px",
    connectButton: "4px",
    menuButton: "4px",
    modal: "6px",
    modalMobile: "6px",
  },
  shadows: {
    connectButton: "",
    dialog: "0px 10px 20px rgba(0, 0, 0, 0.3)",
    profileDetailsAction: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    selectedOption: "0px 0px 6px rgba(255, 0, 122, 0.6)",
    selectedWallet: "0px 0px 10px rgba(255, 0, 122, 0.8)",
    walletLogo: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
};

const RainbowKit = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKit;
