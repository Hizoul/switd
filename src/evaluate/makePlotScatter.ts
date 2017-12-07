import * as ChartjsNode from "chartjs-node"
import { cloneDeep, find, findIndex, isNil, map } from "lodash"
import { IExperimentResult } from "./experiment"

const iterationTargets = [10, 20, 50, 100, 200, 500, 1000,  2000, 5000, 10000, 20000, 50000]

const colors: string[] = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)"
]

const drawChart =
async (name: string, type: string, labels: string[], datasets: any[],
       xLabel = "Algorithm", yLabel = "Ticks") => {
  try {
  console.log("about to make new", datasets)
  for (const i in datasets) {
    datasets[i].borderColor = colors[i]
    datasets[i].backgroundColor = "rgba(255, 99, 132, 0)"
  }
  const chartNode = new ChartjsNode(600, 300)
  const chartJsOptions = {
    type, data: {
      labels, datasets
    },
    options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: yLabel
            },
            ticks: {
                beginAtZero: true
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: xLabel
            }
          }]
        }
    }
  }
  await chartNode.drawChart(chartJsOptions)
  await chartNode.writeImageToFile("image/png", `results/${name}.png`)
  await chartNode.destroy()
} catch (e) {
  console.error("e", e)
}
}

const makePlotScatter = async (name: string, res: IExperimentResult[], distinguishDeath: boolean) => {
  const base: any = []
  for (const a of res) {
    if (isNil(find(base, ["label", a.otherSettings.name]))) {
      base.push({
        label: a.otherSettings.name,
        data: []
      })
    }
  }
  const datasetsTicks = cloneDeep(base)
  const datasetsDeadAnts = cloneDeep(base)
  const datasetsRatio = cloneDeep(base)
  const labels: any[] = map(iterationTargets, (t: any) => String(t))
  const ticksData: any[] = []
  const deadAntsData: any[] = []
  const ratioData: any[] = []
  for (const result of res) {
    const indexToInsert = findIndex(labels, (entry) => {
      return entry === String(result.otherSettings.pheromoneTarget)
    })
    const baseEntryTicks = find(datasetsTicks, ["label", result.otherSettings.name])
    const baseEntryDeadAnts = find(datasetsDeadAnts, ["label", result.otherSettings.name])
    const baseEntryRatios = find(datasetsRatio, ["label", result.otherSettings.name])
    baseEntryTicks.data[indexToInsert] = result.results.tickAmount
    baseEntryDeadAnts.data[indexToInsert] = result.results.deadAnts
    baseEntryRatios.data[indexToInsert] = result.results.tickAmount / result.results.deadAnts
  }
  const yLabel = "Ants that need to reach Target"
  await drawChart(`${name}-ticks-line`, "line", labels, datasetsTicks, yLabel, "Ticks")
  await drawChart(`${name}-deaths-line`, "line", labels, datasetsDeadAnts, yLabel, "Deaths")
  await drawChart(`${name}-ticksvsDeadAnts-line`, "line", labels, datasetsRatio, yLabel, "Tick / Death Ratio")
}

export default makePlotScatter
export {
  iterationTargets
}
