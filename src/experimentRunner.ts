import * as hamsters from "hamsters.js"
import * as TinyWorker from "tiny-worker"
import evaluate from "./evaluate"

hamsters.init({
  maxThreads: 3,
  Worker: TinyWorker
})

const makeex = async () => {
  console.log("Starting Batch Evaluation")
  await evaluate()
  console.log("Done with Batch Evaluation")
}

makeex()
