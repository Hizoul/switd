import { filter } from "lodash"
import GameField, { experimentChoices } from "../logic/map"
import Street from "../logic/street"
import randomNum from "../randomNum"
import evaluateMap, { IMapEvaluationResults } from "./map"

export interface IExperimentResult {
  experimentType: number
  results: IMapEvaluationResults
}

const makeExperimentForMap = (mapCreator: () => GameField, target: number) => {
  const untypedChoices: any = experimentChoices
  const results: IExperimentResult[] = []
  for (const choiceIndex in experimentChoices) {
    const choice = untypedChoices[choiceIndex]
    const mapInstance = mapCreator()
    mapInstance.experimentType = choice
    results.push({experimentType: choice, results: evaluateMap(mapInstance, target)})
  }
  return results
}

export default makeExperimentForMap
