import ReactECharts from "echarts-for-react"
import { getColumns, setSeries, setType } from "../../helper/ChartOptions";



const ControlledCharts = ({data}) => {

    const ttc = 'TTC Cells - ';
    const cellCountTypes = [setType('Data', 'left', '')]
    const cellCountSeries = [setSeries('line', 0)]
    const cellCountView = getColumns(data, [21], 'TTC Cells - Cell Count', cellCountTypes, 0, cellCountSeries);

    const accessibilityRateTypes = [setType('Percentage', 'left', '%')]
    const accessibilityRateSeries = [setSeries('line', 0), setSeries('line', 0)]
    const accessibilityRateView = getColumns(data, [2, 18], 'TTC Cells - Accessibility Rate', accessibilityRateTypes, 0, accessibilityRateSeries)

    const retainabilityTypes = [setType('Percentage', 'left', '%')]
    const retainabilitySeries = [setSeries('line', 0), setSeries('line', 0)]
    const retainabilityView = getColumns(data, [3, 19], 'TTC Cells - Retainability', retainabilityTypes, 0, retainabilitySeries)

    const mobilityTypes = [setType('Percentage', 'left', '%')]
    const mobilitySeries = [setSeries('line', 0), setSeries('line', 0)]
    const mobilityView = getColumns(data, [4, 5], 'TTC Cells - Mobility', mobilityTypes, 0, mobilitySeries)

    // const availabilityTypes = [setType('Data', 'left', ''), setType('Percentage', 'right', '%')]
    // const availabilitySeries = [setSeries('line', 1), setSeries('bar', 0, 'one'), setSeries('bar', 0, 'one'), setSeries('bar', 0, 'one')]
    
    const availabilityTypes = [setType('Percentage', 'right', '%'), setType('Data', 'left', '')]
    const availabilitySeries = [setSeries('line', 0), setSeries('bar', 1, 'one'), setSeries('bar', 1, 'one'), setSeries('bar', 1, 'one')]
    const availabilityView = getColumns(data, [6, 7, 8, 20], `${ttc}Availability`, availabilityTypes, 1, availabilitySeries)

    const resourceUsageTypes = [setType('Data', 'left', '')]
    const resourceUsageSeries = [setSeries('bar', 0, 'one'), setSeries('bar', 0, 'one'), setSeries('bar', 0, 'one'), setSeries('line', 0), setSeries('bar', 0, 'one')]
    const resourceUsageView = getColumns(data, [9, 10, 11, 12, 13], `${ttc}Resource Usage`, resourceUsageTypes, 0, resourceUsageSeries)

    const integrityTypes = [setType('Gigabyte', 'left', 'GB'), setType('Megabyte', 'right', 'Mbps')]
    const integritySeries = [setSeries('line', 1), setSeries('line', 1), setSeries('bar', 0, 'one'), setSeries('bar', 0, 'one')]
    const integritySeriesView = getColumns(data, [14, 15, 16, 17], `${ttc}Integrity`, integrityTypes, 1, integritySeries)

    const downlinkThroughTypes = [setType('Percentage', 'left', '%'), setType('Megabytes', 'right', 'Mbps')]
    const downlinkThroughSeries = [
        setSeries('line', 1),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('line', 0)
    ]
    const downlinkThroughView = getColumns(data, [14, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], `${ttc}Downlink Throughput`, downlinkThroughTypes, 1, downlinkThroughSeries)

    const uplinkThroughTypes = [setType('Percentage', 'left', '%'), setType('Megabytes', 'right', 'Mbps')]
    const uplinkThroughSeries = [
        setSeries('line', 1),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
        setSeries('bar', 0, 'one'),
    ]
    const uplinkThroughView = getColumns(data, [15, 41, 42, 43, 44, 45, 46, 47, 48], `${ttc}Uplink Throughput`, uplinkThroughTypes, 1, uplinkThroughSeries)

    const ulrssiTypes = [setType('Data', 'left', '')]
    const ulrssiSeries = [setSeries('line', 0)]
    const ulrssiView = getColumns(data, [22], `${ttc}ULRSSI`, ulrssiTypes, 0, ulrssiSeries)


    return (
        <div className="flex-grow">
            <ReactECharts style={{ height: 650 }} option={cellCountView} />
            <ReactECharts style={{ height: 650 }} option={accessibilityRateView} />
            <ReactECharts style={{ height: 650 }} option={retainabilityView} />
            <ReactECharts style={{ height: 650 }} option={mobilityView} />
            <ReactECharts style={{ height: 650 }} option={availabilityView} />
            <ReactECharts style={{ height: 650 }} option={resourceUsageView} />
            <ReactECharts style={{ height: 650 }} option={integritySeriesView} />
            <ReactECharts style={{ height: 850 }} option={downlinkThroughView} />
            <ReactECharts style={{ height: 850 }} option={uplinkThroughView} />
            <ReactECharts style={{ height: 650 }} option={ulrssiView} />
        </div>
    )
}


export default ControlledCharts;