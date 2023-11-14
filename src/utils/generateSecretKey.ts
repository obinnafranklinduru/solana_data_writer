import * as web3 from "@solana/web3.js";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Generates a new Solana keypair.
 * @returns {Promise<web3.Keypair>} A Promise that resolves to the generated keypair.
 */
async function generateNewKeypair() {
    try {
        // Generate a new Solana keypair
        const newKeypair = await web3.Keypair.generate();

        // Log the secret key as a string (for demonstration purposes; avoid doing this in production)
        console.log("New Keypair Secret Key:", newKeypair.secretKey.toString());

        return newKeypair;
    } catch (error) {
        // If an error occurs during keypair generation, throw an error
        throw new Error("Error generating keypair: " + error.message);
    }
}

async function main() {
    try {
        // Generate a new Solana keypair
        const newKeypair = await generateNewKeypair();

        // Additional actions or processing can be added here

        console.log("Keypair Public Key:", newKeypair.publicKey.toBase58());
    } catch (error) {
        // Handle any errors that occur during the main execution
        console.error("Error in main:", error.message);
    }
}

// Execute the main function and handle success or failure
main()
    .then(() => console.log("Finished Successfully!"))
    .catch(error => console.error(error.message));


export default generateNewKeypair;