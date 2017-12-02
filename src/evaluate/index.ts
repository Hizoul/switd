import * as fs from "fs"
import { mkdir } from "shelljs"
import { experimentChoices } from "../logic/map"
import { createMap as mirroredwithtower } from "../maps/experiment/mirroredWithTower"
import { createMap } from "../maps/experiment/shortAndLong"
import { createMap as shortTowersAndLongMap } from "../maps/experiment/shortTowersAndLong"
import { createMap as squareMazeMap } from "../maps/experiment/squareMaze"
import { GamefieldCreator } from "./experiment"
import makePlot from "./makePlot"
import tryoutAllSettings from "./tryoutAllSettings"

const makeExperiment = async (name: string, mapCreator: GamefieldCreator,
                              testWithAndWithoutDeath: boolean, settings: any) => {
  const res = await tryoutAllSettings(mapCreator, settings, 30)
  mkdir("results")
  fs.writeFileSync(`results/${name}.json`, JSON.stringify(res, null, 2))
  await makePlot(name, res, testWithAndWithoutDeath)
}

const runAllExperiments = async () => {
  const baseSettings = {
    maxTicks: 1000,
    pheromoneTarget: 400,
    targetIsAmountOfAnts: true
  }
  await makeExperiment("shortandlong", shortTowersAndLongMap, false, [
    {
      name: "Continous Vapor",
      maxTicks: 300,
      decayStrength: -0.007,
      spawnThreshold: 10,
      experimentType: experimentChoices.continousVapor,
      targetIsAmountOfAnts: true,
      pheromoneTarget: 200
    },
    {
      name: "Success only",
      maxTicks: 300,
      decayStrength: -0.007,
      spawnThreshold: 10,
      experimentType: experimentChoices.onlyOnSuccess,
      targetIsAmountOfAnts: true,
      pheromoneTarget: 200
    },
    {
      name: "SP Only",
      maxTicks: 300,
      decayStrength: -0.007,
      spawnThreshold: 10,
      experimentType: experimentChoices.shortestPathOnly,
      targetIsAmountOfAnts: true,
      pheromoneTarget: 200
    },
    {
      name: "SP Weight",
      maxTicks: 300,
      decayStrength: -0.007,
      spawnThreshold: 10,
      experimentType: experimentChoices.shortestPathWeight,
      targetIsAmountOfAnts: true,
      pheromoneTarget: 200
    }
  ])
  // await makeExperiment("shortandlongwithtowers", shortTowersAndLongMap, [], 0.3)
  // await makeExperiment("mirroredwithtower", mirroredwithtower, [], 0.3)
  // await makeExperiment("squaremaze", squareMazeMap, [], 0.3)
  return true
}

export default runAllExperiments
