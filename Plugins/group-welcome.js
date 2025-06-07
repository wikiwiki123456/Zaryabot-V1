const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "welcome",
  alias: [],
  desc: "Enable or disable welcome & left messages in the group",
  category: "group",
  react: "👋",
  filename: __filename
},
async (conn, mek, m, { from, sender, isGroup, isAdmins, isBotAdmins, reply, body }) => {
  if (!isGroup) return reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");

  const groupMetadata = await conn.groupMetadata(from);
  const participants = groupMetadata.participants;
  const botNumber = await conn.decodeJid(conn.user.id);
  const botAdmin = participants.find(p => p.id === botNumber)?.admin;
  const senderAdmin = participants.find(p => p.id === sender)?.admin;

  if (!botAdmin) return reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");
  if (!senderAdmin) return reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");

  const prefix = config.PREFIX;
  const command = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = body.slice(prefix.length + command.length).trim();

  let responseMessage;
  if (text === 'on') {
    config.WELCOME = true;
    responseMessage = "WELCOME & LEFT messages have been enabled.";
  } else if (text === 'off') {
    config.WELCOME = false;
    responseMessage = "WELCOME & LEFT messages have been disabled.";
  } else {
    responseMessage = "Usage:\n- `" + prefix + "welcome on`: Enable welcome messages\n- `" + prefix + "welcome off`: Disable welcome messages";
  }

  await reply(responseMessage);
});
