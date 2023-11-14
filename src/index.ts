import * as web3 from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"
import * as dotenv from "dotenv";
dotenv.config();

const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');


async function main() {
    try {
        const payer = getKeypairFromEnvironment('SECRET_KEY');

        const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

        await sendPingTransaction(connection, payer);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function sendPingTransaction(connection: web3.Connection, payer: web3.Keypair) {
    try {
        const transaction = new web3.Transaction();

        const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
        const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: pingProgramDataId,
                    isSigner: false,
                    isWritable: true
                },
            ],
            programId
        });
        
        transaction.add(instruction)

        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [payer]
        )

        console.log(`✅ Transaction completed! Signature is ${signature}`);
        console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
        throw new Error(error.message);
    }
}

main()
    .then(() => console.log("Finished Successfully!"))
    .catch(error => console.error(error.message));