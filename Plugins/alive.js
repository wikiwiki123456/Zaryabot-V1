const { cmd } = require('../command');

cmd({
  pattern: 'alive',
  alias: ['botstatus', 'ping'],
  desc: 'Check if bot is alive',
  category: 'info',
  react: '✅',
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  const message = `🤖 Bot is online and ready to assist you!\n\n✨ Have a great day! ✨`;
  await reply(message);
});
