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
