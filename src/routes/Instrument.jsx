import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Card from '../components/Card';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendTable from '../components/DividendTable';
import DividendYearCard from '../components/DividendYearCard';
import NoData from '../components/NoData';

function Instrument() {
    let params = useParams();
    const [instrument, setInstrument] = useState(undefined);
    const [sorting, setSorting] = useState({
        column: "date",
        direction: "desc"
    });

    useEffect(() => {
        fetch(`/api/instruments/${params.isin}`)
        .then(i => i.json())
        .then(i => setInstrument(i))
    }, [params.isin])

    if (!instrument) {
        return (
            <Card>
                <NoData />
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-5">
            <CardSingleNumber title={instrument.isin} amount={instrument.instrument_name} className="col-span-2">
                {/* <p className="text-3xl font-bold text-primary">{instrument.instrument_name}</p> */}
            </CardSingleNumber>
            <CardSingleNumber title={"Total"} amount={instrument.amount} currency="kr" />
            <DividendYearCard isin={instrument.isin} className="col-span-3" />
            <Card title={"Dividends"} className="col-span-3">
                <DividendTable
                    sorting={sorting}
                    sortable={true}
                    setSorting={setSorting}
                    search={instrument.isin}
                    className="mt-2"
                />
            </Card>
        </div>
    );
}


export default Instrument;
