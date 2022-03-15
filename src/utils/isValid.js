function isValid(value) {
  const char = value.toUpperCase()
  if (char === 'A' || char === 'T' || char === 'C' || char === 'G') {
    return true
  }
  return false
}

module.exports = isValid