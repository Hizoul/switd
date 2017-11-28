import * as fs from "fs"
import { createMap as mirroredwithtower } from "../maps/experiment/mirroredWithTower"
import { createMap } from "../maps/experiment/shortAndLong"
import { createMap as shortTowersAndLongMap } from "../maps/experiment/shortTowersAndLong"
import { createMap as squareMazeMap } from "../maps/experiment/squareMaze"
import { GamefieldCreator } from "./experiment"
import tryoutAllSettings from "./tryoutAllSettings"

const makeExperiment = async (name: string, mapCreator: GamefieldCreator, target: number) => {
  const res = await tryoutAllSettings(mapCreator, target, 30)
  fs.writeFileSync(`results/${name}.json`, JSON.stringify(res, null, 2))
}

const runAllExperiments = async () => {
  await makeExperiment("shortandlong", createMap, 0.3)
  await makeExperiment("shortandlongwithtowers", shortTowersAndLongMap, 0.3)
  await makeExperiment("mirroredwithtower", mirroredwithtower, 0.3)
  await makeExperiment("squaremaze", squareMazeMap, 0.3)
  return true
}

export default runAllExperiments
