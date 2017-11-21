import { filter, isNil, isObject } from "lodash"
import GameField, { experimentChoices } from "../logic/map"
import Street from "../logic/street"
import randomNum from "../randomNum"
import evaluateMap, { IMapEvaluationResults } from "./map"

export interface IExperimentResult {
  experimentType: number
  results: IMapEvaluationResults
}

export interface IExperimentSettings {
  deathInfluencesDecay?: boolean
  spawnAmount?: number
  decayStrength?: number
  increaseStrength?: number
}

export type GamefieldCreator = () => GameField

const makeExperimentForMap = (mapCreator: GamefieldCreator, target: number, otherSettings?: any) => {
  const untypedChoices: any = experimentChoices
  const results: IExperimentResult[] = []
  for (const choiceIndex in experimentChoices) {
    const choice = untypedChoices[choiceIndex]
    const mapInstance: any = mapCreator()
    mapInstance.experimentType = choice
    if (!isNil(otherSettings)) {
      for (const key in otherSettings) {
        mapInstance[key] = otherSettings[key]
      }
    }
    results.push({experimentType: choice, results: evaluateMap(mapInstance, target)})
  }
  return results
}

const runExperimentMultipleTimes =
  (mapCreator: GamefieldCreator, target: number, otherSettings?: any, amountOfRuns: number = 1) => {
  const finalResults: IExperimentResult[] = []
  for (let i = 0; i < amountOfRuns; i++) {
    const res = makeExperimentForMap(mapCreator, target, otherSettings)
    for (const a of res) {
      finalResults.push(a)
    }
  }
  return Promise.resolve(finalResults)
}

export default runExperimentMultipleTimes
