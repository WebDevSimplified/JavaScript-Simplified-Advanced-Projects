export function randomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomValueInRange({
  startingValue,
  maxCutoff,
  withinTolerance,
  outsideTolerance,
}) {
  const ranges = validRanges({
    startingValue,
    maxCutoff,
    withinTolerance,
    outsideTolerance,
  })

  const range = ranges[randomNumber({ max: ranges.length - 1 })]
  return randomNumber(range)
}

function validRanges({
  startingValue,
  maxCutoff,
  withinTolerance,
  outsideTolerance,
}) {
  const withinToleranceIncrementor = Math.floor(maxCutoff * withinTolerance)
  const outsideToleranceIncrementor = Math.ceil(maxCutoff * outsideTolerance)
  const aboveRangeMin = startingValue + outsideToleranceIncrementor
  const aboveRangeMax = Math.min(
    startingValue + withinToleranceIncrementor,
    maxCutoff
  )
  const belowRangeMax = startingValue - outsideToleranceIncrementor
  const belowRangeMin = Math.max(startingValue - withinToleranceIncrementor, 0)

  const ranges = []
  if (aboveRangeMax > aboveRangeMin) {
    ranges.push({ min: aboveRangeMin, max: aboveRangeMax })
  }

  if (belowRangeMax > belowRangeMin) {
    ranges.push({ min: belowRangeMin, max: belowRangeMax })
  }

  return ranges
}
