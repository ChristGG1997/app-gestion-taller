const express = require('express');
const router = express.Router();

const Register = require('../models/Register');

router.get('/', (req, res) => {
    res.render('home'); //Renderizado home
});

router.get('/register', (req, res) => {
    res.render('register'); // Renderizado regristro de trabajos
});


// Funcion para registrar los trabajos
router.post('/register', async (req, res) => {
    const { codigoTrabajo, horasReg, descripcion } = req.body;
    // Para que marque en pantalla si se tiene un error en la registracion
    const errors = [];
    if(!codigoTrabajo) {
        errors.push({text: 'Tiene que elegir una opcion'})
    }
    if(!horasReg) {
        errors.push({text: 'La casilla de Hora reglamentada no puede quedar vacia'})
    }
    if(!descripcion) {
        errors.push({text: 'La casilla de Descripcion no puede quedar vacia'})
    }
    if(errors.length > 0) {
        res.render('register', {
            errors,
            codigoTrabajo,
            horasReg,
            descripcion
        })
    } else {
        // Se requiere todo el cuerpo y se guarda en la DB 
        const newRegister = new Register({ codigoTrabajo, horasReg, descripcion });
        await newRegister.save();
        res.redirect('/views')
    }
});

router.get('/views', async (req, res) => {
    const register = await Register.find().lean(); // Para poder mostrar los datos de ls DB
    res.render('views', { register });

});


// para visualizar cada trabajo por su id por separado
router.get('/edit/:id', async (req, res) => {
    const register = await Register.findById(req.params.id).lean();
    res.render('edit', { register });
})


// Funcion para actualizar los datos y agregar los restantes
router.put('/edit-t/:id', async (req, res) => {
    const { horasReg, descripcion, horasLab, estado, costoPieza, costoPintura, costoRevision} = req.body;
    await Register.findByIdAndUpdate(req.params.id, { horasReg, descripcion, horasLab, estado, costoPieza, costoPintura, costoRevision });
    res.redirect('/views');
})

// Funcion para calcular cotizaciones
router.post('/edit-t/:id', async (req, res) => {
    const register = await Register.findById(req.params.id).lean();

    // calcular fijo
    let fijo = register.horasReg * 50000;

    // calcular reparacion mecanica
    let mecanica = fijo + register.costoPieza * 1.1;

    // calcular reaparacion pintura
    let pintura = fijo + + register.costoPintura * 1.3;

    // calcular revision
    let revision = fijo + (register.horasLab * 30000);

    res.render('edit', {register, fijo, mecanica, pintura, revision});
})

// Funcion para borrar los trabajos
router.delete('/delete/:id', async (req, res) => {
    await Register.findByIdAndDelete(req.params.id);
    res.redirect('/views');
})


module.exports = router;