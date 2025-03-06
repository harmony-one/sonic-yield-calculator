import { createPublicClient, http } from "viem";
import { sonic } from "./chain";
import config from "../config";

export const publicClient = createPublicClient({
  chain: sonic,
  transport: http(config.defaultRPC)
});