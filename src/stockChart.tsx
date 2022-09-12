import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { 
    IDataItemResult,
    IDataRangeQuery,
    useData
} from './useData';
import { toSeries } from './utils/toSeries';

export interface IStockChartProps {
    query: IDataRangeQuery
}

function createOptions(data: Array<IDataItemResult>) {
    return {
        title: {
            text: 'BH Stock Chart'
        },
        series: [
            {
                type: 'ohlc',
                name: 'OHLC',
                data: toSeries<IDataItemResult>(data, [ 
                    'date',
                    'open',
                    'high',
                    'low',
                    'close'
                ])
            },
            {
                type: 'column',
                name: 'Volume',
                data: toSeries<IDataItemResult>(data, [
                    'date',
                    'volume'
                ]),
                yAxis: 1
            }
        ],
        xAxis: {
            title: {
                text: ''
            },
            type: 'datetime',
            crosshair: true
        },
        yAxis: [{
            title: {
                text: ''
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }, {
            title: {
                text: ''
            },
            labels: {
                enabled: false
            },
            name: 'Volume',
            top: '80%',
            height: '20%',
            offset: 0
        }]
    };
}

export const StockChart = (props: IStockChartProps) => {
    const { query } = props;

    const data = useData(query);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType="stockChart"
            options={createOptions(data)}
            
        />
    )
};