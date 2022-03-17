const {Schema , model} =require ('mongoose');

const adnSchema= new Schema({
    dna:String,
    mutant:Number,

},{
    timestamp:true,
    versionKey:false
})

module.exports=model('Adn',adnSchema)