
module.exports = {
    data: {
        name: 'cancel'
    },
    async execute(interaction, client) {
        const check1 = interaction.message.interaction.user;
        const check2 = interaction.user;
        if (check1 === check2) {
            await interaction.message.delete();
        } else {
            await interaction.reply({
                content: 'Tarnish, this challenge is not yours to cancel.',
                ephemeral: true
            })
        }
    }
}