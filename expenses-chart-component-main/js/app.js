function calculateHeight(amount){
    return (amount / 100) * 200;
}

function sizeGraph(data){
    let graphs = document.getElementsByClassName("graph-bar");
    let titles = document.getElementsByClassName("graph-label");
    let counter = 0;
    for(const day in data){
        graphs[counter].style.height = calculateHeight(data[day]["amount"]) + "px";
        titles[counter].innerHTML = data[day]["day"]
        counter++;
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

sizeGraph(data);