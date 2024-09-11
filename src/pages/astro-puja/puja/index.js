import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as AstropujaActions from '../../../redux/actions/astropujaActions.js';

const Puja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astroPujaPujaData: pujaData } = useSelector(state => state.astropujaReducer);

    //* Category DataTable Columns
    const pujaColumns = [
        { name: 'S.No.', selector: row => pujaData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Type', selector: row => row?.type },
        { name: 'Puja Name', selector: row => row?.poojaName },
        { name: 'Short Description', selector: row => row?.shortDescription },
        { name: 'Description', selector: row => row?.description },
        { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-puja/puja/add-puja', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(AstropujaActions.deleteAstroPujaPuja({ poojaId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(AstropujaActions.getAstroPujaPuja())
    }, []);

    return (
        <>
            <MainDatatable data={pujaData} columns={pujaColumns} title={'Puja'} url={'/astro-puja/puja/add-puja'} />

        </ >
    );
}

export default Puja;