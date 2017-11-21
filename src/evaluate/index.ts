import * as fs from "fs"
import { createMap } from "../maps/mapWithShortAndLongPath"
import { GamefieldCreator } from "./experiment"
import tryoutAllSettings from "./tryoutAllSettings"

const makeExperiment = async (name: string, mapCreator: GamefieldCreator, target: number) => {
  const res = await tryoutAllSettings(mapCreator, target, 30)
  fs.writeFileSync(`results/${name}.json`, JSON.stringify(res, null, 2))
}

const runAllExperiments = async () => {
  await makeExperiment("shortandlong", createMap, 0.3)
  return true
}

export default runAllExperiments
