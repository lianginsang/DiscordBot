if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];
const fs = require('fs');

const functionFolders = fs.readdirSync('../src/functions/');
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`../src/functions/${folder}/`).filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) require(`../src/functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(process.env.TOKEN);






