const { cmd } = require('../command');

cmd({
  pattern: 'recording',
  alias: ['rec', 'typing'],
  desc: 'Show typing or recording status',
  category: 'fun',
  react: '🎙️',
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    await conn.sendPresenceUpdate('recording', from);

    setTimeout(async () => {
      await conn.sendPresenceUpdate('paused', from);
      reply('Recording simulation finished 🎙️');
    }, 5000);

  } catch (error) {
    console.error('Error in recording command:', error);
    reply('❌ Failed to show recording status.');
  }
});
