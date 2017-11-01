import Map from "../logic/map"
import Street, { direction } from "../logic/street"
import Tower from "../logic/tower"

const createtestMapNoSplits = () => {
  const testMapNoSplits = new Map()
  testMapNoSplits.spawnThreshold = 14
  const start = new Street(0, 0, testMapNoSplits)
  testMapNoSplits.addTile(start)
  const s1 = start.extend(direction.right)
  const s2 = s1.extend(direction.down)
  const s3 = s2.extend(direction.down)
  const s4 = s3.extend(direction.right)
  const s5 = s4.extend(direction.right)
  const s6 = s5.extend(direction.right)
  const s7 = s6.extend(direction.down)
  const s8 = s7.extend(direction.down)
  const s9 = s8.extend(direction.left)
  const s10 = s9.extend(direction.left)
  const s11 = s10.extend(direction.left)
  const t1 = new Tower(2, 1, testMapNoSplits)
  testMapNoSplits.addTile(t1)
  const t2 = new Tower(3, 3, testMapNoSplits)
  testMapNoSplits.addTile(t2)
  const t3 = new Tower(4, 5, testMapNoSplits)
  testMapNoSplits.addTile(t3)
  return testMapNoSplits
}

export default createtestMapNoSplits()
export { createtestMapNoSplits }
