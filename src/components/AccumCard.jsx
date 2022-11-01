import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';


function AccumCard({ className }) {
    const [accum, setAccum] = useState(undefined);

    useEffect(() => {
        fetch(`/api/dividends/accumulated`)
            .then(i => i.json())
            .then(i => {
                setAccum(i)
            })
    }, [])

    if (!accum || accum.length <= 1) {
        return (<></>)
    }

    let option = {
        textStyle: {
            color: '#94a3b8',
            fontFamily: 'Inter, sans-serif',
        },
        xAxis: {
            type: 'time',

            axisLabel: {
                fontSize: 14,
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 14,
            }
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 14
            },
            axisPointer: {
                type: 'line'
            }
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            top: '10%',
            containLabel: true
        },
        series: [
            {
                data: accum?.map(d => [d.date, d.amount]),
                type: 'line',
                color: '#334155',
                showSymbol: false,

            }
        ]
    };


    return (
        <Card title={'Accumulated'} className={`${className}`}>
            {accum &&
                <ReactECharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                />}
        </Card>

    );
}

export default AccumCard;
