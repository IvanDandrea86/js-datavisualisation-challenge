/*===============
Const an Variables
================*/  
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
        chart: { title: 'LiveData', width: 'auto', height: 'auto'  },
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
/**
 * Update graph with TOAST UI 
 * @param {Object} chart - chart object to update
 */
const updateData=(chart)=>{
    setInterval(() => {
        let len= data.series[0].data.length
        dataFetchAsync("https://canvasjs.com/services/data/datapoints.php?xstart="+(len+1)+"&ystart=0&length=1&type=json")
        .then(datas=> {
        data.series[0].data.push(datas[0][1])
        chart.addData([datas[0][1]], (len+1).toString());
        })
    }, 1500);
}
window.addEventListener("load",()=>{
    document.getElementById('firstHeading').insertAdjacentHTML('beforeend', "<div id='myChart'style='width:100%; height:40vh'></div>");
    const el = document.getElementById('myChart');
    dataFetchAsync("https://canvasjs.com/services/data/datapoints.php")
    .then(dataset=>{
        let array=Array.from(dataset)
        array.forEach(elem=>{
            data.series[0].data.push(elem[1])
        })
        const chart = toastui.Chart.areaChart({ el, data, options });
        updateData(chart)
    })
    
})