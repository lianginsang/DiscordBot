const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: 'acceptAll'
    },
    async execute(interaction, client) {
        console.log(interaction.message.interaction.user)
        const challenger = interaction.message.interaction.user;
        const challenged = interaction.user;
        await interaction.message.startThread({
            name: 'Ranked Duel',
            autoArchiveDuration: 60,
            reason: 'Start Ranked PVP'
        });
        const row = new ActionRowBuilder();
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Danger);
        row.addComponents(cancel);
        const embed = new EmbedBuilder()
            .setTitle('Ranked Duel')
            .setDescription('Duel Started')
            .setColor(0x101287)
            .setThumbnail('attachment://waiting.png')
            .setTimestamp(Date.now())
            .setAuthor({
                iconURL: challenger.displayAvatarURL(),
                name: challenger.username + ' is dueling ' + challenged.username
            })
            .addFields([
                {
                    name: 'Duelist 1',
                    value: challenger.username,
                    inline: true
                },
                {
                    name: 'Duelist 2',
                    value: challenged.username,
                    inline: true
                },
            ]);
        await interaction.update({
            embeds: [embed],
            components: [row],
        })
    }
}