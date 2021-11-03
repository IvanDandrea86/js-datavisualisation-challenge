const dataFetch=(target,data,el,options )=>{
    fetch(target)
    .then(response => response.json())
    .then(datas => { // data is an array
        datas.forEach((element) => {
            let array =new Array()
            array.push(element[0])
            array.push(element[1])  
            data.series[0].data.push(array)
            }) 
        data.series[0].data.shift()
        const chart = toastui.Chart.lineChart({ el, data, options });
    }) 
}
const dataUpdate=(target,old)=>{
     setInterval(() => {
         let newarray =Array()
           fetch(target)
            .then(response => response.json())
            .then(datas => { 
            datas.forEach((element) => {     
            let array =new Array()
            array.push(element[0])
            array.push(50)  
            //insert controll to merge
            newarray.push(array)
            }) 
        for (let i=0 ; i< newarray.length;i++){
            for(let y=0 ; y<newarray.length;y++){
                old.series[0].data[i,y]=newarray[i,y]   
            }
        } 
    })
     },2000)
}
window.addEventListener("load",()=>{
    document.getElementById('firstHeading').insertAdjacentHTML('beforeend', "<div id='myChart'></div>");
    const url ='https://canvasjs.com/services/data/datapoints.php'
    const data = {
        series:[{
            name:"Live Data",
            data:[[]]
        }]
    }
    const el = document.getElementById("myChart")
    const options = {
        chart: { title: 'Live Graph', width: 600, height: 400 },
        xAxis: {
            title: 'X',
        },
        yAxis: {
            title: 'Y',
        },
        legend: {
            align: 'bottom',
        },
        series: {
            dataLabels: {
                visible: true,
            },
            showDot: true,
            shift: true,
        }, 
};
dataFetch(url,data,el,options)
dataUpdate(url,data)


})
