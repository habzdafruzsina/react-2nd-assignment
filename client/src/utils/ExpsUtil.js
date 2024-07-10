export function getExpsObj(expsText) {
  let expsList = [];
  expsText.split("\n").map((exp) => {
    let expSplit = exp.split(";");
    expsList.push({
      company: expSplit[0],
      title: expSplit[1],
      interval: expSplit[2],
    });
  });
  return expsList;
}

export function getExpsTxt(expsObj) {
    let expsText = "";
    expsObj.map(exp => {
        expsText += exp.company;
        expsText += ";"
        expsText += exp.title;
        expsText += ";"
        expsText += exp.interval;
        expsText += "\n"
    })
    expsText.slice(0, -1);
    return expsText;
}