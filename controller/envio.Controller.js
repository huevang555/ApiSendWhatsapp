const { enviarMensajeWSP } = require("../config/inicializarWSP");

const envioController = async (req, res) => {
    const { numeros, mensaje } = req.body;

    try {
        if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
            return res.status(400).json({ mensaje: "Por favor, proporcione un array de números." });
        }

        const promises = numeros.map(async (numero) => {
            try {
                await enviarMensajeWSP(numero, mensaje);
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

module.exports = {
    envioController,
};
