const mongoose = require('mongoose');

const  clientOptions = {
    useNewUrlParser : true,
    dbName : 'API-ppr2'
};

/**
 * Permet a l'api de ce connecter a mongodb
 * @async
 */
exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}