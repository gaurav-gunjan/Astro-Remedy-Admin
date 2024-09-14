import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../../../assets/svg/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as AstromallActions from '../../../../redux/actions/astromallAction.js';
import { DayMonthYear } from "../../../../utils/common-function";

const Transaction = ({ astrologerId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astromallProductData: pujaHistoryData } = useSelector(state => state.astromallReducer);

    //* Order History DataTable Columns
    const pujaHistoryColumns = [
        { name: 'S.No.', selector: row => pujaHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },

    ];

    useEffect(() => {
        //! Dispatching API for Getting Order History
        dispatch(AstromallActions.getAstromallProduct())
    }, []);

    return (
        <>
            <MainDatatable data={pujaHistoryData} columns={pujaHistoryColumns} title={'Transaction'} />

        </ >
    );
}

export default Transaction;