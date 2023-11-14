import * as web3 from "@solana/web3.js";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Initializes a Solana keypair from the PRIVATE_KEY environment variable.
 * @returns {web3.Keypair} The initialized Solana keypair.
 * @throws {Error} If there is an issue with keypair initialization.
 */
function initializeKeypair(): web3.Keypair {
    try {
        const secret = JSON.parse(process.env.PRIVATE_KEY || "") as number[];
        if (!secret || !Array.isArray(secret)) {
            throw new Error("Invalid private key format");
        }

        const secretKey = Uint8Array.from(secret);
        const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);

        // Avoid logging private keys in production
        console.log("Keypair successfully initialized");

        return keypairFromSecretKey;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error initializing keypair:", error.message);

        // Rethrow the error to signal failure
        throw new Error("Key pair initialization failed");
    }
}

export default initializeKeypair;