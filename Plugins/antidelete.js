const { cmd } = require('../command');

cmd({
  pattern: 'antidelete',
  alias: ['antilog', 'undelete'],
  desc: 'Enable or disable anti-delete messages in group',
  category: 'group',
  react: '🛡️',
  filename: __filename
},
async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, reply, args }) => {
  if (!isGroup) return reply('This command can only be used in groups.');
  if (!isAdmins) return reply('Only group admins can use this command.');
  if (!isBotAdmins) return reply('Bot must be an admin.');

  const setting = args[0] && args[0].toLowerCase();

  if (setting !== 'on' && setting !== 'off') {
    return reply('Usage: antidelete on/off');
  }

  if (!conn.antideleteSettings) conn.antideleteSettings = {};

  conn.antideleteSettings[m.from] = (setting === 'on');

  reply(`Anti-delete is now *${setting === 'on' ? 'enabled' : 'disabled'}* in this group.`);
});

conn.ev.on('message.delete', async (message) => {
  const { key, message: deletedMessage } = message;
  const chatId = key.remoteJid;

  if (!conn.antideleteSettings) return;
  if (!conn.antideleteSettings[chatId]) return;

  if (deletedMessage && deletedMessage.conversation) {
    await conn.sendMessage(chatId, {
      text: `Message deleted by @${key.participant ? key.participant.split('@')[0] : 'unknown'}:\n${deletedMessage.conversation}`
    }, { mentions: [key.participant], ephemeral: false });
  }
});
