const {Schema, model} = require('mongoose');


const HospitalSchema = Schema({

    name:{
        type: String,
        required: true,
        unique: true

    },
    image:{
        type: String,
        default: 'HOSPITAL_IMAGE.png'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

HospitalSchema.method('toJSON', function(){
    const {_v,_id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Hospital', HospitalSchema);