const { cmd } = require('../command');

cmd({
  pattern: "typing",
  alias: [],
  desc: "Make the bot show typing status",
  category: "fun",
  react: "✍️",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    await conn.sendPresenceUpdate('composing', from);
    reply("Typing...");
  } catch (err) {
    console.error("Typing error:", err);
    reply("❌ Failed to update typing status.");
  }
});
