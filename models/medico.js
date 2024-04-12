const {Schema, model} = require('mongoose');


const MedicoSchema = Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
});

MedicoSchema.method('toJSON', function(){
    const {_v,_id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Medico', MedicoSchema);