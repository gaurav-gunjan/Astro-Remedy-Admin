import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DeepSearchSpace, secondsToHMS } from "../../../utils/common-function/index.js";
import DownloadInvoice from "../download-invoice";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import * as HistoryActions from '../../../redux/actions/historyAction';
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";

const VideoCallHistory = () => {
    const dispatch = useDispatch();
    const { callHistoryData } = useSelector(state => state?.historyReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(callHistoryData, searchText);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row, index) => callHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Astrologer', selector: row => row?.astrologerDetails?.astrologerName ? row?.astrologerDetails?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerDetails?.customerName ? row?.customerDetails?.customerName : 'N/A' },
        { name: 'Total Price', selector: row => row?.totalCallPrice && parseFloat(row?.totalCallPrice).toFixed(2) },
        { name: 'Duration', selector: row => row?.durationInSeconds && secondsToHMS(row?.durationInSeconds) },

        { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.endTime ? moment(row?.endTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },

        { name: 'Status', selector: row => row?.status }
    ];

    useEffect(function () {
        //! Dispatching API for Getting Call History
        dispatch(HistoryActions.getCallHistory())
    }, [])

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Video Call History'} data={callHistoryData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </>
    );
};

export default VideoCallHistory;