import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from '../../../../redux/actions/astrologerAction.js';

const Transaction = ({ astrologerId }) => {
    const dispatch = useDispatch();
    const { transactionByAstrologerIdData } = useSelector(state => state?.astrologerReducer);

    //* Order History DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => transactionByAstrologerIdData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },

    ];

    useEffect(function () {
        //! Dispatching API for Getting Gift History
        dispatch(AstrologerActions.getTransactionByAstrologerId({ astrologerId }));
    }, []);

    return (
        <>
            <MainDatatable data={transactionByAstrologerIdData} columns={columns} title={'Transaction'} />

        </ >
    );
}

export default Transaction;