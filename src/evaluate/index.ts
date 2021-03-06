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

const start = Date.now()

const makeExperiment = async (name: string, mapCreator: GamefieldCreator,
                              testWithAndWithoutDeath: boolean, settings: any) => {
const res = await tryoutAllSettings(mapCreator, settings, 50)
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
      return merge({}, setting, {pheromoneTarget, maxTicks: pheromoneTarget * 10})
    })
    console.log("got settings", settingsToUse)
    const res = await tryoutAllSettings(mapCreator, settingsToUse, 10, false)
    for (const a of res) {
      fullRes.push(a)
    }
  }
  mkdir("results")
  fs.writeFileSync(`results/${name}-scatter.json`, JSON.stringify(fullRes, null, 2))
  await makePlotScatter(name, fullRes, testWithAndWithoutDeath)
  const res = await tryoutAllSettings(mapCreator, settings, 30)
  fs.writeFileSync(`results/${name}.json`, JSON.stringify(res, null, 2))
  await makePlot(name, res, testWithAndWithoutDeath)
}

const varyWithAllExperimentTypes = (baseSettings: any, nameAddon: string = "") => {
  return [
    merge({
      name: nameAddon + "Continous Vapor",
      experimentType: experimentChoices.continousVapor
    }, baseSettings),
    merge({
      name: nameAddon + "Success only",
      experimentType: experimentChoices.onlyOnSuccess
    }, baseSettings),
    merge({
      name: nameAddon + "SP Only",
      experimentType: experimentChoices.shortestPathOnly
    }, baseSettings),
    merge({
      name: nameAddon + "SP Weight",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings)
  ]
}

const runSettingOnAllMaps = async (settings: any, name: string, testWithAndWithoutDeath: boolean) => {
  const experimentStart = Date.now()
  await makeExperimentScatter(name + "shortandlong", createMap, testWithAndWithoutDeath,
  varyWithAllExperimentTypes(settings))
  await makeExperimentScatter(name + "shortandlongwithtowers",
    shortTowersAndLongMap, testWithAndWithoutDeath, varyWithAllExperimentTypes(settings))
  await makeExperimentScatter(name + "mirroredwithtower",
    mirroredwithtower, testWithAndWithoutDeath, varyWithAllExperimentTypes(settings))
  await makeExperimentScatter(name + "squaremaze",
    squareMazeMap, testWithAndWithoutDeath, varyWithAllExperimentTypes(settings))
  console.log("finished running experiment after " + (Date.now() - experimentStart) + " ms")
  console.log("current total runtime " + (Date.now() - start) + " ms")
}

const runAllExperiments = async () => {
  await runSettingOnAllMaps({
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0.007,
    spawnThreshold: 14
  }, "normal", true)

  await runSettingOnAllMaps({
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0.007,
    spawnThreshold: 30
  }, "high spawn normal decay", true)

  await runSettingOnAllMaps({
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0.02,
    spawnThreshold: 30
  }, "high spawn high decay", true)

  await runSettingOnAllMaps({
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0.02,
    spawnThreshold: 4
  }, "low spawn high decay", true)

  await runSettingOnAllMaps({
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0.0001,
    spawnThreshold: 4
  }, "low spawn low decay", true)

  await runSettingOnAllMaps({
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0,
    spawnThreshold: 4
  }, "low spawn no decay", true)

  console.log("total runtime " + (Date.now() - start) + " ms")
  return true
}

const makestuff = async () => {
  const baseSettings = {
    maxTicks: 9999,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true,
    decayStrength: -0.007,
    spawnThreshold: 14
  }
  await makeExperimentScatter("mirroredwithtower", mirroredwithtower, true,
  [
    merge({
      name: "Normal",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings),
    merge({
      name: "High Decay",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings, {
      decayStrength: -0.02
    }),
    merge({
      name: "Low Decay",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings, {
      decayStrength: -0.0007
    }),
    merge({
      name: "High Increase",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings, {
      pheromoneIncreaseStrength: 0.02
    }),
    merge({
      name: "Low Increase",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings, {
      pheromoneIncreaseStrength: 0.0007
    }),
    merge({
      name: "High Increase & Decay",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings, {
      pheromoneIncreaseStrength: 0.03,
      decayStrength: -0.02
    }),
    merge({
      name: "Low Increase & Decay",
      experimentType: experimentChoices.shortestPathWeight
    }, baseSettings, {
      pheromoneIncreaseStrength: 0.001,
      decayStrength: -0.0007
    })
  ])
}

export default makestuff
