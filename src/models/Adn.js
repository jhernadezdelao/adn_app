import {Schema , model} from 'mongoose';

const adnSchema= new Schema({
    dna:String,
    mutant:Number,

},{
    timestamp:true,
    versionKey:false
})

export default model('Adn',adnSchema)