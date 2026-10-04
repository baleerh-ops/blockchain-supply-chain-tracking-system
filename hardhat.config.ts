import { defineConfig } from "hardhat/config";
import hardhatViem from "@nomicfoundation/hardhat-viem";

export default defineConfig({
    plugins: [hardhatViem],

    solidity: {
        version: "0.8.34",
    },

    networks: {
        localhost: {
            type: "http",
            url: "http://127.0.0.1:8545",
        },
    },
});