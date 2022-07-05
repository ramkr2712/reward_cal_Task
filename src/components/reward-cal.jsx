
import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import DatePicker from "react-datepicker";
import styled from 'styled-components'

import { getTransactionDetailOfCustomer } from '../api/reward-cal';

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "./reward-cal.css";

import { JAN, FEB, MAR, APR, MAY, JUN, JUL,
    AUG, SEPT, OCT, NOV, DEC } from '../constant/monthname';
import {NO_RECORDS_FOUND} from '../constant/cust-transactions';

export default function RewardCalculator() {
    const [data, setData] = useState([]);
    const [searchClicked, setSearchClicked] = useState(true);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 90);
    //setting start date to 3 months before
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(new Date());
    useEffect(() => {
        getTransactions();
    }, [searchClicked]);

    const getTransactions = () => {
        if(searchClicked){
            getTransactionDetailOfCustomer(startDate, endDate).then((rewardsData) => {
                setSearchClicked(false);
                setData(rewardsData);
            });
        }        
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Jan',
                accessor: JAN,
            },
            {
                Header: 'Feb',
                accessor: FEB,
            },
            {
                Header: 'Mar',
                accessor: MAR,
            },
            {
                Header: 'Apr',
                accessor: APR,
            },
            {
                Header: 'May',
                accessor: MAY,
            },
            {
                Header: 'Jun',
                accessor: JUN,
            },
            {
                Header: 'Jul',
                accessor: JUL,
            },
            {
                Header: 'Aug',
                accessor: AUG,
            },
            {
                Header: 'Sep',
                accessor: SEPT,
            },
            {
                Header: 'Oct',
                accessor: OCT,
            },
            {
                Header: 'Nov',
                accessor: NOV,
            },
            {
                Header: 'Dec',
                accessor: DEC,
            },
            {
                Header: 'Total Rewards',
                accessor: 'total',
            }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const Styles = styled.div`
        padding: 1rem;

        table {
            border-spacing: 0;
            border: 1px solid black;

            tr {
            :last-child {
                td {
                border-bottom: 0;
                }
            }
            }

            th,
            td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
            }
        }`;

    return (
        <Styles>
            <div >
                <div className="search">
                    <div className="from">
                        <label>From</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="to">
                        <label>To</label>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                    <button onClick={() => { setSearchClicked(true) }}>Search</button>
                </div>
                {data.length === 0 ? <div className="no-data">{NO_RECORDS_FOUND}</div> :
                    <table {...getTableProps()} className="table">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} className="tableHeading">{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} className= {i%2 === 0 ? `custrow` : ''}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()} className="tableData">{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </Styles>)

}