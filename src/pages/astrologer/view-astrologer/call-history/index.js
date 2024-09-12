import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as HistoryActions from '../../../../redux/actions/historyActions.js';
import { secondsToHMS } from "../../../../utils/common-function/index.js";

const CallHistory = () => {
    const dispatch = useDispatch();
    const { callHistoryData } = useSelector(state => state?.history);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row, index) => callHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Transaction Id', selector: row => row?.transactionId },
        { name: 'Astrologer', selector: row => row?.astrologerDetails?.astrologerName ? row?.astrologerDetails?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerDetails?.customerName ? row?.customerDetails?.customerName : 'N/A' },
        { name: 'Total Price', selector: row => row?.totalCallPrice && parseFloat(row?.totalCallPrice).toFixed(2) },
        { name: 'Duration', selector: row => row?.durationInSeconds && secondsToHMS(row?.durationInSeconds) },

        { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.status === 'Created' ? "N/A" : row?.endTime && moment(row?.endTime).format('hh:mm:ss a') },
        { name: 'Date', selector: row => row?.endTime ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },

        { name: 'Status', selector: row => row?.status },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Chat History
        // dispatch(HistoryActions.getCallHistory())
    }, []);

    return (
        <>
            <MainDatatable data={callHistoryData} columns={columns} title={'Call History'} />

        </>
    )
};

export default CallHistory;