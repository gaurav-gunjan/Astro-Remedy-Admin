import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as HistoryActions from '../../../redux/actions/historyActions.js';
import { getAPI } from "../../../utils/api-function/index.js";

const GiftHistory = () => {
    const dispatch = useDispatch();
    // const { chatHistoryData } = useSelector(state => state?.history);
    const [chatHistoryData, setChatHistoryData] = useState([]);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row, index) => chatHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'User', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' },
        { name: 'Total Price', selector: row => parseFloat(row?.totalPrice).toFixed(2) },
        { name: 'Admin Share', selector: row => parseFloat(row?.adminPrice).toFixed(2) },
        { name: 'Astro Share', selector: row => parseFloat(row?.partnerPrice).toFixed(2) },
    ];

    useEffect(function () {
        const getGiftHistory = async () => {
            try {
                const { data } = await getAPI('api/admin/get_all_gift_history');
                setChatHistoryData(data?.results)
            } catch (error) {
                console.log(error);
            }
        }
        //! Dispatching API for Getting Gift History
        getGiftHistory();
    }, []);

    return (
        <>
            <MainDatatable data={chatHistoryData} columns={columns} title={'Gift History'} />

        </>
    )
};

export default GiftHistory;