const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'accept'
    },
    async execute(interaction, client) {
        console.log(interaction.opponent);
        //update works start here
        await interaction.message.startThread({
            name: 'Ranked Duel',
            autoArchiveDuration: 60,
            reason: 'Start Ranked PVP',
        });
        const embed = new EmbedBuilder()
            .setTitle('Ranked Duel')
            .setDescription('Duel Started')
            .setColor(0x101287)
            .setThumbnail('attachment://waiting.png')
            .setTimestamp(Date.now())
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.username + ' is dueling ' + opponent.username
            })
            .addFields([
                {
                    name: 'Duelist 1',
                    value: interaction.user.username,
                    inline: true
                },
                {
                    name: 'Duelist 2',
                    value: opponent.username,
                    inline: true
                },
            ]);
        //change opponent to something else
        await interaction.update({
            content: `<@${opponent.id}> ` `<@${interaction.user.id}>`,
            embeds: [embed],
            accepted: true
        })
    }
}