const route= require('express').Router();
const controller = require('../controller/sendMessage');

route.get('/',controller.findAll)
route.post('/',controller.sendWhatsapp)
route.post('/sendmessege',controller.envioController)
route.post('/alertmessege',controller.envioControllers)
route.post('/show',controller.showmessegeincmd)

const intervalInMilliseconds = 1000; // 1 second in milliseconds
setInterval(async () => {
    try {
        await controller.envioControllers(null, null); // You may need to pass appropriate parameters if the function expects any
        console.log("Function executed every second");
    } catch (error) {
        console.error('Error executing function every second:', error);
    }
}, intervalInMilliseconds);
module.exports = route;