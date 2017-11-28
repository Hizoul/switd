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

export interface IMapEvaluationResults {
  runtime: number
  tickAmount: number
  deadAntPercentage: number
  spawnedAnts: number
  deadAnts: number
  antsThatReachedTarget: number
}

const evaluateMap = (mapInstance: GameField, pheromoneTarget: number, maxTicks: number = 50) => {
  const start = Date.now()
  outOfWhile:
  while (!testSatisified(pheromoneTarget, mapInstance.streetList)) {
    mapInstance.spawnNewAnt(randomNum(5, mapInstance.spawnThreshold))
    mapInstance.processTick()
    if (mapInstance.currentTick > maxTicks) {
      break outOfWhile
    }
  }
  const deadAntPercentage = mapInstance.amountOfDeadAnts / mapInstance.amountOfSpawnedAnts
  const res: IMapEvaluationResults = {
    runtime: Date.now() - start,
    tickAmount: mapInstance.currentTick,
    deadAntPercentage,
    spawnedAnts: mapInstance.amountOfSpawnedAnts,
    deadAnts: mapInstance.amountOfDeadAnts,
    antsThatReachedTarget: mapInstance.getTarget().currentVisitors.length
  }
  return res
}

export default evaluateMap
