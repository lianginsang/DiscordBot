const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge_anyone')
        .setDescription('starts ranked pvp'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Ranked Duel')
            .setDescription('Duel will start once both players join.')
            .setColor(0x101287)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.username
            })
            .addFields([
                {
                    name: 'Duelist 1',
                    value: interaction.user.username,
                    inline: true
                },
                {
                    name: 'Duelist 2',
                    value: 'waiting on duelist 2...',
                    inline: true
                },
            ]);
        await interaction.reply({
            embeds: [embed]
        })
    }
}