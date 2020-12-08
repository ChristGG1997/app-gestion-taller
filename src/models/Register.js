const mongoose = require('mongoose');
const { Schema } = mongoose;

// Creacion de la tabla. se resalta que como se uso mongodb se iran creando las filas mediante se vayan utilizando.
const RegisterSchema =  new Schema({
    codigoTrabajo: { type: String, required: true },
    horasReg: { type: Number, required: true },
    descripcion: { type: String, required: true},
    horasLab: { type: Number },
    estado: { type: String },
    costoPieza: { type: Number },
    costoPintura: { type: Number },
    costoRevision: { type: Number },
    costoReparacionMecanica: { type: Number },
    costoReparacionLotoneria: { type: Number },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Register', RegisterSchema);