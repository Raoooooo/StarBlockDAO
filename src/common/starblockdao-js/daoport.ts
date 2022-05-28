import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Protocol } from "./protocol";
import { CallbackHandle, Network, MasterChefPoolsInfo, Web3Callback } from "./types";

export class DaoPort {
  private _protocol: Protocol;
  constructor(provider: Web3, networkName: Network) {
    this._protocol = new Protocol(provider, networkName);
    // this._protocol.account = this.account;
  }

  public setAccount(account: string) {
    this._protocol.account = account;
  }

  public async deposit({ pid, tokenIds }: { pid: number; tokenIds: number[] }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await (this._protocol.NFTMasterChefContract as Contract).methods
        .deposit(pid, tokenIds)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to deposit transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async withdraw({ pid, tokenIds }: { pid: number; tokenIds: number[] }): Promise<string> {
    let txHash;
    try {
      const txnData = { from: this._protocol.account };
      txHash = await (this._protocol.NFTMasterChefContract as Contract).methods
        .withdraw(pid, tokenIds)
        .send(txnData);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to withdraw transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async isApprovedForAll({
    owner,
    operator,
    wnftContract,
    isApproveNFT
  }: {
    owner: string;
    operator?: string;
    wnftContract: string;
    isApproveNFT: Boolean;
  }): Promise<boolean> {
    let REC721Address = wnftContract;
    let isApproved = false;
    operator = isApproveNFT ? wnftContract : this._protocol.NFTMasterChefContractAddress;
    if (isApproveNFT) {
      const WNFTContract = this._protocol.setIWrappedNFTAddress(wnftContract);
      const nftAddress = await (WNFTContract as Contract).methods.nft().call();
      if (nftAddress) {
        REC721Address = nftAddress;
      }
    }
    const REC721Contract = this._protocol.setERC721Addess(REC721Address);
    isApproved = await (REC721Contract as Contract).methods
      .isApprovedForAll(owner, operator)
      .call();
    return isApproved;
  }

  public async setApprovalForAll({
    owner,
    operator,
    wnftContract,
    isApproveNFT
  }: {
    owner: string;
    operator?: string;
    wnftContract: string;
    isApproveNFT: Boolean;
  }): Promise<string> {
    let txHash;
    let REC721Address = wnftContract;
    if (isApproveNFT) {
      const WNFTContract = this._protocol.setIWrappedNFTAddress(wnftContract);
      const nftAddress = await (WNFTContract as Contract).methods.nft().call();
      if (nftAddress) {
        REC721Address = nftAddress;
      } else {
        throw new Error(`Failed to setApprovalForAll transaction: "${"user denied"}..."`);
      }
    }

    operator = isApproveNFT ? wnftContract : this._protocol.NFTMasterChefContractAddress;
    try {
      const txnData = { from: owner };
      const REC721Contract = this._protocol.setERC721Addess(REC721Address);
      txHash = await (REC721Contract as Contract).methods
        .setApprovalForAll(operator, true)
        .send(txnData);
    } catch (error) {
      throw new Error(
        `Failed to setApprovalForAll transaction: "${
          error instanceof Error && error.message ? error.message : "user denied"
        }..."`
      );
    }
    return txHash;
  }

  public async harvestToken(
    pid: number,
    tokenIds: number[],
    handle: CallbackHandle
  ): Promise<void> {
    try {
      const txHash = await this._protocol.harvestToken(pid, tokenIds);
      handle(txHash, "");
    } catch (error) {
      handle("", error);
    }
  }

  public async ownedTokens({
    contractAddress,
    owner
  }: {
    contractAddress: string;
    owner: string;
  }): Promise<number[]> {
    const tokenIds = await (this._protocol.NFTUtilsContract as Contract).methods
      .ownedTokens(contractAddress, owner)
      .call();
    return tokenIds;
  }

  public async getNFTContractAddress(wnftContract: string): Promise<string> {
    const WNFTContract = this._protocol.setIWrappedNFTAddress(wnftContract);
    const nftAddress = await (WNFTContract as Contract).methods.nft().call();
    return nftAddress;
  }

  public async pending<T>(
    {
      pid,
      tokenIds
    }: {
      pid: number;
      tokenIds: number[];
    },
    handle: Web3Callback<T>
  ): Promise<void> {
    try {
      const { mining, dividend } = await (this._protocol.NFTMasterChefContract as Contract).methods
        .pending(pid, tokenIds)
        .call();
      const result: T[] = [mining, dividend];
      handle(null, result);
    } catch (error) {
      handle(
        new Error(
          `Failed to pending transaction: "${
            error instanceof Error && error.message ? error.message : "user denied"
          }..."`
        ),
        null
      );
    }
  }

  public async getNFTMasterChefInfos({
    nftMasterchef,
    pid,
    owner
  }: {
    nftMasterchef?: string;
    pid: number;
    owner: string;
    maxTokenId: number;
  }): Promise<MasterChefPoolsInfo> {
    nftMasterchef = this._protocol.NFTMasterChefContractAddress;
    const { poolInfo, mining, dividend, nftQuantity, wnftQuantity } = await (this._protocol
      .NFTUtilsContract as Contract).methods
      .getNFTMasterChefInfos(nftMasterchef, pid, owner)
      .call();
    console.log(
      "chefInfo---",
      poolInfo["rewardPerNFTForEachBlock"],
      mining,
      dividend,
      nftQuantity,
      wnftQuantity
    );
    return {
      poolInfo,
      mining,
      dividend,
      nftQuantity,
      wnftQuantity
    };
  }
}
