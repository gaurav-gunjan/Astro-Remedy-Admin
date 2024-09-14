import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Chat } from "@mui/icons-material";
import { secondsToHMS } from "../../../../utils/common-function/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from '../../../../redux/actions/astrologerAction.js';
import DownloadInvoice from "../../../history/download-invoice/index.js";

const ChatHistory = ({ astrologerId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chatHistoryByAstrologerIdData } = useSelector(state => state?.astrologerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row, index) => chatHistoryByAstrologerIdData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" }, width: '80px' },
        { name: 'Chat Id', selector: row => row?._id },
        { name: 'Customers', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Duration', selector: row => row?.duration ? secondsToHMS(row?.duration) : 'N/A' },
        { name: 'Start Time', selector: row => row?.startTime ? moment(Number(row?.startTime)).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.endTime ? moment(Number(row?.endTime)).format('hh:mm:ss a') : 'N/A' },
        { name: 'Date', selector: row => row?.endTime ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },
        {
            name: 'Message',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <Chat sx={{ cursor: "pointer" }} onClick={() => navigate(`/history/chat-history/chat-summary/${row?.astrologerId?.astrologerName?.split(' ')[0].toLowerCase()}-${row?.customerId?.customerName?.split(' ')[0].toLowerCase()}`, { state: { astroID: row?.astrologerId?._id, customerID: row?.customerId?._id } })} />
            </div>,
            center: true, width: "120px"
        },
        // {
        //     name: 'Invoice',
        //     cell: row => <DownloadInvoice row={row} name={'Chat'} />,
        //     center: true, width: "120px"
        // }
    ];

    useEffect(function () {
        //! Dispatching API for Getting Chat History
        dispatch(AstrologerActions.getChatHistoryByAstrologerId({ astrologerId, type: 'chat' }));
    }, []);

    return (
        <>
            <MainDatatable data={chatHistoryByAstrologerIdData} columns={columns} title={'Chat History'} />

        </>
    )
};

export default ChatHistory;