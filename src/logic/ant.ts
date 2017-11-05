import { find, isArray, map } from "lodash"
import randomNum from "../randomNum"
import { experimentChoices } from "./map"
import Street from "./street"
let currentmaxid = 1

const makeWeightedChoice = (inputArr: Array<{choiceIndex: number, choiceWeight: number}>) => {
  let sumOfWeights = 0
  const validRanges: Array<{min: number, max: number, index: number}> = []
  for (const item of inputArr) {
    validRanges.push({index: item.choiceIndex, min: sumOfWeights, max: sumOfWeights + item.choiceWeight})
    sumOfWeights += item.choiceWeight
  }
  const findInRange = randomNum(0, sumOfWeights)
  const foundRange: any = find(validRanges,
    (toCheck) => findInRange >= toCheck.min && findInRange <= Math.ceil(toCheck.max))
  return foundRange.index
}

class Ant {
  public currentlyOn: Street
  public walkedPath: Street[]
  public uniqueId: number
  public hp: number
  public constructor(currentTile: Street) {
    this.currentlyOn = currentTile
    this.uniqueId = currentmaxid
    this.walkedPath = [currentTile]
    this.hp = 50
    currentmaxid++
  }
  public makeNextStep() {
    if (this.currentlyOn.isTarget()) {
      // Already done
      return
    }
    const nextOptions = this.currentlyOn.next
    if (isArray(nextOptions) && nextOptions.length > 0) {

      let i = 0
      const weightedOpts = map(nextOptions, (street) => {
        const obj = {choiceIndex: i, choiceWeight: street.pheromoneLevel}
        i++
        return obj
      })
      const nextTileIndex = makeWeightedChoice(weightedOpts)

      const nextTile = nextOptions[nextTileIndex]
      this.walkedPath.push(nextTile)
      this.currentlyOn.leave(this)
      nextTile.enter(this)
      this.currentlyOn = nextTile
      if (nextTile.isTarget()) {
        if (nextTile.gameField.experimentType === experimentChoices.onlyOnSuccess) {
          for (const targetCrossed of this.walkedPath) {
            targetCrossed.adjustPheromoneLevel(1) // TOOD: figure out value of pheromonelevel
          }
        } else if (nextTile.gameField.experimentType === experimentChoices.onlyShortestPath ||
            nextTile.gameField.experimentType === experimentChoices.shortestPathWithDeathInfluence) {
          if (nextTile.gameField.shortestPathLength >= this.walkedPath.length) {
            nextTile.gameField.shortestPathLength = this.walkedPath.length
            for (const street of this.walkedPath) {
              street.adjustPheromoneLevel(1.5)
            }
          }
        }
      }
    }
  }
  public hurt(damageDealt: number) {
    this.hp -= damageDealt
    if (this.hp <= 0) {
      this.currentlyOn.gameField.removeAnt(this)
      this.currentlyOn.leave(this)
      if (this.currentlyOn.gameField.experimentType !== experimentChoices.onlyShortestPath) {
        for (const targetCrossed of this.walkedPath) {
          targetCrossed.adjustPheromoneLevel(-2) // TOOD: figure out value of pheromonelevel
        }
      }
    }
  }
}

export default Ant
