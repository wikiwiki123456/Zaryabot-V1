const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "unblock",
  alias: [],
  desc: "Unblock a user from blocking list (owner only)",
  category: "owner",
  react: "🔓",
  filename: __filename
},
async (conn, mek, m, { body, reply }) => {
  const botNumber = await conn.decodeJid(conn.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  if (!isCreator) return reply("*📛 THIS IS AN OWNER COMMAND*");

  const prefix = config.PREFIX;
  const command = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = body.slice(prefix.length + command.length).trim();

  let userToUnblock;

  if (m.mentionedJid && m.mentionedJid.length > 0) {
    userToUnblock = m.mentionedJid[0];
  } else if (m.quoted) {
    userToUnblock = m.quoted.sender;
  } else if (text) {
    userToUnblock = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  } else {
    return reply("Please mention a user or reply to their message to unblock.");
  }

  try {
    await conn.updateBlockStatus(userToUnblock, 'unblock');
    reply(`🔓 Successfully unblocked @${userToUnblock.split('@')[0]}`, { mentions: [userToUnblock] });
  } catch (error) {
    console.error(error);
    reply("❌ Failed to unblock the user.");
  }
});
