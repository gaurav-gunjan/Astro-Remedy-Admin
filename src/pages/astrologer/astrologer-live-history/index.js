import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api_url, base_url, img_url } from "../../../utils/api-routes";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from "../../../redux/actions/astrologerActions.js";
import { DayMonthYear, OnlyTime } from "../../../utils/common-function";
import axios from "axios";

const AstrologerLiveHistory = ({ astroLiveData, dispatch }) => {
    const navigate = useNavigate();
    const [liveHistoryData, setLiveHistoryData] = useState([]);

    //* Datatable Column
    const astrologerColumns = [
        { name: 'S.No.', selector: (row, index) => astroLiveData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Name', selector: row => row?.astrologerName },
        { name: 'Start Time', selector: row => OnlyTime(row?.startTime) },
        { name: 'Start Date', selector: row => DayMonthYear(row?.startTime) },
        { name: 'End Time', selector: row => OnlyTime(row?.endTime) },
        { name: 'End Date', selector: row => DayMonthYear(row?.endTime) },
        { name: 'Status', selector: row => row?.status },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer 
        dispatch(AstrologerActions.getRecentLiveStreaming());
    }, []);


    return (
        <>
            <MainDatatable data={astroLiveData} columns={astrologerColumns} title={'Astrologer Live History'} />

        </>
    );
};

const mapStateToProps = (state) => ({
    astroLiveData: state.astrologer.astroLiveData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstrologerLiveHistory);