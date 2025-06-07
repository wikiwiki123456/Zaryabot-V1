import config from '../config.cjs';

const antilinkkick = async (m, gss) => {
  try {
    if (!m.isGroup || !m.from || !m.text) return;

    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botNumber = await gss.decodeJid(gss.user.id);
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (!botAdmin || senderAdmin) return;

    const linkPattern = /(https?:\/\/)?(www\.)?(chat\.whatsapp\.com)\/[A-Za-z0-9]+/i;
    if (linkPattern.test(m.text)) {
      await gss.groupParticipantsUpdate(m.from, [m.sender], 'remove');
      await gss.sendMessage(m.from, { text: `User @${m.sender.split('@')[0]} was removed for sharing a group link.`, mentions: [m.sender] });
    }
  } catch (e) {
    console.error(e);
  }
};

export default antilinkkick;
