const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge')
        .setDescription('starts ranked pvp')
        .addUserOption((option) => option
            .setName('someone')
            .setDescription('choose player to challenge (optional)')
            .setRequired(false)),
    async execute(interaction, client) {
        let opponent = interaction.options.getUser('someone');
        let row = new ActionRowBuilder();
        let embed = new EmbedBuilder();
        //challenge anyone
        if (opponent === null) {
            const accept = new ButtonBuilder()
                .setCustomId('accept')
                .setLabel('Accept')
                .setStyle(ButtonStyle.Primary);
            const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger);
            row.addComponents(accept);
            row.addComponents(cancel);
            embed
                .setTitle('Ranked Duel')
                .setDescription('Duel will start once another player joins.')
                .setColor(0x101287)
                .setThumbnail('attachment://waiting.png')
                .setTimestamp(Date.now())
                .setAuthor({
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.username + ' started an open challenge.'
                })
                .addFields([
                    {
                        name: 'Duelist 1',
                        value: interaction.user.username,
                        inline: true
                    },
                    {
                        name: 'Duelist 2',
                        value: 'Waiting...',
                        inline: true
                    },
                ]);
            //challenge someone
        } else {
            //cant challenge self
            if (opponent.id === interaction.user.id) {
                //make sure challenge does not go up if this runs
                opponent = 'nope';
                await interaction.reply({
                    content: 'What do you plan to accomplish with this command?',
                    ephemeral: true
                })
            } else {
                const accept = new ButtonBuilder()
                    .setCustomId('accept')
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Primary);
                const cancel = new ButtonBuilder()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger);
                row.addComponents(accept);
                row.addComponents(cancel);
                embed
                    .setTitle('Ranked Duel')
                    .setDescription(`Duel will start once ${opponent.username} accepts.`)
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
            }
        }
        if (opponent != 'nope') {
            let write = null;
            if (opponent !== null) {
                write = `<@${opponent.id}>`
            }
            await interaction.reply({
                content: write,
                embeds: [embed],
                files: ['../src/waiting.png'],
                components: [row],
            })
        }
    }
}