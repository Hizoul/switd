import { ComponentClass } from "react"

type aframeReact = {
  Entity: any
  Scene: any
}

declare module "aframe-react" {
    export = aframeReact;
}