import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";

import { dataTableCustomStyles, useStyles } from '../../assets/styles'
import CsvDownloader from "../../components/features/CsvDownloader.jsx";
import Loader from "../../components/features/Loader.jsx";

const UsersGiftHistory = ({ giftHistoryData = [] }) => {
    const classes = useStyles()

    //* Data-Table Column
    const gift_history_columns = [
        { name: 'S.No.', selector: (row, index) => giftHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'User', selector: row => row?.skill },
        { name: 'Send To', selector: row => row?.sendTo },
        { name: 'Gift', selector: row => row?.gift },
        // {
        //     name: 'Action',
        //     cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
        //         <Edit sx={{ cursor: "pointer" }} onClick={() => handleOpen(row)} />
        //     </div>,
        //     right: true
        // }
    ];

    return (
        <div className={classes.container}>
            <Loader />
            <div className={classes.box}>
                {displayTable()}
            </div>
        </div >

    );
    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <DataTable
                        title={<div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={classes.tableHead}>User Gift History</div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <CsvDownloader data={giftHistoryData} />
                            </div>
                        </div>}
                        data={giftHistoryData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                        columns={gift_history_columns}
                        pagination
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={5}
                        customStyles={dataTableCustomStyles}
                    />
                </Grid>
            </Grid>
        )
    }
};

export default UsersGiftHistory;