import { cloneDeep, filter, isNil, isObject } from "lodash"
import GameField, { experimentChoices } from "../logic/map"
import Street from "../logic/street"
import randomNum from "../randomNum"
import runExperimentMultipleTimes, { GamefieldCreator, IExperimentResult } from "./experiment"
import evaluateMap, { IMapEvaluationResults } from "./map"

const tryoutAllSettings =
  async (mapCreator: GamefieldCreator, settingsToTry: any, amountOfRuns: number = 1, dontMakeMean?: boolean) => {
  const finalResults: IExperimentResult[] = []
  const includeDeath = [false, true]
  const totalAmount = 2 * settingsToTry.length
  let currentlyAt = 0
  console.log(`starting to try out ${totalAmount} experiments`)
  for (const deathInfluencesDecay of includeDeath) {
    for (const setting of settingsToTry) {
      const settingToUse = cloneDeep(setting)
      settingToUse.deathInfluencesDecay = deathInfluencesDecay
      console.log("about to try out", setting)
      const res = await runExperimentMultipleTimes(mapCreator, settingToUse, amountOfRuns)
      if (dontMakeMean) {
        for (const a of res) {
          finalResults.push(a)
        }
      } else {
        let tickAmount = 0
        let deadAntPercentage = 0
        let spawnedAnts = 0
        let deadAnts = 0
        let antsThatReachedTarget = 0
        let runtime = 0
        for (const a of res) {
          runtime += a.results.runtime
          tickAmount += a.results.tickAmount
          deadAntPercentage += a.results.deadAntPercentage
          spawnedAnts += a.results.spawnedAnts
          deadAnts += a.results.deadAnts
          antsThatReachedTarget += a.results.antsThatReachedTarget
        }
        tickAmount = tickAmount / res.length
        deadAntPercentage = deadAntPercentage / res.length
        spawnedAnts = spawnedAnts / res.length
        deadAnts = deadAnts / res.length
        antsThatReachedTarget = antsThatReachedTarget / res.length
        finalResults.push({
          experimentType: res[0].experimentType,
          otherSettings: settingToUse,
          results: {
            tickAmount, deadAntPercentage, deadAnts, antsThatReachedTarget, spawnedAnts, runtime
          }
        })
      }
      currentlyAt++
      console.log(`tried out ${(currentlyAt / totalAmount) * 100}%`)
    }
  }
  return finalResults
}

export default tryoutAllSettings
