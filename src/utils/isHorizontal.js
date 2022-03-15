import  Mutation  from './mutation';

function isHorizontal(col, row, dna) {
  if(col < dna[row].length) {
    const char = dna[row].charAt(col).toUpperCase()
    let leftCount = 0
    let rightCount = 0
  
    if (dna[row].length >= 4) {
      // Left
      if ((col-1) >= 0) {
        for(let i = col-1; i >= 0; i--) {
          const leftChar = dna[row].charAt(i).toUpperCase()
  
          if (leftChar === char) {
            leftCount++
          } else {
            break
          }
        }
      }
  
      // Right
      if ((col+1) < dna[row].length) {
        for(let i = col+1; i < dna[row].length; i++) {
          const rightChar = dna[row].charAt(i).toUpperCase()

          if (rightChar === char) {
            rightCount++
          } else {
            break
          }
        }
      }
  
      const total = leftCount + rightCount + 1
      if (total >= 4) {
        Mutation.mutations.push([col, row]);
        for(let i = col+1; i <= col+rightCount; i++) {
          Mutation.mutations.push([i, row]);
        }
        return true
      }
    }
  }

  return false
}

module.exports = isHorizontal