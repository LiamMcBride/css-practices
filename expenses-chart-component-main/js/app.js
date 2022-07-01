function calculateHeight(amount){
    return (amount / 100) * 200;
}

function sizeGraph(data){
    let graphs = document.getElementsByClassName("graph-bar");
    let titles = document.getElementsByClassName("graph-label");
    let values = document.getElementsByClassName("graph-amount");
    let counter = 0;
    for(const day in data){
        graphs[counter].style.height = calculateHeight(data[day]["amount"]) + "px";
        titles[counter].innerHTML = data[day]["day"]
        values[counter].innerHTML = "$" + data[day]["amount"];
        counter++;
    }
}

function generateGraph(size){
  let graph = document.getElementsByClassName("graph-container")[0];
  let base = "1fr ".repeat(size);
  
  graph.style.gridTemplateColumns = base;
  for(let i = 0; i < size; i++){
    let newDay = document.createElement("div");
    let newGraphAmount = document.createElement("div");
    let newGraphBar = document.createElement("div");
    let newGraphTitle = document.createElement("div");
    
    newDay.className = ("day-container");
    newGraphAmount.className = ("graph-amount");
    newGraphBar.className = ("graph-bar");
    newGraphTitle.className = ("graph-label sub-heading brown-text");

    newDay.appendChild(newGraphAmount);
    newDay.appendChild(newGraphBar);
    newDay.appendChild(newGraphTitle);

    graph.appendChild(newDay);
    
  }
}

let data = [
    {
      "day": "mon",
      "amount": 17.45
    },
    {
      "day": "tue",
      "amount": 34.91
    },
    {
      "day": "wed",
      "amount": 52.36
    },
    {
      "day": "thu",
      "amount": 31.07
    },
    {
      "day": "fri",
      "amount": 23.39
    },
    {
      "day": "sat",
      "amount": 43.28
    },
    {
      "day": "sun",
      "amount": 25.48
    }
  ];

generateGraph(Object.keys(data).length);
sizeGraph(data);