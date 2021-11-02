(() => {
    var data = {
        categories: [],
        series: [{}, ],
    };
    const table1 = document.getElementById("table1")

    let getCategories = (elem) => {
        let years = Array.from(elem.querySelectorAll("tbody tr:nth-child(1) th"))
        years.forEach(element => {
            if (element.innerHTML != '')
                data.categories.push(element.innerHTML)
        });
    }
    const getSeries = (elem) => {
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
                        nationData.data.push(0)
                    } else {
                        nationData.data.push(parseFloat(tableData[y].innerHTML.replace(",", ".")))
                    }
                }
            }
            data.series.push(nationData)
        }
        data.series.shift()
        data.series.shift()
    }
    getCategories(table1)
    getSeries(table1)
    var options = {
        chart: { title: 'Crimes recorded by the police', width: 800, height: 1000 },
        xAxis: {
            title: 'Year',
        },
        yAxis: {
            title: 'Value',
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
        tooltip: {
            formatter: (value) => `${value}x1000`,
        },
    };
    var el = document.getElementById('chart-area');

    const chart1 = toastui.Chart.lineChart({ el, data, options });
})();