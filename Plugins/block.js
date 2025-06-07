import { cmd } from "../command.js"; // ajiste path si sa nesesè
import config from '../config.cjs';

cmd({
  pattern: "block",
  desc: "Block a user from bot",
  react: '⛔',
  category: "owner",
  filename: __filename
}, async (bot, m, user, { text, args, q, prefix, command }) => {
  try {
    const botNumber = await bot.decodeJid(bot.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);

    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");

    let users = m.mentionedJid?.[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    if (!users.includes('@s.whatsapp.net')) return m.reply("*❌ Invalid or missing user mention.*");

    await bot.updateBlockStatus(users, 'block')
      .then(() => m.reply(`✅ Blocked ${users.split('@')[0]} successfully.`))
      .catch((err) => m.reply(`❌ Failed to block user: ${err}`));
  } catch (error) {
    console.error(error);
    m.reply('⚠️ An error occurred while processing the command.');
  }
});
