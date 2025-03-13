const ALCHEMY_API_URL =
  "https://eth-mainnet.alchemyapi.io/v2/Tv1cXVrmxznQd3uQez66fyX73cs7wIDo";

async function checkAlchemyStatus() {
  try {
    const response = await fetch(ALCHEMY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
        params: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Alchemy API Error: ${response}`);
    }

    const data = await response.json();
    console.log("Alchemy is working! Latest block number:", data.result);
  } catch (error) {
    console.error("Error checking Alchemy status:", error.message);
  }
}

checkAlchemyStatus();
