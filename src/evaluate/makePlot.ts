import * as ChartjsNode from "chartjs-node"
import { IExperimentResult } from "./experiment"
import { cloneDeep } from "lodash"

const bgColors = [

]

const drawChart = async (name: string, type: string, labels: string[], datasets: any[]) => {
  try {
  console.log("about t o make new", datasets)
  if (datasets.length > 1) {
    datasets[0].backgroundColor = "rgba(255, 99, 132, 0.4)"
    datasets[0].borderColor = "rgba(54, 162, 235, 1)"
    datasets[1].backgroundColor = "rgba(75, 192, 192, 0.4)"
    datasets[1].borderColor = "rgba(75, 192, 192, 1)"
  } else {
    for (const i in datasets) {
      datasets[i].backgroundColor = [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
      ]
      datasets[i].borderColor = [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
      ]
      datasets[i].borderWidth = 1
    }
  }
  const chartNode = new ChartjsNode(600, 300)
  const chartJsOptions = {
    type, data: {
      labels, datasets
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
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

const makePlot = async (name: string, res: IExperimentResult[], distinguishDeath: boolean) => {
  const base: any = [{label: "Substract for Death", data: []}, {label: "Regular", data: []}]
  let datasetsTicks = cloneDeep(base)
  let datasetsDeadAnts = cloneDeep(base)
  let datasetsRatio = cloneDeep(base)
  const labels: any[] = []
  const ticksData: any[] = []
  const deadAntsData: any[] = []
  const ratioData: any[] = []
  for (const result of res) {
    const withDeath = result.otherSettings.deathInfluencesDecay
    if (withDeath) {
      labels.push(result.otherSettings.name)
    }
    const index = withDeath ? 0 : 1
    datasetsTicks[index].data.push(result.results.tickAmount)
    datasetsDeadAnts[index].data.push(result.results.deadAnts)
    datasetsRatio[index].data.push(result.results.tickAmount / result.results.deadAnts)
  }
  if (!distinguishDeath) {
    datasetsTicks = datasetsTicks.slice(1)
    datasetsDeadAnts = datasetsDeadAnts.slice(1)
    datasetsRatio = datasetsRatio.slice(1)
  }
  await drawChart(`${name}-ticks`, "bar", labels, datasetsTicks)
  await drawChart(`${name}-deaths`, "bar", labels, datasetsDeadAnts)
  await drawChart(`${name}-ticksvsDeadAnts`, "bar", labels, datasetsRatio)
}

export default makePlot

// {
//   "type": "bar",
//   "data": {
//       "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//       "datasets": [{
//           "label": "# of Votes",
//           "data": [12, 19, 3, 5, 2, 3],
//           "backgroundColor": [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
//               "rgba(75, 192, 192, 0.2)",
//               "rgba(153, 102, 255, 0.2)",
//               "rgba(255, 159, 64, 0.2)"
//           ],
//           "borderColor": [
//               "rgba(255,99,132,1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
//               "rgba(75, 192, 192, 1)",
//               "rgba(153, 102, 255, 1)",
//               "rgba(255, 159, 64, 1)"
//           ],
//           "borderWidth": 1
//       }]
//   },
//   "options": {
//       "scales": {
//           "yAxes": [{
//               "ticks": {
//                   "beginAtZero": true
//               }
//           }]
//       }
//   }
// }
                
