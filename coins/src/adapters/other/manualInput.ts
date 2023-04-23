import { Write } from "../utils/dbInterfaces";
import { addToDBWritesList } from "../utils/database";

interface TokenInfo {
  symbol: string;
  address: string;
  decimals: number;
  redirect: string;
}
const contracts: { [chain: string]: TokenInfo[] } = {
  evmos: [
    {
      symbol: "axlDAI",
      address: "0x4a2a90d444dbb7163b5861b772f882bba394ca67",
      decimals: 18,
      redirect: "coingecko#dai",
    },
    {
      symbol: "axlUSDC",
      address: "0x15c3eb3b621d1bff62cba1c9536b7c1ae9149b57",
      decimals: 6,
      redirect: "coingecko#usd-coin",
    },
    {
      symbol: "axlUSDT",
      address: "0xe01c6d4987fc8dce22988dada92d56da701d0fe0",
      decimals: 6,
      redirect: "coingecko#tether",
    },
    {
      symbol: "ceDAI",
      address: "0x940daaba3f713abfabd79cdd991466fe698cbe54",
      decimals: 18,
      redirect: "coingecko#dai",
    },
    {
      symbol: "ibc G-DAI",
      address: "0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75",
      decimals: 18,
      redirect: "coingecko#dai",
    },
    {
      symbol: "ibc G-USDC",
      address: "0x5fd55a1b9fc24967c4db09c513c3ba0dfa7ff687",
      decimals: 6,
      redirect: "coingecko#usd-coin",
    },
    {
      symbol: "ibc G-USDT",
      address: "0xeceeefcee421d8062ef8d6b4d814efe4dc898265",
      decimals: 6,
      redirect: "coingecko#tether",
    },
  ],
  arbitrum: [
    {
      symbol: "mUMAMI",
      address: "0x2adabd6e8ce3e82f52d9998a7f64a90d294a92a4",
      decimals: 9,
      redirect: "coingecko#umami-finance",
    },
    {
      symbol: "fsGLP",
      address: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",
      decimals: 18,
      redirect: "asset#arbitrum:0x4277f8f2c384827b5273592ff7cebd9f2c1ac258",
    },
    {
      symbol: "fGLP",
      address: "0x4e971a87900b931fF39d1Aad67697F49835400b6",
      decimals: 18,
      redirect: "asset#arbitrum:0x4277f8f2c384827b5273592ff7cebd9f2c1ac258",
    },
    {
      symbol: "OLE",
      address: "0xd4d026322c88c2d49942a75dff920fcfbc5614c1",
      decimals: 18,
      redirect: "coingecko#openleverage",
    },
  ],
  polygon: [
    {
      symbol: "wstETH",
      address: "0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
      decimals: 18,
      redirect: "coingecko#wrapped-steth",
    },
  ],
  kava: [
    {
      symbol: "DEXI",
      address: "0xd22a58f79e9481d1a88e00c343885a588b34b68b",
      decimals: 9,
      redirect: "coingecko#dexioprotocol-v2",
    },
  ],
};

export default async function getTokenPrices(chain: string, timestamp: number) {
  const writes: Write[] = [];

  Object.values(contracts[chain]).map((a: TokenInfo) => {
    addToDBWritesList(
      writes,
      chain,
      a.address,
      undefined,
      a.decimals,
      a.symbol,
      timestamp,
      "manual input",
      0.8,
      a.redirect,
    );
  });

  return writes;
}