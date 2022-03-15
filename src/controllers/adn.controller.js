import Adn from '../models/Adn'
import  isHorizontal  from '../utils/isHorizontal';
import  isVertical  from '../utils/isVertical';
import  isOblique  from '../utils/isOblique';
import  isObliqueInvert  from '../utils/isObliqueInvert';
import  isValid  from '../utils/isValid';
import  Mutation  from '../utils/mutation';

export const checkAdn= async (req, res)=>{
    console.log(req.body)
  
    let adn_temp = req.body.dna
    try {
        let dna = adn_temp.join("-");
        let mutant=0
        if(hasMutation(adn_temp)){
          mutant=1
            const _adn =new Adn({dna,mutant})
            const adnSaved =await _adn.save()
            res.status(200).json(_adn);
        }else{
          mutant=0
            const _adn =new Adn({dna,mutant})
            const adnSaved =await _adn.save()
            res.status(403).json(_adn);
        }
        
        
      } catch(err) {
        console.error(err.message)
        res.status(200).json(err.message);
      }
    return;
   
    
}
export const getAdn= async (req, res)=>{
    const dnaList =await Adn.aggregate([
        { "$facet": {
          "Total": [
            { "$match" : { "mutant": { "$exists": true }}},
            { "$count": "Total" },
          ],
          "count_mutations": [
            { "$match" : {"mutant": { "$exists": true, "$in": [1] }}},
            { "$count": "count_mutations" }
          ],
          "count_no_mutation": [
            { "$match" : {"mutant": { "$exists": true, "$in": [0] }}},
            { "$count": "count_no_mutation" }
          ]
        }},
        { "$project": {
          "Total": { "$arrayElemAt": ["$Total.Total", 0] },
          "count_mutations": { "$arrayElemAt": ["$count_mutations.count_mutations", 0] },
          "count_no_mutation": { "$arrayElemAt": ["$count_no_mutation.count_no_mutation", 0] },
        }}
      ])
      console.log(dnaList[0])
      dnaList[0]['ratio']=dnaList[0]['count_mutations']/dnaList[0]['count_no_mutation']
    res.status(200).json(dnaList);
}

function suma(a,b){
  return a+b;
}
function hasMutation(dna) {
    const rows = dna.length
    const cols = dna[0].length
    let mutationsCount = 0
  
    if ((rows >= 4) || (cols >= 4)) {
      dna.forEach((element, row) => {
        for(let col = 0; col < element.length; col++) {
          if (isValid(dna[row].charAt(col))) {
            if (!Mutation.existMutation([col, row])) {
              if (isHorizontal(col, row, dna) || isVertical(col, row, dna) || isOblique(col, row, dna) || isObliqueInvert(col, row, dna)) {
                mutationsCount++
              }
            }
          } else {
            throw new Error('Hay un caracter invalido, solo se permiten los siguientes caracteres: A, T, C, G')
          }
        }
      });
    }
  
    Mutation.resetData()
  
    if (mutationsCount >= 2) {
      return true
    }
  
    return false
  }
  