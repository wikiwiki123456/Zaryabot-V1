const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "setprefix",
  alias: [],
  desc: "Change the bot command prefix (owner only)",
  category: "owner",
  react: "⚙️",
  filename: __filename
},
async (conn, mek, m, { body, reply }) => {
  const botNumber = await conn.decodeJid(conn.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  if (!isCreator) return reply("*📛 THIS IS AN OWNER COMMAND*");

  const prefix = config.PREFIX;
  const command = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = body.slice(prefix.length + command.length).trim();

  if (!text) return reply("Please specify a new prefix.");

  config.PREFIX = text;
  reply(`✅ Prefix has been changed to '${text}'.`);
});
