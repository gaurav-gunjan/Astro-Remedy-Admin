import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee, secondsToHMS } from "../../../../utils/common-function/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import InvoiceOne from "../../../history/download-invoice/invoice-one/index.js";
import * as CustomerActions from '../../../../redux/actions/customerAction.js';
import { api_urls } from "../../../../utils/api-urls/index.js";

const PujaHistory = ({ customerId }) => {
    const dispatch = useDispatch();
    const { pujaHistoryByCustomerIdData } = useSelector(state => state?.customerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => pujaHistoryByCustomerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName || 'N/A' },
        { name: 'Puja Name', selector: row => row?.poojaId?.pujaName || 'N/A' },
        { name: 'Puja Price', selector: row => IndianRupee(row?.poojaId?.price) || IndianRupee(row?.poojaId?.price) },
        { name: 'Image', cell: row => <img src={api_urls + 'uploads/' + row?.poojaId?.image} alt="Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Assigned Amount', selector: row => IndianRupee(row?.price) },
        { name: 'Puja Date', selector: row => row?.poojaDate ? moment(row?.poojaDate).format('DD MMM YYYY') : 'N/A' },
        { name: 'Puja Time', selector: row => row?.poojaTime ? moment(row?.poojaTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'Status', selector: row => row?.status },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Pooja History
        dispatch(CustomerActions.getPujaHistoryByCustomerId({ customerId }));
    }, []);

    return (
        <>
            <MainDatatable data={pujaHistoryByCustomerIdData} columns={columns} title={'Puja History'} />

        </>
    )
};

export default PujaHistory;