const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth ,LegacySessionAuth} = require('whatsapp-web.js');

let client= null;

const inicializarWSP = async () =>{

     client = new Client({
        puppeteer:{
            headless:false,
        },
        authStrategy: new LocalAuth({
            clientId: "client-one" 
        })
    });

        client.on('ready', () => {
            console.log('Client is ready!');
       
                    });
                    
                                    
                                   await client.initialize();
                                }
                                    const enviarMensajeWSP = async(numero,mensaje)=>{
                                        try {
                                            numero = numero + '@c.us'
                                            const respuesta = await client.sendMessage(numero,mensaje)
                                            return respuesta
                                        } catch (error) {
                                            const mensajeError=`Error al enviar mensaje a ${numero}`
                                            console.error(mensajeError,error)
                                            throw new Error(mensajeError)
                                        }
                                    }
                               
module.exports = {
    inicializarWSP,
    enviarMensajeWSP,
};
