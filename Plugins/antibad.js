const { cmd } = require('../command');

cmd({
  pattern: 'antibad',
  alias: ['antispam', 'antitoxic'],
  desc: 'Detect and warn for bad words in group chat',
  category: 'group',
  react: '⚠️',
  filename: __filename
},
async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, reply }) => {
  if (!isGroup) return reply('This command works only in groups.');
  if (!isAdmins) return reply('Only group admins can use this command.');
  if (!isBotAdmins) return reply('Bot must be an admin.');

  const badWords = [
    "idiot",
    "stupid",
    "bb",
    "fool",
    "bastard",
    "moron",
    "çava",
    "shit",
    "damn",
    "hello",
    "bitch",
    "salut",
    "pussy",
    "mdr",
    "chen",
    "gyet mmw",
    "piss off",
    "twat",
    "langyet manmanw"
  ];
  const text = (m.text || '').toLowerCase();

  for (const word of badWords) {
    if (text.includes(word)) {
      return reply(`⚠️ Please avoid using inappropriate language.`);
    }
  }
});
