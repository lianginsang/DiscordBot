const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge_someone')
        .setDescription('starts ranked pvp')
        .addUserOption((option) => option
            .setName('someone')
            .setDescription('choose player to challenge')
            .setRequired(true)),
    async execute(interaction, client) {
        const opponent = interaction.options.getUser('someone');
        const accept = new ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Accept')
            .setStyle(ButtonStyle.Primary);
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Danger);
        const row = new ActionRowBuilder();
        row.addComponents(accept);
        row.addComponents(cancel);
        const embed = new EmbedBuilder()
            .setTitle('Ranked Duel')
            .setDescription('Duel will start once both players join.')
            .setColor(0x101287)
            .setThumbnail('attachment://waiting.png')
            .setTimestamp(Date.now())
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.username + ' is challenging ' + opponent.username
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
        await interaction.reply({
            content: `<@${opponent.id}>`,
            embeds: [embed],
            files: ['../src/waiting.png'],
            components: [row],
        })
    }
}