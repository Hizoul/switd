import GameField from "./map"
/**
 * 1. Amount of survived ants
 * 2. Damage Dealt
 * 3. Metric on how fast optimal distribution was reached ()
 */

const evaluateGameField = (gameField: GameField, maxNumTicks: number, spawnThreshold: number = 20) => {
  let maximumAverageDistance = 0
  let maxReachedAfterSteps = 0
  for (let i = 0; i < maxNumTicks; i++) {
    gameField.spawnNewAnt(spawnThreshold)
    gameField.processTick()
    // intersection points to compare
    let totalDistance = 0
    for (const intersection of gameField.intersectionList) {
      const distance = Math.abs(intersection.beginning.pheromoneLevel - intersection.target.pheromoneLevel)
      totalDistance += distance
    }
    const averageDistance = totalDistance / gameField.intersectionList.length
    if (maximumAverageDistance < averageDistance) {
      maxReachedAfterSteps = i
      maximumAverageDistance = averageDistance
    }
  }
  const amountOfSurvivedAnts = gameField.getTarget().currentVisitors.length
  const amountOfDamageDealt = gameField.totalDamageDealt
  console.log(`evaluation done we have ${amountOfSurvivedAnts} ${amountOfDamageDealt}
    and the best distance was reached after ${maxReachedAfterSteps} ${maximumAverageDistance}`)
  return {
    amountOfSurvivedAnts, amountOfDamageDealt, maximumAverageDistance, maxReachedAfterSteps
  }
}

export default evaluateGameField
