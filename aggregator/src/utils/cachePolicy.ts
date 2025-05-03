import { CachePolicy } from "../../types";

export function getCachePolicyForMethod(method: string): CachePolicy {
  const forever = 60 * 60 * 1000;
  const short = 3 * 1000;
  const medium = 10 * 1000;

  switch (method) {
    // Finalized-only methods
    case "getBlock":
    case "getTransaction":
      return { cacheable: true, ttlMs: forever, finalizedOnly: true };

    // Stable/static data
    case "getEpochSchedule":
    case "getGenesisHash":
    case "getVersion":
    case "getMinimumBalanceForRentExemption":
    case "getStakeMinimumDelegation":
    case "minimumLedgerSlot":
    case "getIdentity":
    case "getInflationGovernor":
      return { cacheable: true, ttlMs: forever };

    // Medium TTL data
    case "getLargestAccounts":
    case "getInflationRate":
    case "getVoteAccounts":
    case "getRecentPerformanceSamples":
    case "getRecentPrioritizationFees":
    case "getSupply":
      return { cacheable: true, ttlMs: medium };

    // Dynamic but cacheable
    case "getAccountInfo":
    case "getMultipleAccounts":
    case "getBalance":
    case "getProgramAccounts":
    case "getTokenAccountsByOwner":
    case "getTokenAccountBalance":
    case "getSlot":
    case "getSlotLeader":
    case "getSlotLeaders":
    case "getBlockCommitment":
    case "getBlockProduction":
    case "getEpochInfo":
    case "getLeaderSchedule":
    case "getBlocks":
    case "getBlocksWithLimit":
    case "getBlockTime":
    case "getClusterNodes":
    case "getFirstAvailableBlock":
    case "getInflationReward":
    case "getMaxRetransmitSlot":
    case "getMaxShredInsertSlot":
    case "getTokenLargestAccounts":
    case "getTokenSupply":
    case "getTransactionCount":
    case "getSignaturesForAddress":
    case "getTokenAccountsByDelegate":
    case "isBlockhashValid":
      return { cacheable: true, ttlMs: short };

    // Non-cacheable methods (mutative or highly dynamic)
    case "sendTransaction":
    case "simulateTransaction":
    case "requestAirdrop":
    case "getLatestBlockhash":
    case "getFeeForMessage":
    case "getSignatureStatuses":
    case "getHealth":
      return { cacheable: false };

    default:
      return { cacheable: false };
  }
}
