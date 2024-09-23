import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Chat } from "@mui/icons-material";
import { IndianRupee, secondsToHMS } from "../../../../utils/common-function/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import InvoiceOne from "../../../history/download-invoice/invoice-one";
import * as CustomerActions from '../../../../redux/actions/customerAction';

const ChatHistory = ({ customerId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chatHistoryByCustomerIdData } = useSelector(state => state?.customerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => chatHistoryByCustomerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Duration', selector: row => row?.duration ? secondsToHMS(row?.duration) : 'N/A' },
        { name: 'Total Price', selector: row => row?.totalPrice ? IndianRupee(parseFloat(row?.totalPrice).toFixed(2)) : 'N/A' },
        { name: 'Start Time', selector: row => row?.startTime ? moment(Number(row?.startTime)).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.endTime ? moment(Number(row?.endTime)).format('hh:mm:ss a') : 'N/A' },
        { name: 'Date', selector: row => row?.endTime ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },
        {
            name: 'Message',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <Chat sx={{ cursor: "pointer" }} onClick={() => navigate(`/history/chat-history/chat-summary/${row?.astrologerId?.astrologerName?.split(' ')[0].toLowerCase()}-${row?.customerId?.customerName?.split(' ')[0].toLowerCase()}`, { state: { astroID: row?.astrologerId?._id, customerID: row?.customerId?._id } })} />
            </div>,
            centre: true, width: "120px"
        },
        { name: 'Invoice', cell: row => <InvoiceOne data={row} type={'Chat'} /> }
    ];

    useEffect(function () {
        //! Dispatching API for Getting Chat History
        dispatch(CustomerActions.getChatHistoryByCustomerId({ customerId, type: 'chat' }));
    }, []);

    return (
        <>
            <MainDatatable data={chatHistoryByCustomerIdData} columns={columns} title={'Chat History'} />

        </>
    )
};

export default ChatHistory;