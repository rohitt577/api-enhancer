#!/usr/bin/env node

const { MongoClient } = require("mongodb");
const { exec } = require("child_process");
require("dotenv").config();

async function runDockerTask(action) {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db("Manager");
    const commandDoc = await db.collection("create").findOne({ id: "docker" });

    if (!commandDoc) {
        console.log("No command found for docker!");
        await client.close();
        return;
    }

    if (commandDoc.files && commandDoc.files.length > 0) {
        // Example: install docker images or run docker-compose
        for (const file of commandDoc.files) {
            const command = `docker pull ${file}`;
            console.log(`Running: ${command}`);

            exec(command, (error, stdout, stderr) => {
                if (error) console.error(`Error: ${error.message}`);
                if (stderr) console.error(`Stderr: ${stderr}`);
                if (stdout) console.log(`Output:\n${stdout}`);
            });
        }
    } else {
        console.log("No docker files found in document.");
    }

    await client.close();
}

// CLI args
const [,, action] = process.argv;

if (!action) {
    console.log("Usage: docker-install <action>");
    process.exit(1);
}

runDockerTask(action);
