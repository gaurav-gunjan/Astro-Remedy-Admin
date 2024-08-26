import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import moment from "moment";

import { useStyles, dataTableCustomStyles } from '../../assets/styles.js'
import { secondsToHMS } from "../../utils/services.js";
import Loader from "../../Components/loading/Loader.js";
import CsvDownloader from "../../Components/CsvDownloader.jsx";
import * as HistoryActions from '../../redux/Actions/historyActions.js'
import DownloadInvoice from "./components/DownloadInvoice.js";
import MyDocument from "../../Components/invoice.js";
import { usePDF } from "@react-pdf/renderer";
import DownloadIcon from '@mui/icons-material/Download';

const CallHistory = ({ dispatch, callHistoryData }) => {
    const classes = useStyles()
    const [instance, updateInstance] = usePDF({ document: (<MyDocument />) });
    
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    //* Data-Table Column
    const call_history_columns = [
        { name: 'S.No.', selector: (row, index) => callHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Transaction Id', selector: row => row?.transactionId },
        { name: 'Astrologer', selector: row => row?.astrologerDetails?.astrologerName ? row?.astrologerDetails?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerDetails?.customerName ? row?.customerDetails?.customerName : 'N/A' },
        { name: 'Total Price', selector: row => row?.totalCallPrice && parseFloat(row?.totalCallPrice).toFixed(2) },
        { name: 'Duration', selector: row => row?.durationInSeconds && secondsToHMS(row?.durationInSeconds) },
        { name: 'Start Time', selector: row => row?.startTime && moment((row?.startTime)).format('HH:mm:ss A') },
        { name: 'End Time',  selector: row => row?.status === 'Created' ? "'N/A'" : row?.endTime && moment((row?.endTime)).format('HH:mm:ss A')  },
        { name: 'Date', selector: row => row?.createdAt && moment(row?.createdAt).format('DD-MM-YYYY') },
        { name: 'Status', selector: row => row?.status },
        {
            name: 'Invoice',
            cell: row => <DownloadInvoice row={row} name={'Call'} />,
            right: true
        }
    ];

    useEffect(function () {
        // Dispatching API for Getting Call History
        dispatch(HistoryActions.getCallHistory())
    }, [])

    return (
        <div className={classes.container}>
            <Loader />
            <div className={classes.box}>
                {callHistoryData && displayTable()}
            </div>
        </div >

    );
    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <DataTable
                        title={<div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={classes.tableHead}>Call History</div>
                            <div style={{  display: "flex", justifyContent: "flex-end", alignItems:"center",  }}>
                            <input style={{
                                padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc',
                                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                                width: '100%', maxWidth: '250px', fontSize: '15px', fontFamily: 'Philosopher', outline: 'none',
                            }} type='search' value={searchTerm} onChange={handleChange} placeholder='Search' />
                        </div>
                        </div>}
                        data={callHistoryData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                        columns={call_history_columns}
                        pagination
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={5}
                        customStyles={dataTableCustomStyles}
                    />
                </Grid>
            </Grid>
        )
    }
};

const mapStateToProps = state => ({
    callHistoryData: state.history.callHistoryData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(CallHistory);
