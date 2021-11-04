/*===============
Const an Variables
================*/   
    var elem = document.getElementById('char-area2');
    var data1 = {
        categories: [],
        series: [{
                name: "",
                data: [],
            },
            {
                name: "",
                data: [],
            }
        ],
    };
    const theme = {
        series: {
            colors: [
                '#83b14e',
                '#458a3f',
                '#295ba0',
                '#2a4175',
                '#289399',
                '#289399',
                '#617178',
                '#8a9a9a',
                '#516f7d',
                '#dddddd',
            ],
            dashSegments: [5, 10],
            lineWidth: 1,
            select: {
                dot: {
                    color: '#ff416d',
                    radius: 6,
                    borderColor: '#00b5a1',
                    borderWidth: 2,
                },
                restSeries: {
                    areaOpacity: 0.01,
                },
                areaOpacity: 0.8,
            },
            hover: {
                dot: {
                    color: '#00ffff',
                    radius: 6,
                    borderColor: '#0859c6',
                    borderWidth: 2,
                },
            },
            dot: {
                radius: 6,
                borderColor: '#ffff00',
                borderWidth: 2,
            },
            areaOpacity: 0.4,
        },
    };
    let options1 = {
        chart: { title: 'Prison population, average per year', width: 800, height: 1000 },
        xAxis: { pointOnColumn: false, title: { text: 'per 100,000 inhabitants' } },
        yAxis: { title: 'Nations' },
        series: { selectable: true, showDot: true },
        theme,
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
    const drawGraph=(el,data,options)=>{
        let chart = toastui.Chart.barChart({ el, data, options });

    }
    /**
     * Get Datas 
     * @param {Object} element - HTML Element where search data
     * @param {Object} chart_data - Chart Datas
     */
    const getName = (element,chart_data) => {
        let row = Array.from(element.querySelectorAll("thead tr "))
        let tableData = row[0].querySelectorAll("th")
        chart_data.series[0].name = tableData.item(2).innerHTML.replace("&ndash;", "-")
        chart_data.series[1].name = tableData.item(3).innerHTML.replace("&ndash;", "-")

    }
    /**Get Datas 
     * 
     * @param {Object} element - HTML Element where search data
     * @param {Object} chart_data - Chart Datas
     */
    const fillChart = (element,chart_data) => {
        let row = Array.from(element.querySelectorAll("tbody tr "))
        for (let i = 0; i < row.length; i++) {
            let child = row[i]
            let tableData = child.querySelectorAll("td")
            chart_data.categories.push(tableData.item(0).innerHTML.replace(/(\r\n|\n|\r|<br>)/gm,"").replace(/( +)/gm," "))
            chart_data.series[0].data.push(parseInt(tableData.item(1).innerHTML))
            chart_data.series[1].data.push(parseInt(tableData.item(2).innerHTML))
        }
    }
/*===============
EventListener Main Call
================*/  
window.addEventListener("load",()=>{
    const table2 = document.getElementById("table2")
    fillChart(table2,data1)
    getName(table2,data1)
    drawGraph(elem,data1,options1)
    })
