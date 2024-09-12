import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as HistoryActions from '../../../../redux/actions/historyActions.js';

const LiveHistory = () => {
    const dispatch = useDispatch();
    const { chatHistoryData } = useSelector(state => state?.history);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row, index) => chatHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'user', selector: row => row?.customerDetails?.customerName ? row?.customerDetails?.customerName : 'N/A' },
        { name: 'Astrologer', selector: row => row?.astrologerDetails?.astrologerName ? row?.astrologerDetails?.astrologerName : 'N/A' },
        { name: 'Total Price', selector: row => parseFloat(row?.totalPrice).toFixed(2) },
        { name: 'Admin Share', selector: row => parseFloat(row?.adminPrice).toFixed(2) },
        { name: 'Astro Share', selector: row => parseFloat(row?.partnerPrice).toFixed(2) },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Chat History
        // dispatch(HistoryActions.getChatHistory());
    }, []);

    return (
        <>
            <MainDatatable data={chatHistoryData} columns={columns} title={'Live History'} />

        </>
    )
};

export default LiveHistory;