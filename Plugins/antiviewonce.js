const config = require('../config');

module.exports = async (m, conn) => {
  if (!m.message) return;
  if (!m.message.viewOnceMessage) return;

  const type = Object.keys(m.message.viewOnceMessage.message)[0];
  const content = m.message.viewOnceMessage.message[type];

  try {
    await conn.sendMessage(m.chat, content, { quoted: m });
  } catch (e) {
    console.error('Auto resend failed:', e);
  }
};
