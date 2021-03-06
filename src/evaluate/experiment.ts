import { filter, isNil, isObject } from "lodash"
import GameField, { experimentChoices } from "../logic/map"
import Street from "../logic/street"
import randomNum from "../randomNum"
import evaluateMap, { IMapEvaluationResults } from "./map"

export interface IExperimentResult {
  experimentType: number
  results: IMapEvaluationResults
  otherSettings?: any
}

export interface IExperimentSettings {
  deathInfluencesDecay?: boolean
  spawnAmount?: number
  decayStrength?: number
  increaseStrength?: number
}

/**
 * Finish condition can be amount of ants that reach target
 * plot tick amount vs dead ants
 * experimentparams: vaporincrease and vapor decrease on death
 */

export type GamefieldCreator = () => GameField

const makeExperimentForMap = (mapCreator: GamefieldCreator, otherSettings?: any) => {
  const untypedChoices: any = experimentChoices
  const results: IExperimentResult[] = []
  // for (const choiceIndex in experimentChoices) {
  //   const choice = untypedChoices[choiceIndex]
  const mapInstance: any = mapCreator()
  if (!isNil(otherSettings)) {
    for (const key in otherSettings) {
      mapInstance[key] = otherSettings[key]
    }
  }
  results.push({
    experimentType: otherSettings.experimentType,
    results: evaluateMap(mapInstance),
    otherSettings
  })
  // }
  return results
}

const runExperimentMultipleTimes =
  (mapCreator: GamefieldCreator, otherSettings?: any, amountOfRuns: number = 1) => {
  const finalResults: IExperimentResult[] = []
  for (let i = 0; i < amountOfRuns; i++) {
    const res = makeExperimentForMap(mapCreator, otherSettings)
    for (const a of res) {
      finalResults.push(a)
    }
  }
  return Promise.resolve(finalResults)
}

export default runExperimentMultipleTimes
