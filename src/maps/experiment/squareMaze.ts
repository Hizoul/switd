import Map, { experimentChoices } from "../../logic/map"
import Street, { direction } from "../../logic/street"
import Tower from "../../logic/tower"

const createMap = () => {
  const testMapNoSplits = new Map(15, 15)
  testMapNoSplits.spawnThreshold = 14
  testMapNoSplits.experimentType = experimentChoices.shortestPathWeight

  testMapNoSplits.substractForDeath = true
  testMapNoSplits.decayStrength = 0

  const newStart = new Street(2, 2, testMapNoSplits)
  testMapNoSplits.addTile(newStart)
  const s1 = newStart.extend(direction.right)
  const s2 = s1.extend(direction.right)

  const square1S1 = s2.extend(direction.right)
  const square1S2 = square1S1.extend(direction.up)
  const square1S3 = square1S2.extend(direction.right)
  const square1S4 = square1S3.extend(direction.right)
  const square1S5 = square1S4.extend(direction.down)
  const square1S6 = square1S5.extend(direction.down)
  const square1S8 = square1S1.extend(direction.down)

  const square2S1 = square1S6.extend(direction.down)
  const square2S2 = square2S1.extend(direction.right)
  const square2S3 = square2S2.extend(direction.right)
  const square2S4 = square2S3.extend(direction.down)
  const square2S5 = square2S4.extend(direction.down)
  const square2S6 = square2S5.extend(direction.left)
  const square2S7 = square2S6.extend(direction.left)
  const square2S8 = square2S7.extend(direction.up)
  const square2S9 = square2S8.extend(direction.up)
  square2S9.addIntersection(square2S1)

  const square3S1 = square1S8.extend(direction.down)
  const square3S2 = square3S1.extend(direction.down)
  const square3S3 = square3S2.extend(direction.down)

  const square4S1 = square3S3.extend(direction.down)
  const square4S2 = square4S1.extend(direction.right)
  square4S2.relevantEvaluationTarget = true
  const square4S3 = square4S2.extend(direction.right)
  const square4S4 = square4S3.extend(direction.down)
  const square4S5 = square4S4.extend(direction.down)
  const square4S6 = square4S5.extend(direction.left)
  const square4S7 = square4S6.extend(direction.left)
  const square4S8 = square4S7.extend(direction.up)
  const square4S9 = square4S8.extend(direction.up)
  square4S9.addIntersection(square4S1)

  const square5S1 = square2S5.extend(direction.down)
  const square5S2 = square5S1.extend(direction.right)
  const square5S3 = square5S2.extend(direction.right)
  const square5S4 = square5S3.extend(direction.down)
  const square5S5 = square5S4.extend(direction.down)
  const square5S6 = square5S5.extend(direction.left)
  const square5S7 = square5S6.extend(direction.left)
  const square5S8 = square5S7.extend(direction.up)
  const square5S9 = square5S8.extend(direction.up)
  square5S9.addIntersection(square5S1)

  const square6S1 = square4S5.extend(direction.down)
  const square6S2 = square6S1.extend(direction.right)
  square6S2.relevantEvaluationTarget = true
  const square6S3 = square6S2.extend(direction.right)
  const square6S4 = square6S3.extend(direction.down)
  const square6S5 = square6S4.extend(direction.down)
  const square6S6 = square6S5.extend(direction.left)
  const square6S7 = square6S6.extend(direction.left)
  const square6S8 = square6S7.extend(direction.up)
  const square6S9 = square6S8.extend(direction.up)
  square6S9.addIntersection(square6S1)

  const endWay1 = square6S4.extend(direction.right)
  const endWay2 = endWay1.extend(direction.right)
  const endWay3 = endWay2.extend(direction.right)
  const endWay4 = endWay3.extend(direction.right)
  const secondEndWay = square5S5.extend(direction.down)
  const secondEndWay2 = secondEndWay.extend(direction.down)
  secondEndWay2.addIntersection(endWay2)
  endWay3.relevantEvaluationTarget = true

  const t1 = new Tower(8, 7, testMapNoSplits)
  testMapNoSplits.addTile(t1)

  return testMapNoSplits
}

export default createMap()
export { createMap }
