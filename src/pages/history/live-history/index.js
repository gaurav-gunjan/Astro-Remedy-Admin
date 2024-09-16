import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../components/common/MainDatatable.jsx";

const LiveHistory = () => {
    const dispatch = useDispatch();
    const { astroLiveData } = useSelector(state => state?.astrologerReducer);

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => astroLiveData.indexOf(row) + 1, width: "80px", },
        { name: 'Name', selector: row => row?.astrologerName },
        { name: 'Start Date', selector: row => row?.startTime ? moment(row?.startTime).format('DD-MM-YYYY') : 'N/A' },
        { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('HH:mm:ss A') : 'N/A' },
        { name: 'End time', selector: row => row?.endTime ? moment(row?.endTime).format('HH:mm:ss A') : 'N/A' },
        { name: 'Status', selector: row => row?.status },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer 
        // dispatch(AstrologerActions.getRecentLiveStreaming());
    }, []);


    return (
        <>
            <MainDatatable data={astroLiveData} columns={astrologerColumns} title={'Live History'} />

        </>
    );
};

export default LiveHistory;