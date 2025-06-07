const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "owner",
  alias: ["creator", "dev"],
  desc: "Send owner contact",
  category: "info",
  react: "👤",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  try {
    await conn.sendContact(m.from, [ownerNumber], m);
    await m.React("✅");
  } catch (error) {
    console.error('Error sending owner contact:', error);
    reply('Error sending owner contact.');
    await m.React("❌");
  }
});
