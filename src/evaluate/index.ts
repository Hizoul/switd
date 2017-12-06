import * as fs from "fs"
import { map, merge } from "lodash"
import { mkdir } from "shelljs"
import { experimentChoices } from "../logic/map"
import { createMap as mirroredwithtower } from "../maps/experiment/mirroredWithTower"
import { createMap } from "../maps/experiment/shortAndLong"
import { createMap as shortTowersAndLongMap } from "../maps/experiment/shortTowersAndLong"
import { createMap as squareMazeMap } from "../maps/experiment/squareMaze"
import { GamefieldCreator } from "./experiment"
import makePlot from "./makePlot"
import makePlotScatter, { iterationTargets } from "./makePlotScatter"
import tryoutAllSettings from "./tryoutAllSettings"

const makeExperiment = async (name: string, mapCreator: GamefieldCreator,
                              testWithAndWithoutDeath: boolean, settings: any) => {
const res = await tryoutAllSettings(mapCreator, settings, 30)
mkdir("results")
fs.writeFileSync(`results/${name}.json`, JSON.stringify(res, null, 2))
await makePlot(name, res, testWithAndWithoutDeath)
}

const makeExperimentScatter =
async (name: string, mapCreator: GamefieldCreator, testWithAndWithoutDeath: boolean, settings: any) => {
  const fullRes: any[] = []
  for (const setting of settings) {
    const settingsToUse = map(
      iterationTargets, (pheromoneTarget: any) => {
      return merge({}, setting, {pheromoneTarget})
    })
    console.log("got settings", settingsToUse)
    const res = await tryoutAllSettings(mapCreator, settingsToUse, 10, false)
    for (const a of res) {
      fullRes.push(a)
    }
  }
  mkdir("results")
  fs.writeFileSync(`results/${name}.json`, JSON.stringify(fullRes, null, 2))
  await makePlotScatter(name, fullRes, testWithAndWithoutDeath)
}

const runAllExperiments = async () => {
  const baseSettings = {
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0.007,
    spawnThreshold: 10
  }

  await makeExperimentScatter("shortandlong", shortTowersAndLongMap, true, [
    merge({
      name: "Continous Vapor",
      experimentType: experimentChoices.continousVapor
    }, baseSettings),
    merge({
      name: "Success only",
      experimentType: experimentChoices.onlyOnSuccess
    }, baseSettings),
    merge({
      name: "SP Only",
      experimentType: experimentChoices.shortestPathOnly
    }, baseSettings),
    merge({
      name: "SP Weight",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings)
  ])

  // await makeExperiment("shortandlong", shortTowersAndLongMap, true, [
  //   merge({
  //     name: "Continous Vapor",
  //     experimentType: experimentChoices.continousVapor
  //   }, baseSettings),
  //   merge({
  //     name: "Success only",
  //     experimentType: experimentChoices.onlyOnSuccess
  //   }, baseSettings),
  //   merge({
  //     name: "SP Only",
  //     experimentType: experimentChoices.shortestPathOnly
  //   }, baseSettings),
  //   merge({
  //     name: "SP Weight",
  //     experimentType: experimentChoices.shortestPathWeight
  //   }, baseSettings)
  // ])
  // await makeExperiment("shortandlongwithtowers", shortTowersAndLongMap, [], 0.3)
  // await makeExperiment("mirroredwithtower", mirroredwithtower, [], 0.3)
  // await makeExperiment("squaremaze", squareMazeMap, [], 0.3)
  return true
}

export default runAllExperiments
