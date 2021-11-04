      
      const data = {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        series: [
          {
            name: 'Live Data',
            data: [],
          },
        ],
      };
      const options = {
        chart: { title: 'LiveData', width: 900, height: 400 },
        xAxis: { pointOnColumn: false, title: { text: 'X Title' } },
        yAxis: { title: 'Y Title' },
        series: { shift: true,
            dataLabels: {
                visible: true,
            },
            showDot: true, },
      };
/**
 * Data Fetch Async Version
 * @param {String} target -url to fetch
 * @returns -data json
 */
const dataFetchAsync=async(target)=>{
    const response =await fetch(target)
    const dataset  =await response.json()
    return dataset
}
      
const updateData=(chart)=>{

    let index = 11;
    setInterval(() => {
        let len= data.series[0].data.length
        fetch("https://canvasjs.com/services/data/datapoints.php?xstart="+(len+1)+"&ystart=0&length=1&type=json")
        .then(response=>response.json())
        .then(datas=> {
        console.log(datas[0][1])
        data.series[0].data.push(datas[0][1])
        chart.addData([datas[0][1]], (len+1).toString());
        })
    }, 1500);
}
window.addEventListener("load",()=>{
    document.getElementById('firstHeading').insertAdjacentHTML('beforeend', "<div id='myChart'></div>");
    const el = document.getElementById('myChart');
    dataFetchAsync("https://canvasjs.com/services/data/datapoints.php")
    .then(dataset=>{
        let array=Array.from(dataset)
        console.log(array)
        array.forEach(elem=>{
            console.log(elem[1])
            data.series[0].data.push(elem[1])
            console.log(data)
        })
        const chart = toastui.Chart.areaChart({ el, data, options });
        updateData(chart)
    })
    
})