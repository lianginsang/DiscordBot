
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
            if (challenger === challenged) {
                await interaction.reply({
                    content: "Foolish tarnish, you cannot accept ones own challenge.",
                    ephemeral: true
                });
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