const { QueryTypes } = require('sequelize');
// const router = express.Router();
const sequelize = require('../config/db');
const { enviarMensajeWSP } = require("../config/inicializarWSP");

exports.sendWhatsapp = async(req,res)=>{
    try {
  
        const result = await sequelize.query(`SELECT TOP 50 [MSISDN] 
        FROM [Vassystem].[dbo].[Tb_Chat_tocustomer_onwhatsapp] where Status='0'
         group by [MSISDN]
  
        `, {
          type: QueryTypes.SELECT,
          timeout: 60000,
        });
    
        res.json(result);
      } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }

  exports.findAll = async(req,res)=>{
    try {
  
        const result = await sequelize.query(`	SELECT TOP 50 * 
        FROM [Vassystem].[dbo].[Tb_Chat_tocustomer_onwhatsapp] 
  
        `, {
          type: QueryTypes.SELECT,
          timeout: 60000,
        });
    
        res.json(result);
      } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }

  exports.envioController = async (req, res) => {
    // const { mensaje } = req.body;
  const mensaje="ສະບາຍດີປີໄໝ່"
    try {
      // Fetch the MSISDNs from the database
      const result = await sequelize.query(`
        SELECT TOP 50 [MSISDN]
        FROM [Vassystem].[dbo].[Tb_Chat_tocustomer_onwhatsapp]
        WHERE Status = '0'
        GROUP BY [MSISDN]
      `, {
        type: QueryTypes.SELECT,
        timeout: 60000,
      });
  
      // Extract MSISDNs from the result
      const numeros = result.map(row => row.MSISDN);
  
      if (!numeros || numeros.length === 0) {
        return res
          .status(400)
          .json({ mensaje: "No hay MSISDNs disponibles." });
      }
  
      const promises = numeros.map(async (numero) => {
        try {
          // Update the database record instead of sending a WhatsApp message
          await enviarMensajeWSP(numero, mensaje);
          
          // Mark the message as sent in the database
          await sequelize.query(`
            UPDATE Vassystem..Tb_Chat_tocustomer_onwhatsapp
            SET Status = '1', Chattime = GETDATE()
            WHERE MSISDN = ${numero} AND Status = '0'
          `, {
            type: QueryTypes.UPDATE,
            timeout: 60000,
          });
          console.log("numero:",numero);
          return { numero, mensajeEnviado: true };
        } catch (error) {
          console.error(`Error al enviar mensaje a ${numero}:`, error);
          return { numero, mensajeEnviado: false };
        }
      });
  
      const resultados = await Promise.all(promises);
  
      res.json({ resultados });
    } catch (error) {
      console.error("Error en el controlador de envío:", error);
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  };

  exports.envioControllers = async (req, res) => {
    // const { mensaje } = req.body;
  const mensaje="ສະບາຍດີປີໄໝ່"
    try {
      // Fetch the MSISDNs from the database
      const result = await sequelize.query(`
        SELECT TOP 50 [MSISDN]
        FROM [Vassystem].[dbo].[Tb_Chat_tocustomer_onwhatsapp]
        WHERE Status = '0'
        GROUP BY [MSISDN]
      `, {
        type: QueryTypes.SELECT,
        timeout: 60000,
      });
  
      // Extract MSISDNs from the result
      const numeros = result.map(row => row.MSISDN);
  
      if (!numeros || numeros.length === 0) {
        console.log("Phonenumber is entry")
        return res
      }
  
      const promises = numeros.map(async (numero) => {
        try {
          // Update the database record instead of sending a WhatsApp message
          await enviarMensajeWSP(numero, mensaje);
          
          // Mark the message as sent in the database
          await sequelize.query(`
            UPDATE Vassystem..Tb_Chat_tocustomer_onwhatsapp
            SET Status = '1', Chattime = GETDATE()
            WHERE MSISDN = ${numero} AND Status = '0'
          `, {
            type: QueryTypes.UPDATE,
            timeout: 60000,
          });
          console.log("numero:",numero);
          return { numero, mensajeEnviado: true };
        } catch (error) {
          console.error(`Error al enviar mensaje a ${numero}:`, error);
          return { numero, mensajeEnviado: false };
        }
      });
  
      const resultados = await Promise.all(promises);
  
      // res.json({ resultados });
    } catch (error) {
      console.error("Error en el controlador de envío:", error);
      res.status(500).json({ mensaje: "Error interno del servidor." });
    }
  };

  exports.showmessegeincmd = async(req,res)=>{
    try {
  
        console.log("hello world");
    
      } catch (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
