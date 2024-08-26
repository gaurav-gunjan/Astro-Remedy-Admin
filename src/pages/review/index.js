import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../Components/common/MainDatatable.jsx";
import * as ReviewActions from "../../redux/Actions/reviewsActions.js";
import { Colors } from "../../assets/styles.js";

const Review = ({ astrologersReviews, dispatch }) => {
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => astrologersReviews.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Customer', selector: row => row?.customer?.customerName },
        { name: 'Astrologer', selector: row => row?.astrologer?.astrologerName },
        { name: 'Rating', selector: row => row.ratings },
        { name: 'Comment', selector: row => row.comments },
        {
            name: "Status",
            cell: (row) => <div onClick={() => dispatch(ReviewActions.updateAstrologerReviewStatus({ status: row.is_verified ? "Verified" : "Unverified", reviewId: row?._id }))} style={{ color: row?.is_verified? Colors?.greenLight : Colors?.red_a, textAlign: "center", padding: "5px 8px", fontFamily: "Philospher", borderRadius: 5, cursor: "pointer",border: "1px solid rgb(102 102 102 / 0.2)", backgroundColor:"rgb(100 100 100 / 0.2)" }}>{row.is_verified? "Verified":"Unverified" }</div>
        },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/review/edit-review', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ReviewActions.deleteAstrologerReivew( row?._id ))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Review
        dispatch(ReviewActions.getAstrologersReviews())
      
    }, []);

    return (
        <>
            <MainDatatable data={astrologersReviews} columns={categoryColumns} title={'Review'} url={'/review/add-review'} />
        </>
    );
}

const mapStateToProps = (state) => ({
    astrologersReviews: state.review.astrologersReviews,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Review);