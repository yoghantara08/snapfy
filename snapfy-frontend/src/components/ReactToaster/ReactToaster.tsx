import { Toaster } from "react-hot-toast";

const ReactToaster = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#ffffe3",
          border: "1px solid #dadada",
          color: "#0e100e",
        },
        success: {
          style: {
            color: "#26a17b",
          },
        },
        error: {
          style: {
            color: "#ff007a",
          },
        },
      }}
    />
  );
};

export default ReactToaster;
