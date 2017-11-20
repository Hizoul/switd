import Map, { experimentChoices } from "../logic/map"
import Street, { direction } from "../logic/street"
import Tower from "../logic/tower"

const createtestMapNoSplits = () => {
  const testMapNoSplits = new Map(15, 15)
  testMapNoSplits.spawnThreshold = 14
  testMapNoSplits.experimentType = experimentChoices.shortestPathOnly
  const start = new Street(0, 0, testMapNoSplits)
  testMapNoSplits.addTile(start)
  const s1 = start.extend(direction.right)
  const s2 = s1.extend(direction.right)
  const s3 = s2.extend(direction.right)
  const s4 = s3.extend(direction.right)
  const s5 = s4.extend(direction.right)
  const s6 = s5.extend(direction.right)
  const s7 = s6.extend(direction.right)
  const s8 = s7.extend(direction.right)
  const s9 = s8.extend(direction.right)
  const s10 = s9.extend(direction.right)
  const s11 = s10.extend(direction.right)
  const s12 = s11.multiExtend(direction.down, 4)
  const s13 = s12.multiExtend(direction.left, 1)

  const s2a = s2.extend(direction.down)
  const s2b = s2a.extend(direction.down)
  const s2ca = s2b.multiExtend(direction.right, 3)
  const s2cb = s2ca.multiExtend(direction.right, 4)
  const s2d = s2cb.multiExtend(direction.down, 2)
  const s2e = s2d.multiExtend(direction.down, 5)

  s13.addIntersection(s2d)

  const w3 = s2ca.extend(direction.down)
  const w4 = w3.extend(direction.down)
  const w5 = w4.multiExtend(direction.right, 3)

  w5.addIntersection(s2d)

  const t1 = new Tower(4, 6, testMapNoSplits)
  t1.damagableAnts = 4
  t1.damageAmount = 60
  t1.towerRange = 2
  testMapNoSplits.addTile(t1)

  return testMapNoSplits

}

export default createtestMapNoSplits()
export { createtestMapNoSplits }
