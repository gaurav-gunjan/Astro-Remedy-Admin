import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../componentsssss/common/MainDatatable.jsx";
import * as ExpertiesActions from '../../../redux/actionsssssss/expertiesActions.js';

const MainExpertise = ({ mainExpertiesData, dispatch }) => {
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => mainExpertiesData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Main Expertise', selector: row => row?.mainExpertise },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/main-expertise/edit-main-expertise', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ExpertiesActions.deleteMainExperties({ main_experties: row?.mainExpertise, main_experties_id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Main Expertise
        dispatch(ExpertiesActions.getMainExpertiesData())
    }, []);

    return (
        <>
            <MainDatatable data={mainExpertiesData} columns={categoryColumns} title={'Main Expertise'} url={'/main-expertise/add-main-expertise'} />

        </ >
    );
}

const mapStateToProps = (state) => ({
    mainExpertiesData: state.experites.mainExpertiesData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MainExpertise);