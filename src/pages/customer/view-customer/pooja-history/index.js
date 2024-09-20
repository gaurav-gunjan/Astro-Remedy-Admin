import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { secondsToHMS } from "../../../../utils/common-function/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import InvoiceOne from "../../../history/download-invoice/invoice-one";
import * as CustomerActions from '../../../../redux/actions/customerAction';

const PoojaHistory = ({ customerId }) => {
    const dispatch = useDispatch();
    const { poojaHistoryByCustomerIdData } = useSelector(state => state?.customerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => poojaHistoryByCustomerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Duration', selector: row => row?.duration ? secondsToHMS(row?.duration) : 'N/A' },
        { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.endTime ? moment(Number(row?.endTime)).format('hh:mm:ss a') : 'N/A' },
        { name: 'Date', selector: row => row?.endTime ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },
        { name: 'Invoice', cell: row => <InvoiceOne data={row} type={'live'} /> }
    ];

    useEffect(function () {
        //! Dispatching API for Getting Pooja History
        dispatch(CustomerActions.getPoojaHistoryByCustomerId({ customerId }));
    }, []);

    return (
        <>
            <MainDatatable data={poojaHistoryByCustomerIdData} columns={columns} title={'Pooja History'} />

        </>
    )
};

export default PoojaHistory;