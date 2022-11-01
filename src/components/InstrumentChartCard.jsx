import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../components/Card';
import Chart from '../components/Chart';
import { first_date, last_date } from '../utils/util';



const IntrumentChartCard = ({ year, className }) => {
    const [instruments, setInstruments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let url = null;
        if (year !== undefined) {
            url = `/api/instruments/?from_date=${first_date(year)}&to_date=${last_date(year)}`
        } else {
            url = "/api/instruments"
        }

        fetch(url)
            .then(i => i.json())
            .then(i => {
                setInstruments(i.sort((a, b) => a.amount - b.amount))
            })
    }, [year])


    if(instruments.length === 0) {
        return (<></>)
    }

    const data = instruments.map((i) => {
        return {
            value: i.amount,
            label: i.instrument_name.slice(0, 4),
            name: i.instrument_name,
            id: i.isin
        }
    })

    return (
        <Card title={"Instruments"} className={`grid gap-2 ${className}`}>
            <Chart
                data={data}
                onBarClick={(params) => navigate(`/instruments/${params.data.id}`)}
            />
        </Card>

    );
}

export default IntrumentChartCard;
