import Map from "../logic/map"
import Street, { direction } from "../logic/street"

const testMap1 = new Map()

const start = new Street(0, 0, testMap1)
testMap1.addTile(start)
const s1 = start.extend(direction.right)
const s2 = s1.extend(direction.down)
const s31 = s2.extend(direction.down)
const s32 = s2.extend(direction.right)
const s321 = s31.extend(direction.right)
const s322 = s321.extend(direction.down)
const s311 = s31.extend(direction.down)
const s312 = s311.extend(direction.right)
const s4intersection = s312.extend(direction.right)
s322.next.push(s4intersection)
s4intersection.previous.push(s322)

const s5 = s4intersection.extend(direction.down)
const s6 = s5.extend(direction.down)
const s7 = s6.extend(direction.left)
const s8 = s7.extend(direction.left)

export default testMap1
