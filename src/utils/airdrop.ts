import * as web3 from "@solana/web3.js";
import * as dotenv from "dotenv";

dotenv.config();

async function airdrop(senderKeypair: web3.Keypair, targetPublicKey: web3.PublicKey, lamportsAmount: number) {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

        // Check the balance of the target account before the airdrop
        const beforeBalance = await connection.getBalance(targetPublicKey);
        console.log(`Target account balance before airdrop: ${beforeBalance} lamports`);

        // Request an airdrop to the target account
        await connection.requestAirdrop(targetPublicKey, lamportsAmount);

        // Check the balance of the target account after the airdrop
        const afterBalance = await connection.getBalance(targetPublicKey);
        console.log(`Target account balance after airdrop: ${afterBalance} lamports`);

        console.log(`Airdrop of ${lamportsAmount} lamports to account ${targetPublicKey.toBase58()} completed successfully!`);
    } catch (error) {
        console.error("Error during airdrop:", error);
    }
}

async function main() {
    try {
        // Initialize the sender keypair
        const sender = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SENDER_PRIVATE_KEY ?? "")));

        // Initialize the target account public key
        const targetPublicKey = new web3.PublicKey("TARGET_ACCOUNT_PUBLIC_KEY"); // Replace with the actual public key

        // Specify the amount of lamports for the airdrop
        const lamportsAmount = web3.LAMPORTS_PER_SOL * 1; // You can adjust the amount

        // Perform the airdrop
        await airdrop(sender, targetPublicKey, lamportsAmount);
    } catch (error) {
        console.error("Error in main:", error);
    }
}

main();

export default airdrop;