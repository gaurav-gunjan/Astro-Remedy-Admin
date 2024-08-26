import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Chat } from "@mui/icons-material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import MyDocument from "../../Components/invoice.js"

import { useStyles, dataTableCustomStyles } from '../../assets/styles.js'
import Loader from "../../Components/loading/Loader.js";
import { secondsToHMS } from "../../utils/services.js";
import CsvDownloader from "../../Components/CsvDownloader.jsx";
import * as HistoryActions from '../../redux/Actions/historyActions.js'
import DataTable from "react-data-table-component";
import DownloadInvoice from "./components/DownloadInvoice.js";
import { CSVLink } from "react-csv";

const ChatHistory = ({ dispatch, chatHistoryData }) => {
    console.log(chatHistoryData)
    const classes = useStyles()
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const deepSearch = (data, searchText) => {
        const searchLower = searchText.toLowerCase();

        const deepSearchObject = (obj) => {
            if (typeof obj === 'object' && obj !== null) {
                return Object.values(obj).some(value => deepSearchObject(value));
            }
            if (Array.isArray(obj)) {
                return obj.some(value => deepSearchObject(value));
            }
            if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
                return obj.toString().toLowerCase().includes(searchLower);
            }
            return false;
        };

        return data && data.filter(item => deepSearchObject(item));
    };

    const filteredData = deepSearch(chatHistoryData, searchTerm);

    useEffect(function () {
        // Dispatching API for Getting Chat History
        dispatch(HistoryActions.getChatHistory())
    }, [])

    //* Data-Table Column
    const chat_history_columns = [
        { name: 'S.No.', selector: (row, index) => filteredData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Chat Id', selector: row => row?._id },
        { name: 'Astrologer', selector: row => row?.astrologerDetails?.astrologerName ? row?.astrologerDetails?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerDetails?.customerName ? row?.customerDetails?.customerName : 'N/A' },
        { name: 'Duration', selector: row => row?.durationInSeconds && secondsToHMS(row?.durationInSeconds) },
        { name: 'Start Time', selector: row => row?.startTime && moment(row?.startTime).format('HH:mm:ss A') },
        { name: 'End Time', selector: row => row?.endTime && moment(row?.endTime).format('HH:mm:ss A') },
        { name: 'Date', selector: row => row?.endTime && moment(row?.createdAt).format('DD-MM-YYYY') },
        { name: 'Status', selector: row => row?.status },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <Chat sx={{ cursor: "pointer" }} onClick={() => navigate('/chatSummary', { state: { astroID: row?.astrologerId, customerID: row?.customerId } })} />
            </div>,
            right: true
        },
        {
            name: 'Invoice',
            cell: row => <DownloadInvoice row={row} name={'Chat'} />,
            right: true
        }
    ];

    return (
        <div className={classes.container}>
            <Loader />

            <div className={classes.box}>
                {chatHistoryData && displayTable()}
            </div>
        </div >

    )

    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <DataTable
                        title={<div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={classes.tableHead}>Chat History  </div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
                                    <input style={{
                                        padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc',
                                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                                        width: '100%', maxWidth: '250px', fontSize: '15px', fontFamily: 'Philosopher', outline: 'none',
                                    }} type='search' value={searchTerm} onChange={handleChange} placeholder='Search' />
                                </div>
                                <CSVLink
                                    filename={"Chat History.csv"}
                                    separator=";"
                                    wrapColumnChar="'"
                                    data={chatHistoryData}> <DownloadIcon style={{ color: 'black' }} /></CSVLink>
                            </div>

                            {/*
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ width: "100%" }}>
                                <DialogTitle id="form-dialog-title">Download Chat History</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Click the button below to download the chat history as a PDF file.
                                    </DialogContentText>
                                    <MyDocument />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog> */}


                        </div>}
                        data={filteredData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                        columns={chat_history_columns}
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
    chatHistoryData: state.history.chatHistoryData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);




