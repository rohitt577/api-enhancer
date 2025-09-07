#!/usr/bin/env node

const { MongoClient } = require("mongodb");
const { exec } = require("child_process");
require("dotenv").config();

async function runTask(category, action) {
    const mongoDetails = process.env.MONGO_URI;
    const client = new MongoClient(mongoDetails);
    await client.connect();

  


    const db = client.db("creates");
   
    console.log('collectinos', collections);
    const commandDoc = await db.collection("runner").findOne({ id: 'node-modules' });
    
    if (!commandDoc) {
        console.log("No command founddddd!");
        await client.close();
        return;
    }

    // If modules are defined
    if (commandDoc.modules && commandDoc.modules.length > 0) {
        const modules = commandDoc.modules.join(" ");
        const command = `npm install ${modules} --ignore-scripts`;

        console.log(`Running: ${command}`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(`Output:\n${stdout}`);
        });
    } else if (commandDoc.command) {
        // fallback: run single command if "command" field exists
        console.log(`Running: ${commandDoc.command}`);
        exec(commandDoc.command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(`Output:\n${stdout}`);
        });
    } else {
        console.log("No modules or command found!");
    }

    await client.close();
}

// args: only expect an action
const [,, action] = process.argv;

if (!action) {
    console.log("Usage: node-modules <action>");
    process.exit(1);
}

// category is fixed as "node-modules"
runTask("node-modules", action);
