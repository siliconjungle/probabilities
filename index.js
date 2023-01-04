const factorial = (x) => {
  let result = 1
  for (let i = 2; i <= x; i++) {
    result *= i
  }
  return result
}

const probability = (n, k) => k / n

const combinations = (n, k) => factorial(n) / (factorial(k) * factorial(n - k))

const permutations = (n, k) => factorial(n) / factorial(n - k)

const hypergeometricProbability = (nSuccesses, populationSize, sampleSize, successesInPopulation) =>
  combinations(successesInPopulation, nSuccesses) * combinations(populationSize - successesInPopulation, sampleSize - nSuccesses) / combinations(populationSize, sampleSize)

const hypergeometricProbabilityRange = (minSuccesses, maxSuccesses, populationSize, sampleSize, successesInPopulation) => {
  let probability = 0
  for (let i = minSuccesses; i <= maxSuccesses; i++) {
    probability += hypergeometricProbability(i, populationSize, sampleSize, successesInPopulation)
  }
  return probability
}

const hypergeometricProbabilities = (data) => {
  let probability = 1
  for (let i = 0; i < data.length; i++) {
    const { minSuccesses, maxSuccesses, populationSize, sampleSize, successesInPopulation } = data[i]
    probability *= hypergeometricProbabilityRange(minSuccesses, maxSuccesses, populationSize, sampleSize, successesInPopulation)
  }

  return probability
}

const openingHands = combinations(108, 10)
console.log('opening hands', openingHands)

const openingPermutations = permutations(108, 10)
console.log('opening permutations', openingPermutations)

const probabilityAnyWilds = hypergeometricProbabilityRange(1, 8, 108, 10, 8)
console.log('probability of drawing any wilds', probabilityAnyWilds * 100)

const probabilityPhase8SingleColor = hypergeometricProbabilityRange(7, 10, 108, 10, 32)
const probabilityPhase8 = probabilityPhase8SingleColor * 4

console.log('probability of drawing phase 8', probabilityPhase8 * 100)

const probabilitySpecificColor = probability(108, 32)
console.log('probability of drawing a specific color', probabilitySpecificColor * 100)

const probabilitySpecificNumber = probability(108, 8)
console.log('probability of drawing a specific number', probabilitySpecificNumber * 100)

const probabilitySpecificNumberLate = probability(58, 2)
console.log('probability of drawing a specific number late', probabilitySpecificNumberLate * 100)

const probabilitySpecificNumberTwice = probability(108, 8) * probability(107, 7)
console.log('probability of drawing a specific number twice', probabilitySpecificNumberTwice * 100)
