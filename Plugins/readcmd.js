const { cmd } = require('../command');

cmd({
  pattern: "readcmd",
  alias: ["read", "seen"],
  desc: "Mark message as read",
  category: "fun",
  react: "👀",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    await conn.sendReadReceipt(from, m.sender, [m.key.id]);
    reply("Marked as read.");
  } catch (err) {
    console.error("Read error:", err);
    reply("❌ Failed to mark as read.");
  }
});
