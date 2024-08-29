import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../utils/Constants.js";
import logo from '../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as ExpertiesActions from '../../redux/actions/expertiesActions.js';

const Expertise = ({ expertiesData, dispatch }) => {
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => expertiesData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Expertise', selector: row => row?.expertise },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/expertise/edit-expertise', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ExpertiesActions.deleteExperties({ experties: row?.expertise, experties_id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(ExpertiesActions.getExpertiesData())
    }, []);

    return (
        <>
            <MainDatatable data={expertiesData} columns={categoryColumns} title={'Expertise'} url={'/expertise/add-expertise'} />

        </ >
    );
}

const mapStateToProps = (state) => ({
    expertiesData: state.experites.expertiesData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Expertise);