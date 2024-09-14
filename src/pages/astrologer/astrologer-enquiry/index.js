import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import * as AstrologerActions from "../../../redux/actions/astrologerActions.js";
import { DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg } from "../../../assets/svg/index.js";
import { DeepSearchSpace } from "../../../utils/common-function/index.js";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";

const AstrologerEnquiry = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enquiryAstroData } = useSelector(state => state?.astrologer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(enquiryAstroData, searchText);

    //* Datatable Column
    const columns = [
        { name: "S.No.", selector: (row, index) => enquiryAstroData.indexOf(row) + 1, width: "80px", },
        { name: "Name", selector: (row) => row?.astrologerName, },
        { name: "Email", selector: (row) => row?.email, width: "250px", },
        { name: "Mobile", selector: (row) => row?.phoneNumber, },
        { name: "State", selector: (row) => row?.state ? row?.state : 'N/A', },
        // { name: "Wallet", selector: (row) => row?.wallet_balance.toFixed(2), },
        { name: "Experience", selector: (row) => row?.experience, },
        // { name: "Chat Price", selector: (row) => row?.chat_price, },
        // { name: "Call Price", selector: (row) => row?.call_price, },
        { name: "DOB", selector: (row) => moment(row?.dateOfBirth).format("Do MMM YYYY"), width: "140px", },
        { name: "Created Date", selector: (row) => moment(row?.createdAt).format("Do MMM YYYY"), width: "140px", },
        { name: 'Status(Enquiry)', selector: row => <div style={{ cursor: 'pointer' }} onClick={() => dispatch(AstrologerActions.updateEnquiryStatus({ astrologerId: row?._id }))}>{row?.isVerified ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "140px", center: true, },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div onClick={() => navigate("/astrologer/edit-astrologer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                    <div onClick={() => dispatch(AstrologerActions.deleteAstrologer({ astrologerId: row?._id, type: 'Enquiry' }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
                </div>
            ),
            center: true,
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer 
        dispatch(AstrologerActions.getAstrologerInquiry());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Astrologer Enquiry'} data={enquiryAstroData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </>
    );
};

export default AstrologerEnquiry;