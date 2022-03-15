
import  Mutation  from './mutation';

function isVertical(col, row, dna) {
  if (row < dna.length) {
    const char = dna[row].charAt(col).toUpperCase()
    let topCount = 0
    let bottomCount = 0
  
    if (dna.length >= 4) {
      // Top
      if ((row-1) >= 0) {
        for(let i = row-1; i >= 0; i--) {
          const topChar = dna[i].charAt(col).toUpperCase()

          if (topChar === char && topCount < 3) {
            topCount++
          } else {
            break
          }
        }
      }

      // Bottom
      if((row+1) < dna.length) {
        for(let i = row+1; i < dna.length; i++) {
          const bottomChar = dna[i].charAt(col).toUpperCase()

          if (bottomChar === char && topCount< 3) {
            bottomCount++
          } else {
            break
          }
        }
      }

      const total = topCount + bottomCount + 1
      if (total >= 4) {
        Mutation.mutations.push([col, row]);
        for(let j = row+1; j <= row+bottomCount; j++){
          Mutation.mutations.push([col, j]);
        }
        return true
      }
    }
  }

  return false
}

module.exports = isVertical