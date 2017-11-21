import { filter, isNil, isObject } from "lodash"
import GameField, { experimentChoices } from "../logic/map"
import Street from "../logic/street"
import randomNum from "../randomNum"
import runExperimentMultipleTimes, { GamefieldCreator, IExperimentResult } from "./experiment"
import evaluateMap, { IMapEvaluationResults } from "./map"

const tryoutAllSettings =
  async (mapCreator: GamefieldCreator, target: number, amountOfRuns: number = 1) => {
  const finalResults: IExperimentResult[] = []
  const includeDeath = [false, true]
  const spawnAmounts = [3, 6, 12, 20, 40]
  const decayStrengths = [0.00025, 0.0025, 0.025]
  const increaseStrengths = [0.0001, 0.001, 0.01]
  const totalAmount = 2 * 5 * 3 * 3
  let currentlyAt = 0
  for (const deathInfluencesDecay of includeDeath) {
    for (const spawnAmount of spawnAmounts) {
      for (const decayStrength of decayStrengths) {
        for (const increaseStrength of increaseStrengths) {
          const res = await runExperimentMultipleTimes(mapCreator, target, {
            deathInfluencesDecay, spawnAmount, decayStrength, increaseStrength
          }, amountOfRuns)
          for (const a of res) {
            finalResults.push(a)
          }
          currentlyAt++
          console.log(`tried out ${(currentlyAt / totalAmount) * 100}%`)
        }
      }
    }
  }
  return finalResults
}

export default tryoutAllSettings
