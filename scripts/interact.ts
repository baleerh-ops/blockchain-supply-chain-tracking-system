import { network } from "hardhat";

async function main() {
    const { viem } = await network.connect();

    const supplyChain = await viem.getContractAt(
        "SupplyChain",
        "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
    );

    // Add product
    await supplyChain.write.addProduct([
        "motorcycle",
        "Gombe",
        "Manufactured"
    ]);

    console.log("Product added successfully!");

    // Update product
    await supplyChain.write.updateProduct([
        1n,
        "Kano",
        "In Transit"
    ]);

    console.log("Product updated successfully!");

    // Read product
    const product = await supplyChain.read.products([1n]);

    console.log("Product ID:", product[0].toString());
    console.log("Name:", product[1]);
    console.log("Location:", product[2]);
    console.log("Status:", product[3]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
