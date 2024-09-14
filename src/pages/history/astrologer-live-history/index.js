import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from "../../../redux/actions/astrologerActions.js";
import { DayMonthYear, OnlyTime } from "../../../utils/common-function";

const AstrologerLiveHistory = () => {
    const dispatch = useDispatch();
    const { astroLiveData } = useSelector(state => state?.astrologer);

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => astroLiveData.indexOf(row) + 1, width: "80px", },
        { name: 'Name', selector: row => row?.astrologerName },
        { name: 'Start Date', selector: row => DayMonthYear(row?.startTime) },
        { name: 'Start Time', selector: row => OnlyTime(row?.startTime) },  //! Same as Moment
        { name: 'End Time', selector: row => OnlyTime(row?.endTime) },
        // { name: 'Start Date', selector: row => row?.startTime ? moment(row?.startTime).format('DD-MM-YYYY') : 'N/A' },
        // { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('HH:mm:ss A') : 'N/A' },
        // { name: 'End time', selector: row => row?.endTime ? moment(row?.endTime).format('HH:mm:ss A') : 'N/A' },
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

export default AstrologerLiveHistory;