import { network } from "hardhat";

async function main() {
    const { viem } = await network.connect();

    const supplyChain = await viem.deployContract("SupplyChain");

    console.log("SupplyChain deployed to:", supplyChain.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});