const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app-mechanical-management', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is COnnect'))
    .catch(err => console.error(err));

    // COnfiguracion y Funcionamiento de la DB