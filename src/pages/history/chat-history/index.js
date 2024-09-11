import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Chat } from "@mui/icons-material";
import { DayMonthYear, OnlyTime, secondsToHMS } from "../../../utils/common-function/index.js";
import DownloadInvoice from "../download-invoice";
import MainDatatable from "../../../componentsssss/common/MainDatatable.jsx";
import * as HistoryActions from '../../../redux/actionsssssss/historyActions.js';

const ChatHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chatHistoryData } = useSelector(state => state?.history);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row, index) => chatHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Chat Id', selector: row => row?._id },
        { name: 'Astrologer', selector: row => row?.astrologerDetails?.astrologerName ? row?.astrologerDetails?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerDetails?.customerName ? row?.customerDetails?.customerName : 'N/A' },
        { name: 'Duration', selector: row => row?.durationInSeconds ? secondsToHMS(row?.durationInSeconds) : 'N/A' },

        // { name: 'Start Time', selector: row => row?.startTime ? OnlyTime(row?.startTime) : 'N/A' },
        // { name: 'End Time', selector: row => row?.endTime ? OnlyTime(row?.endTime) : 'N/A' },
        // { name: 'Date', selector: row => row?.endTime ? DayMonthYear(row?.createdAt) : 'N/A', width: "180px" },

        { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.endTime ? moment(row?.endTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'Date', selector: row => row?.endTime ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },

        { name: 'Status', selector: row => row?.status },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <Chat sx={{ cursor: "pointer" }} onClick={() => navigate(`/history/chat-history/chat-summary/${row?.astrologerDetails?.astrologerName?.split(' ')[0].toLowerCase()}-${row?.customerDetails?.customerName?.split(' ')[0].toLowerCase()}`, { state: { astroID: row?.astrologerId, customerID: row?.customerId } })} />
            </div>,
            right: true
        },
        {
            name: 'Invoice',
            cell: row => <DownloadInvoice row={row} name={'Chat'} />,
            right: true
        }
    ];

    useEffect(function () {
        //! Dispatching API for Getting Chat History
        dispatch(HistoryActions.getChatHistory())
    }, []);

    return (
        <>
            <MainDatatable data={chatHistoryData} columns={columns} title={'Chat History'} />

        </>
    )
};

export default ChatHistory;