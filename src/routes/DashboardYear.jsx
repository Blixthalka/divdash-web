import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import ButtonIcon from '../components/ButtonIcon';
import Card from '../components/Card';
import CardSingleNumber from '../components/CardSingleNumber';
import DividendMonthCard from '../components/DividendMonthCard';
import DividendTable from '../components/DividendTable';
import InstrumentChartCard from '../components/InstrumentChartCard';
import { ChevronLeftIcon, ChevronRightIcon, CrossIcon } from '../icons/Icons';

function DashboardYear() {
    const [data, setData] = useState(null);
    let params = useParams();

    const year = parseInt(params.year);
    const currentYear = new Date().getFullYear();
    const [sorting, setSorting] = useState({
        column: "date",
        direction: "desc"
    });

    useEffect(() => {
        fetch(`/api/dashboard/?year=${year}`)
            .then(i => i.json())
            .then(i => {
                setData(i)
            })
    }, [year])



    return (
        <div className="max-w-4xl pb-20 mx-auto">
            <div className="grid grid-cols-3 gap-5 ">
                <div className="col-span-3 flex items-center justify-between">

                    <div className="flex items-center space-x-2 ">

                        <Link to={`/dashboard/${year - 1}`}>
                            <ButtonIcon Icon={ChevronLeftIcon} />
                        </Link>


                        <h1 className="text-center text-2xl text-primary">{params.year}</h1>

                        {year === currentYear ?
                            <ButtonIcon Icon={ChevronRightIcon} disabled={true} /> :
                            <Link to={`/dashboard/${year + 1}`}>
                                <ButtonIcon Icon={ChevronRightIcon} />
                            </Link>
                        }
                    </div>
                    <Link to={`/dashboard`}>
                        <ButtonIcon Icon={CrossIcon} />
                    </Link>
                </div>

                <CardSingleNumber title={"Year"} amount={data?.year} currency={"SEK"}  />
                <CardSingleNumber title={"Per Month"} amount={data?.monthly} currency={"SEK"}  />
                <CardSingleNumber title={"Total"} amount={data?.total} currency={"SEK"}  />

                <DividendMonthCard year={params.year} className="col-span-3" />
                <InstrumentChartCard year={params.year} className="col-span-3" />

                <Card
                    title="Dividends"
                    className="col-span-3 "
                >
                    <DividendTable
                        sortable={true}
                        sorting={sorting}
                        setSorting={setSorting}
                        className="mt-2"
                        year={year}
                    />
                </Card>

            </div>

        </div>
    );
}

export default DashboardYear;
