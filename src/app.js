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

client.on('guildMemberAdd', member => {
    var ran = randomRange(0, 2);
    var greeting;
    switch (ran) {
        case 0:
            greeting = "Brace yourselves. " + member.user + " just joined the server.";
            break;
        case 1:
            greeting = "Challenger approaching - " + member.user + " has appeared";
            break;
        case 2:
            greeting = "Welcome " + member.user + ". Leave your weapon by the door.";
            break;
        // add more if you want (but dont forget to also change the values in line 2
    }

    member.guild.channels.get('CHANNEL ID HERE').send(greeting);
})

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(process.env.TOKEN);






