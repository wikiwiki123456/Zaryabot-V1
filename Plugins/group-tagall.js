const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "tagall",
  alias: ["everyone", "mentionall"],
  desc: "Tag all group members with a custom message",
  category: "group",
  react: "📢",
  filename: __filename
},
async (conn, mek, m, {
  from, sender, isGroup, isAdmins, isBotAdmins, reply, body, participants
}) => {
  if (!isGroup) return reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");
  if (!isAdmins) return reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");
  if (!isBotAdmins) return reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");

  const prefix = config.PREFIX;
  const command = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = body.slice(prefix.length + command.length).trim();
  let message = `乂 *Attention Everyone* 乂\n\n*Message:* ${text || 'come text in the group guys ✨❤️‍🩹'}\n\n`;

  for (let p of participants) {
    message += `❒ @${p.id.split('@')[0]}\n`;
  }

  await conn.sendMessage(from, {
    text: message,
    mentions: participants.map(p => p.id)
  }, { quoted: mek });
});
