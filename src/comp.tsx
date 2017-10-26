import "aframe"
import "aframe-environment-component"
import "aframe-particle-system-component"
import { Entity, Scene } from "aframe-react"
import "aframe-text-geometry-component"
import SharedImage from "isofw-shared/src/sharedComponentWithImageImport"
import ImgRenderer from "isofw-web/src/imgRenderer"
import * as React from "react"

const untypedReact: any = React
class WebPage extends React.Component<any, any> {
  public render() {
    const assetElement: any = React.createElement("a-assets", {}, [
      (<img id="dankMeme" src="https://i.imgur.com/PA00XuW.jpg" />)
    ])
    const imgEle: any = untypedReact.createElement("a-image", {
      src: "#dankMeme",
      position: "0 0 -10",
      height: "20",
      width: "10"
    })
    return (
      <Scene>
        <Entity
          particle-system={{preset: "rain"}}
          positionSpread="3 4 2"
        />
        <Entity light={{type: "point"}}/>
        <Entity
          position={{x: 4, z: -8}}
          rotation={{y: -35}}
          text-geometry={{value: "Felix is doof"}}
          material={{color: "red"}}
        />
        <Entity
          position={{x: -8,  y: 3, z: -7}}
          rotation={{y: 35}}
          color="red"
          text-geometry={{value: "my dank meme!"}}
          material={{color: "blue"}}
        />
        {assetElement}
        {imgEle}
      </Scene>
    )
  }
}

export default WebPage
