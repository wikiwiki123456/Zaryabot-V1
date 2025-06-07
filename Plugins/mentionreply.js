const { cmd } = require('../command');

cmd({
  pattern: 'mentionreply',
  alias: ['mr'],
  desc: 'Reply with a mention to the sender',
  category: 'fun',
  react: '💬',
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  try {
    const mention = m.sender;
    const message = `Hello @${mention.split('@')[0]}, how can I help you?`;

    await conn.sendMessage(m.from, {
      text: message,
      mentions: [mention]
    }, { quoted: m });

  } catch (error) {
    console.error('Error in mentionreply command:', error);
    reply('❌ Failed to send mention reply.');
  }
});
