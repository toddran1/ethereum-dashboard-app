import { ethers } from "ethers";
import { ERC20_ABI } from "../constants/erc20";

export async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string,
  provider: ethers.providers.Provider
): Promise<{ balance: string; symbol: string }> {
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const rawBalance = await tokenContract.balanceOf(walletAddress);
  const decimals = await tokenContract.decimals();
  const symbol = await tokenContract.symbol();

  const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);
  return { balance: formattedBalance, symbol };
}
