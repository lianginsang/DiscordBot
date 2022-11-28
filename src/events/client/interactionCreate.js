
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: "Ranni cannot do this for you.",
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error('Button has not been implemented');
            const challenger = interaction.message.interaction.user;
            const challenged = interaction.user;
            //cant challenge self
            if (challenger === challenged && interaction.customId == 'accept') {
                await interaction.reply({
                    content: "Foolish tarnish, you cannot accept ones own challenge.",
                    ephemeral: true
                });
            } else if (interaction.customId == 'accept') {
                const someoneCheck = interaction.message.content;
                //cant accept someone elses challenge
                if (someoneCheck !== '') {
                    if (challenged.id != someoneCheck.substring(2, someoneCheck.length - 1)) {
                        await interaction.reply({
                            content: `You cannot fool Ranni, you are not <@${someoneCheck.substring(2, someoneCheck.length - 1)}>`,
                            ephemeral: true
                        });
                    } else {
                        try {
                            await button.execute(interaction, client);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                } else {
                    try {
                        await button.execute(interaction, client);
                    } catch (err) {
                        console.error(err);
                    }
                }
            } else {
                try {
                    await button.execute(interaction, client);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}