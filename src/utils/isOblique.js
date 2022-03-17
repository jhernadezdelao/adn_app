const  Mutation =require('./mutation');

function isOblique(col, row, dna) {
  const char = dna[row].charAt(col).toUpperCase()
  let upCount = 0
  let downCount = 0

  if (dna[row].length >= 4 && dna.length >= 4) {
    // Up
    if (((col-1) >= 0) && ((row-1) >= 0)) {
      let i = col-1
      let j = row-1
      while (i >= 0 && j >= 0) {
        const upChar = dna[j].charAt(i).toUpperCase()

        if (upChar === char) {
          upCount++
        } else {
          break
        }

        i--
        j--
      }
    }
  
    // Down
    if(((col+1) < dna[row].length) && ((row+1) < dna.length)) {
      let i = col + 1
      let j = row + 1
      while(i < dna[row].length && j < dna.length) {
        const downChar = dna[j].charAt(i).toUpperCase()

        if (downChar === char) {
          downCount++
        } else {
          break
        }

        i++
        j++
      }
    }
  
    const total = upCount + downCount + 1
    if (total >= 4) {
      Mutation.mutations.push([col, row]);
      let i = col + 1
      let j = row + 1
      while(i <= col+downCount && j <= row+downCount) {
        Mutation.mutations.push([i, j]);
        i++
        j++
      }
      return true
    }
  }

  return false
}

module.exports = isOblique