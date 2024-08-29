import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../utils/Constants.js";
import logo from '../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as SkillActions from "../../redux/actions/skillsActions.js";
import { connect } from "react-redux";

const Skill = ({ skillsData: categoryData, dispatch }) => {
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => categoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.skill },
        { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/skill/edit-skill', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(SkillActions.deleteSkill({ skill: row?.skill, skill_id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(SkillActions.getSkillData())
    }, []);

    return (
        <>
            <MainDatatable data={categoryData} columns={categoryColumns} title={'Skill'} url={'/skill/add-skill'} />

        </ >
    );
}

const mapStateToProps = (state) => ({
    skillsData: state.skills.skillsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Skill);