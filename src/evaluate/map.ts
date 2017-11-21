import { filter } from "lodash"
import GameField from "../logic/map"
import Street from "../logic/street"
import randomNum from "../randomNum"

const testSatisified = (target: number, relevantStreets: Street[]) => {
  let satisifed = true
  for (const street of relevantStreets) {
    if (target > street.pheromoneLevel) {
      satisifed = false
    }
  }
  return satisifed
}

const evaluateMap = (mapCreator: () => GameField, pheromoneTarget: number) => {
  const mapInstance = mapCreator()
  const targetStreets = filter(mapInstance.streetList, (street) => street.relevantEvaluationTarget)

  const start = Date.now()
  while (!testSatisified(pheromoneTarget, targetStreets)) {
    mapInstance.spawnNewAnt(randomNum(5, mapInstance.spawnThreshold))
    mapInstance.processTick()
  }
  const deadAntPercentage = mapInstance.amountOfDeadAnts / mapInstance.amountOfSpawnedAnts
  return {
    calcTime: Date.now() - start,
    tickAmount: mapInstance.currentTick,
    deadAntPercentage,
    spawnedAnts: mapInstance.amountOfSpawnedAnts,
    deadAnts: mapInstance.amountOfDeadAnts
  }
}

export default evaluateMap
