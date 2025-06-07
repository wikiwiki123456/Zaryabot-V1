const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "remove",
  alias: ["kick", "ban"],
  desc: "Remove mentioned or replied user(s) from group (admin only)",
  category: "group",
  react: "👢",
  filename: __filename
},
async (conn, mek, m, { body, reply, isGroup, isAdmins, isBotAdmins }) => {
  if (!isGroup) return reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");
  if (!isAdmins) return reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");
  if (!isBotAdmins) return reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");

  const prefix = config.PREFIX;
  const command = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = body.slice(prefix.length + command.length).trim();

  let users = [];

  if (m.mentionedJid && m.mentionedJid.length) {
    users = m.mentionedJid;
  } else if (m.quoted && m.quoted.participant) {
    users.push(m.quoted.participant);
  } else if (text) {
    const userId = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    users.push(userId);
  } else {
    return reply("*📛 PLEASE MENTION OR QUOTE A USER TO KICK*");
  }

  try {
    await conn.groupParticipantsUpdate(m.from, users, 'remove');
    const kickedNames = users.map(u => `@${u.split('@')[0]}`);
    reply(`*USERS ${kickedNames.join(', ')} KICKED SUCCESSFULLY FROM THE GROUP*`, { mentions: users });
  } catch (error) {
    console.error(error);
    reply("❌ Failed to kick user(s) from the group.");
  }
});
