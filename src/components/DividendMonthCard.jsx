import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { BarChartIcon, BarSortedChartIcon } from '../icons/Icons';
import { first_date, last_date } from '../utils/util';
import ButtonIcon from './ButtonIcon';

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const fillData = (data, year) => {
    let result = []
    for (let i = 1; i < 13; i++) {
        result.push({
            label: i - 1,
            value: findValue(data, i, year)
        })
    }
    return result
}

const findValue = (data, month, year) => {
    let label = `${year}-`
    if (month < 10) {
        label += "0"
    }
    label += month;

    let element = data.find(d => d.month === label)

    console.log(element)
    if (element === undefined) {
        return '0';
    } else {
        return element.amount
    }
}

function DividendMonthCard({ year, className }) {
    const [yearData, setYearData] = useState(undefined);
    const [biggestSort, setBiggestSort] = useState(false)

    useEffect(() => {
        fetch(`/api/dividends/date/?type=month&from_date=${first_date(year)}&to_date=${last_date(year)}`)
            .then(i => i.json())
            .then(i => {
                setYearData(fillData(i, year))
            })
    }, [year])

    if (yearData === undefined || yearData.length === 0) {
        return (<></>)
    }

    let data = yearData
        .sort(function (a, b) {
            if (biggestSort) {
                return a.value - b.value;
            } else {
                return a.label - b.label;
            }
        }).map((elem) => {
            return {
                label: months[elem.label],
                value: elem.value
            }
        })

    return (
        <Card
            title={'Monthly'}
            className={`${className}`}
            headerComponent={
                <ButtonIcon Icon={biggestSort ? BarChartIcon : BarSortedChartIcon} onClick={(e) => {
                    setBiggestSort(!biggestSort)
                }} />
            }
        >
            <Chart data={data} />
        </Card>
    );
}

export default DividendMonthCard;
