import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from '../../../../redux/actions/astrologerAction.js';

const GiftHistory = ({ astrologerId }) => {
    const dispatch = useDispatch();
    const { giftHistoryByAstrologerIdData } = useSelector(state => state?.astrologerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => giftHistoryByAstrologerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'User', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' },
        { name: 'Total Price', selector: row => parseFloat(row?.totalPrice).toFixed(2) },
        { name: 'Admin Share', selector: row => parseFloat(row?.adminPrice).toFixed(2) },
        { name: 'Astro Share', selector: row => parseFloat(row?.partnerPrice).toFixed(2) },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Gift History
        dispatch(AstrologerActions.getGiftHistoryByAstrologerId({ astrologerId }));
    }, []);

    return (
        <>
            <MainDatatable data={giftHistoryByAstrologerIdData} columns={columns} title={'Gift History'} />

        </>
    )
};

export default GiftHistory;