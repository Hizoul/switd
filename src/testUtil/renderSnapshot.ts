import * as render from "preact-render-to-json"

const renderSnapshot = (comp: any, msg: string) => {
  const tree = render(comp)
  expect(tree).toMatchSnapshot(msg)
}

export default renderSnapshot
