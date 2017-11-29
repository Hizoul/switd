import { each, filter, find, isArray, isEqual, map, union, uniq } from "lodash"
import randomNum from "../randomNum"
import { experimentChoices } from "./map"
import Street from "./street"
import Tile from "./tile"
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

const containsStreet = (streetList: Tile[], street: Tile) => {
  let contains = false
  each(streetList,  (inspect) => {
    if (street.sameTile(inspect)) {
      contains = true
      return false
    }
    return true
  })
  return contains
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
    // also consider going backwards at a crossing by unionizing next and previous and
    // then filtering out the tile that would mean going backwards
    const nextOptions = filter(union(this.currentlyOn.next, this.currentlyOn.previous), (street) => {
      return !this.currentlyOn.sameTile(street) &&
        !street.sameTile(this.walkedPath[Math.max(0, this.walkedPath.length - 1)])
    })
    if (isArray(nextOptions) && nextOptions.length > 0) {
      let i = 0
      const weightedOpts = map(nextOptions, (street) => {
        const obj = {choiceIndex: i, choiceWeight: Math.max(1, street.pheromoneLevel * 100)}
        i++
        return obj
      })
      const nextTileIndex = makeWeightedChoice(weightedOpts)

      const nextTile = nextOptions[nextTileIndex]
      if (this.currentlyOn.gameField.experimentType === experimentChoices.continousVapor) {
        if (!containsStreet(this.walkedPath, this.currentlyOn)) {
          this.currentlyOn.adjustPheromoneLevel(this.currentlyOn.gameField.pheromoneIncreaseStrength)
        }
      }
      this.walkedPath.push(this.currentlyOn)
      this.currentlyOn.leave(this)
      nextTile.enter(this)
      this.currentlyOn = nextTile
      if (nextTile.isTarget()) {
        this.walkedPath.push(nextTile)
        // Use uniq here so each crossed street tile only gets evaluated once
        const streetsToEvaluate = uniq(this.walkedPath)
        if (nextTile.gameField.experimentType === experimentChoices.onlyOnSuccess) {
          for (const targetCrossed of this.walkedPath) {
            targetCrossed.adjustPheromoneLevel(nextTile.gameField.pheromoneIncreaseStrength)
          }
        } else if (nextTile.gameField.experimentType === experimentChoices.shortestPathOnly) {
          if (nextTile.gameField.shortestPathLength >= this.walkedPath.length) {
            nextTile.gameField.shortestPathLength = this.walkedPath.length
            for (const street of this.walkedPath) {
              street.adjustPheromoneLevel(nextTile.gameField.pheromoneIncreaseStrength)
            }
          }
        } else if (nextTile.gameField.experimentType === experimentChoices.shortestPathWeight) {
          if (nextTile.gameField.shortestPathLength >= this.walkedPath.length) {
            nextTile.gameField.shortestPathLength = this.walkedPath.length
          }
          const modifier =  nextTile.gameField.shortestPathLength / this.walkedPath.length
          for (const street of this.walkedPath) {
            street.adjustPheromoneLevel(nextTile.gameField.pheromoneIncreaseStrength * modifier)
          }
        }
      }
    }
  }
  public hurt(damageDealt: number) {
    this.hp -= damageDealt
    if (this.hp <= 0) {
      this.currentlyOn.gameField.removeAnt(this)
      this.currentlyOn.gameField.amountOfDeadAnts++
      this.currentlyOn.leave(this)
      if (this.currentlyOn.gameField.towersEnabled && this.currentlyOn.gameField.substractForDeath) {
        for (const targetCrossed of this.walkedPath) {
          targetCrossed.adjustPheromoneLevel(this.currentlyOn.gameField.decayStrength)
        }
      }
    }
  }
}

export default Ant
