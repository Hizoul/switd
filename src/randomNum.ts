// courtesy of https://stackoverflow.com/a/7228322
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default randomNum
