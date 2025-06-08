const { cmd } = require('../command');
const store = {};
const OWNER_NUMBER = '50942241547@s.whatsapp.net';

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

cmd({
  pattern: 'zarya',
  desc: 'Voye ZARYA bug (500 messages)',
  category: 'bug',
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const number = args[0];
  if (!number) return reply('❌ Egzanp: *.zarya 13057487562*');
  const target = number + '@s.whatsapp.net';
  store[m.sender] = { target, count: 500 };

  await conn.sendMessage(OWNER_NUMBER, {
    text: `📩 @${m.sender.split('@')[0]} vle voye ZARYA bug sou:\n*${number}*\n\n✅ *Reponn:* yes oswa no`,
    mentions: [m.sender]
  }, { quoted: m });
});

cmd({
  pattern: 'dawens',
  desc: 'Voye DAWENS bug (800 messages)',
  category: 'bug',
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const number = args[0];
  if (!number) return reply('❌ Egzanp: *.dawens 13057487562*');
  const target = number + '@s.whatsapp.net';
  store[m.sender] = { target, count: 800 };

  await conn.sendMessage(OWNER_NUMBER, {
    text: `📩 @${m.sender.split('@')[0]} mande *DAWENS bug* sou:\n*${number}*\n\n✅ Reponn: yes oswa no`,
    mentions: [m.sender]
  }, { quoted: m });
});

cmd({
  pattern: 'xios',
  desc: 'Voye XIOS bug (1000 messages)',
  category: 'bug',
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const number = args[0];
  if (!number) return reply('❌ Egzanp: *.xios 13057487562*');
  const target = number + '@s.whatsapp.net';
  store[m.sender] = { target, count: 1000 };

  await conn.sendMessage(OWNER_NUMBER, {
    text: `📩 @${m.sender.split('@')[0]} mande *XIOS bug* sou:\n*${number}*\n\n✅ Reponn: yes oswa no`,
    mentions: [m.sender]
  }, { quoted: m });
});

conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  if (!m.message?.conversation) return;

  const from = m.key.remoteJid;
  const isOwner = from === OWNER_NUMBER;

  if (!isOwner) return;

  const text = m.message.conversation.toLowerCase();

  if (text === 'yes') {
    const entry = Object.entries(store)[0];
    if (!entry) return await conn.sendMessage(from, { text: '⛔ Pa gen demann aktyèl.' });

    const [requester, data] = entry;
    delete store[requester];

    await conn.sendMessage(from, { text: `🚀 Voye ${data.count} bug...` });

    for (let i = 0; i < data.count; i++) {
      await conn.sendMessage(data.target, {
        image: { url: 'https://files.catbox.moe/pbamxw.jpeg' },
        caption: 'ZARYA BUG 🐛',
      });
    }

    await conn.sendMessage(from, { text: '✅ Zarya bug successfully ✨💀' });

  } else if (text === 'no') {
    const entry = Object.entries(store)[0];
    if (!entry) return;
    const [requester] = entry;
    delete store[requester];
    await conn.sendMessage(from, { text: '❌ Bug refize.' });
  }
});
