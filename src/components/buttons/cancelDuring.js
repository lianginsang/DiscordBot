const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: 'cancelDuring'
    },
    async execute(interaction, client) {
        console.log(interaction)
        //need both players to cancel
        if (interaction.message.embeds[0].data.title.slice(-6) == 'cancel') {
            if (interaction.message.embeds[0].data.title !== `${interaction.user.username} is trying to cancel`) {
                await interaction.message.delete();
            } else {
                await interaction.reply({
                    content: 'Ranni will only cancel this if both of you agree to cancel.',
                    ephemeral: true
                });
            }
        } else {
            const challenger = interaction.message.interaction.user;
            const challenged = interaction.user;
            const row = new ActionRowBuilder();
            const cancel = new ButtonBuilder()
                .setCustomId('cancelDuring')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger);
            row.addComponents(cancel);
            const embed = new EmbedBuilder()
                .setTitle(`${interaction.user.username} is trying to cancel`)
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
}