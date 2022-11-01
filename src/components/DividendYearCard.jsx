import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../components/Card';
import Chart from '../components/Chart';
import { BarChartIcon, BarSortedChartIcon } from '../icons/Icons';
import ButtonIcon from './ButtonIcon';


const fillData = (data) => {

    const lastYear = new Date().getFullYear() + 1;
    const firstYear = parseInt(data[0].year);
    let result = []
    for(let year = firstYear; year < lastYear; year++) {
        result.push({
            label: year,
            value: findValue(data, year)
        })
    }
    return result
}

const findValue = (data, year) => {
    let element = data.find(d => d.year === `${year}`)

    console.log(element)
    if (element === undefined) {
        return 0;
    } else {
        return parseInt(element.amount)
    }
}


function DividendYearCard({isin, className}) {
    const [years, setYears] = useState(undefined);
    const [biggestSort, setBiggestSort] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/dividends/date/${isin ? '?isin=' + isin : ''}`)
            .then(i => i.json())
            .then(i => {
                setYears(fillData(i))
            })
    }, [])

    if(years === undefined || years === []) {
        return (<></>)
    }

    const data = years
        .sort(function (a, b) {
            if (biggestSort) {
                return a.value - b.value;
            } else {
                return a.label - b.label;
            }
        })

    return (
        <Card
            title={'Yearly'}
            className={`${className}`}
            headerComponent={
                <ButtonIcon Icon={biggestSort ? BarChartIcon : BarSortedChartIcon} onClick={(e) => {
                    setBiggestSort(!biggestSort)
                }} />
            }
        >
            <Chart data={data} onBarClick={params => navigate(`/dashboard/${params.name}`)} />
        </Card>

    );
}

export default DividendYearCard;
