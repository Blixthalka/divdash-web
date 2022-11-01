import { number } from 'echarts';
import React, { useState, useEffect } from 'react';
import { first_date, last_date } from '../utils/util'
import Table from '../components/Table'
import { get } from '../utils/web';
import { useNavigate } from 'react-router-dom'

function DividendTable({ sorting, setSorting, search, className, sortable = true, maxDividends = 0, year }) {
    const [transactions, setTransactions] = useState([]);

    const headers = [
        {
            name: "Instrument",
            type: "text",
            column_value: "instrument_name",
            f: t => t.instrument_name
        },
        {
            name: "ISIN",
            type: "number",
            column_value: "isin",
            f: t => t.isin
        },
        {
            name: "Date",
            type: "number",
            column_value: "date",
            f: t => t.date
        },
        {
            name: "Amount",
            type: "number",
            column_value: "amount",
            f: t => Math.round(t.amount) + ' kr'
        },
    ]
    const navigate = useNavigate()

    useEffect(() => {
        const query = [
            { key: "sort_direction", value: sorting.direction },
            { key: "sort_column", value: sorting.column },
        ]
        search && query.push({ key: "search", value: search })
        year && query.push({ key: "from_date", value: first_date(year) })
        year && query.push({ key: "to_date", value: last_date(year) })

        get(`/api/dividends`, navigate, query)
            .then(resp => {
                if (maxDividends != 0) {
                    setTransactions(resp.slice(0, maxDividends))
                } else {
                    setTransactions(resp)
                }
            })
    }, [sorting, search, year])

    const data = transactions.map(d => {
        if (d.isin) {
            return {
                ...d,
                onRowClick: () => navigate(`/instruments/${d.isin}`)
            }
        }
        return d
    })

    return (
        <Table
            headers={headers}
            sorting={sorting}
            dataList={data}
            onSortChange={(s) => setSorting(s)}
            className={className}
            sortable={sortable}
        />
    );
}

export default DividendTable;
