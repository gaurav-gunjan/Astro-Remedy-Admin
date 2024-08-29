import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../utils/Constants.js";
import logo from '../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as RemediesActions from "../../redux/actions/remediesActions.js";

const Remedies = ({ remediesData, dispatch }) => {
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => remediesData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Remedies', selector: row => row?.title },
        { name: 'Description', selector: row => row?.description },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/remedies/edit-remedies', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(RemediesActions.deleteRemedy({ remedy_id: row?._id, remedy: row?.remedy }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(RemediesActions.getRemediesData())
    }, []);

    return (
        <>
            <MainDatatable data={remediesData} columns={categoryColumns} title={'Remedies'} url={'/remedies/add-remedies'} />

        </ >
    );
}

const mapStateToProps = (state) => ({
    remediesData: state.remedies.remediesData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Remedies);