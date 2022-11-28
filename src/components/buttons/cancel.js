
module.exports = {
    data: {
        name: 'cancel'
    },
    async execute(interaction, client) {
        await interaction.message.delete();
    }
}