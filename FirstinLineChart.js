/*===============
Const an Variables
================*/    
var elem2 = document.getElementById('chart-area');
    var data2 = {
        categories: [],
        series: [{}, ],
    };
    const options2 = {
        chart: { title: 'Crimes recorded by the police', width: 800, height: 800 },
        xAxis: {
            title: 'Year',
        },
        yAxis: {
            title: 'Offence Recorded',
        },
        tooltip: {
            formatter: (value) => `${value}x100`,
        },
        legend: {
            align: 'bottom',
        },
        series: {
            dataLabels: {
                visible: true,
            },
            showDot: true,
        },
    };
/*===============
Function Declaration
================*/  
 /**
     * Draw Chart
     * @param {Object} el - HTML Element where append the Chart
     * @param {Object} data- Chart Datas
     * @param {Object} options- Chart Option
     */ 
    const drawLineGraph=(el,data,options)=>{
        let chart = toastui.Chart.lineChart({ el, data, options });
    }
      /**
     * Get Datas 
     * @param {Object} element - HTML Element where search data
     * @param {Object} chart_data - Chart Datas
     */
    const getCategories = (elem,d) => {
        let years = Array.from(elem.querySelectorAll("tbody tr:nth-child(1) th"))
        years.forEach(element => {
            if (element.innerHTML != '')
                d.categories.push(element.innerHTML)
        });
    }
     /**Get Datas 
     * 
     * @param {Object} element - HTML Element where search data
     * @param {Object} chart_data - Chart Datas
     */
    const getSeries = (elem,d) => {
        let series_array = elem.querySelectorAll("tbody tr ")
        let row = Array.from(series_array) //get TR Nodes
        for (let i = 0; i < row.length; i++) {
            let nationData = {
                name: "",
                data: [],
            }
            let child = row[i]
            let tableData = Array.from(child.querySelectorAll("td"))
            for (let y = 0; y < tableData.length; y++) {
                if (y == 0) {
                    nationData.name = tableData[y].innerHTML
                } else {
                    let x = parseFloat(tableData[y].innerHTML.replace(",", "."))
                    if (isNaN(x)) {
                        nationData.data.push("") ///inNan
                    } else {
                        nationData.data.push(parseFloat(tableData[y].innerHTML.replace(",", ".")))
                    }
                }
            }
            d.series.push(nationData)
        }
        d.series.shift()
        d.series.shift()
    }
  /*===============
EventListener Main Call
================*/    
window.addEventListener("load",()=>{
    const table1 = document.getElementById("table1")
    getCategories(table1,data2)
    getSeries(table1,data2)
    drawLineGraph(elem2,data2,options2)
})