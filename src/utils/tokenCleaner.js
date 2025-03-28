const { Op } = require('sequelize');
const UserSession = require('../models/userSessionModel')

const checkExpiredTokens = async () => {
  try {
    const now = new Date();
    const expiredSessions = await UserSession.findAll({
      where: {
        expires_at: { [Op.lt]: now }
      }
    });
    
    if(expiredSessions.length > 0){
      await Promise.all(expiredSessions.map(session => session.destroy()));
      console.log(`Foram removidos ${expiredSessions.length} tokens expirados.`);
    } else {
      console.log('Nenhum token expirado encontrado.');
    }
  } catch (error) {
    console.error('Erro ao verificar tokens expirados:', error);
  }
};

setInterval(checkExpiredTokens, 5 * 60 * 1000);
