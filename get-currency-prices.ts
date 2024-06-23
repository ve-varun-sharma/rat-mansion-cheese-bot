import axios from "axios";

// Type definitions for the response data
interface CoinbasePriceResponse {
  data: {
    base: string; // The base currency (e.g., BTC)
    currency: string; // The quote currency (e.g., CAD, USD)
    amount: string; // The price of the base currency in the quote currency
  };
}

// Async function to fetch the price
async function getCryptoPrice(currencyPair: string): Promise<string | null> {
  try {
    const response = await axios.get<CoinbasePriceResponse>(
      `https://api.coinbase.com/v2/prices/${currencyPair}/buy`
    );

    // Extract the price from the response
    return response.data.data.amount;
  } catch (error) {
    console.error(`Error fetching ${currencyPair} price:`, error);
    return null; // Return null in case of an error
  }
}

// Example usage
async function main() {
  const btcCadPrice = await getCryptoPrice("BTC-CAD"); // Get BTC price in CAD
  const btcUsdPrice = await getCryptoPrice("BTC-USD"); // Get BTC price in USD
  const ethUsdPrice = await getCryptoPrice("ETH-USD"); // Get BTC price in USD

  if (btcCadPrice && btcUsdPrice) {
    console.log(`BTC Price in CAD: ${btcCadPrice}`);
    console.log(`BTC Price in USD: ${btcUsdPrice}`);
    console.log(`BTC Price in USD: ${ethUsdPrice}`);
  } else {
    console.log("Unable to fetch all prices.");
  }
}

main(); // Call the main function to start the process
