
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const token = process.env.DISCORD_TOKEN;
const clientId = "1537876758093758514";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Testa se o Meta Bot está funcionando")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Registrando comandos...");

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );

    console.log("Comando /ping registrado!");
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Meta Bot conectado como ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong! O Meta Bot está funcionando!");
  }
});

client.login(token);
