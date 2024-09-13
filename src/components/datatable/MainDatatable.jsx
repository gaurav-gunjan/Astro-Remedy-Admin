import React from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux';
import LogoIcon from '../../assets/images/logo.png'
import { DataTableCustomStyles } from '../../assets/styles/datatable';


const MainDatatable = ({ data, columns }) => {
    const { isLoading } = useSelector(state => state?.dashboard)

    return (
        <>
            {isLoading ?
                <div style={{ color: "black", textAlign: "center", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontFamily: 'Philosopher', animation: 'rotation 2s infinite linear' }}>
                    <img src={LogoIcon} style={{ height: "100px", height: "100px" }} alt="" />
                </div>
                : <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    customStyles={DataTableCustomStyles}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
                    fixedHeader
                />}
        </>
    )
}

export default MainDatatable;