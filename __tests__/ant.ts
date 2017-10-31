import Ant from "../src/logic/ant"
import testMap1 from "../src/maps/testMap1"

const matchAntState = (ant: Ant, msg: string) => {
  expect({
    x: ant.currentlyOn.xPos,
    y: ant.currentlyOn.yPos,
    isStart: ant.currentlyOn.isStart(),
    isTarget: ant.currentlyOn.isTarget()
  }).toMatchSnapshot(msg)
}

it(`Ants can walk a path`, () => {
  const ant1 = new Ant(testMap1.getStart())
  matchAntState(ant1, "currently at start")
  ant1.makeNextStep()
  matchAntState(ant1, "currently at first pos")
  ant1.makeNextStep()
  matchAntState(ant1, "currently at second pos")
  ant1.makeNextStep()
  matchAntState(ant1, "currently at third pos")
})

it(`Ants can't walk away from target`, () => {
  const ant1 = new Ant(testMap1.getTarget())
  matchAntState(ant1, "currently at target")
  ant1.makeNextStep()
  ant1.makeNextStep()
  ant1.makeNextStep()
  ant1.makeNextStep()
  matchAntState(ant1, "still at target after multiple calls")
  // visitor length doesnt change in multiple entries
  const target = ant1.currentlyOn
  target.enter(ant1)
  target.enter(ant1)
  target.enter(ant1)
  target.enter(ant1)
  target.enter(ant1)
  target.enter(ant1)
  expect(target.currentVisitors.length).toBe(1)
})
