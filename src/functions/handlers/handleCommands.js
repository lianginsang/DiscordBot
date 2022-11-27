const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('../src/commands/');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`../src/commands/${folder}/`).filter((file) => file.endsWith('.js'));
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`command : ${command.data.name} done`);
            }
        }
        const clientId = process.env.CLIENT;
        const guildId = process.env.GUILD;
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
        try {
            console.log("Started app / commands");
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            });
            console.log("Successfully reloaded app / commands");
        } catch (error) {
            console.error(error);
        }
    }
}