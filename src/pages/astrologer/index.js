import moment from "moment";
import Select from 'react-select';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogContent, FormControl, Grid, TextField, Typography } from "@mui/material";
import { Color } from "../../assets/colors/index.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeepSearchSpace } from "../../utils/common-function/index.js";
import MainDatatable from "../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../components/datatable/DatatableHeading.jsx";
import { CrossSvg, DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg, ViewSvg } from "../../assets/svg/index.js";
import * as AstrologerActions from "../../redux/actions/astrologerAction";

const Astrologer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerData } = useSelector(state => state?.astrologerReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(astrologerData, searchText);

    const [walletModal, setWalletModal] = useState(false);

    const [inputFieldDetail, setInputFieldDetail] = useState({ amount: '' });
    const [inputFieldError, setInputFieldError] = useState({});
    const multiOptions = astrologerData && [{ value: 'all', label: 'Select All' }, ...astrologerData?.map(item => ({ value: item?._id, label: item?.astrologerName ? item?.astrologerName : null }))]; //! multi-Page Option
    const [multi, setMulti] = useState([]);

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //* Handle multi Page Option 
    const handleChangeMultiOption = (selectedItems) => {
        console.log("Selected Items :: ", selectedItems)
        if (selectedItems?.some(item => item?.value === 'all')) {
            setMulti(astrologerData?.map(item => item?._id));
        } else {
            const selectedIds = selectedItems && selectedItems?.map(item => item?.value !== 'all' ? item?.value : null)?.filter(Boolean);
            setMulti(selectedIds);
        }
    };

    //! Handle Submit : Wallet
    const handleSubmit = () => {
        console.log({ ...inputFieldDetail, multi });

        const payload = {
            data: {
                transactions: multi.map(value => { return { astrologerId: value, amount: inputFieldDetail?.amount } })
            },
            onComplete: () => {
                setWalletModal(false)
                setMulti([])
                setInputFieldDetail({ amount: '' })
            }
        };

        //! Dispatching API For Deduct Astrologer Wallet
        dispatch(AstrologerActions.updateWalletByAstrologerId(payload));
    };

    const [state, setState] = useState({ editModalOpen: false, selectedAstro: null });
    const { editModalOpen, selectedAstro } = state;
    const handleEdit = (rowData) => { handleStateChange({ editModalOpen: true, selectedAstro: rowData }) };
    const handleStateChange = (data) => { setState({ ...state, ...data }) };

    //* Datatable Column
    const columns = [
        { name: "S.No.", selector: (row, index) => filteredData.indexOf(row) + 1, width: "80px", },
        { name: "Name", selector: (row) => row?.astrologerName, },
        { name: "Email", selector: (row) => row.email, width: "250px", },
        { name: "Mobile", selector: (row) => row.phoneNumber, },
        // { name: "Wallet", selector: (row) => row.wallet_balance.toFixed(2), width: '100px' },
        // { name: "Experience", selector: (row) => row.experience, },
        // { name: "Chat Price", selector: (row) => row.chat_price, },
        // { name: "Call Price", selector: (row) => row.call_price, },
        { name: "Created Date", selector: (row) => moment(row.createdAt).format("Do MMM YYYY"), width: "140px", },
        { name: 'Status(Verified)', selector: row => <div style={{ cursor: 'pointer' }} onClick={() => dispatch(AstrologerActions?.verifyAstrologerProfile({ isVerified: row.isVerified ? "false" : "true", astrologerId: row?._id }))}>{row?.isVerified ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "140px", centre: true, },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate("/astrologer/view-astrologer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><ViewSvg /></div>
                <div onClick={() => navigate("/astrologer/edit-astrologer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                {/* <div onClick={() => dispatch(AstrologerActions.deleteAstrologerById({ astrologerId: row._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div> */}
                <MoreVertIcon onClick={() => handleEdit(row)} sx={{ cursor: "pointer" }} />
            </div>,
            width: "200px", centre: true,
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer 
        dispatch(AstrologerActions.getAstrologer());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'List Of Astrologers'} data={astrologerData} url={'/astrologer/add-astrologer'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                    <div onClick={() => setWalletModal(true)} style={{ backgroundColor: Color.primary, color: Color.white, padding: "5px 15px", borderRadius: "5px", cursor: 'pointer' }}>Wallet</div>
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>

            {/* Wallet Modal */}
            <Dialog open={walletModal} >
                <DialogContent PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } } }}>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                <div>Wallet</div>
                                <div onClick={() => setWalletModal(false)} style={{ cursor: "pointer" }}><CrossSvg /></div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <FormControl fullWidth>
                                <Select
                                    isMulti
                                    options={multiOptions}
                                    value={multiOptions?.filter(option => multi.includes(option.value))}
                                    onChange={handleChangeMultiOption}
                                    styles={{
                                        control: (base, state) => ({ ...base, fontSize: "14px", minHeight: "45px", maxHeight: "150px", overflowY: "scroll" }),
                                        option: (base) => ({ ...base, fontSize: '12px', padding: '5px 10px', }),
                                        menu: (base) => ({ ...base, fontSize: '12px', zIndex: 1000, }),
                                        clearIndicator: (base) => ({ ...base, alignSelf: 'flex-start', padding: '10px 2px 0 0', cursor: 'pointer', }),
                                    }}
                                    onFocus={() => handleInputFieldError("multi", null)}
                                />
                            </FormControl>
                            {inputFieldError?.multi && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.multi}</div>}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} >
                            <TextField
                                label={<>Amount <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                                name='amount'
                                value={inputFieldDetail?.amount}
                                onChange={handleInputField}
                                error={inputFieldError.amount ? true : false}
                                helperText={inputFieldError.amount}
                                onFocus={() => handleInputFieldError("amount", null)}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6} >
                            <TextField
                                label={<>Type</>} variant='outlined' fullWidth disabled
                                value={'Deduct'}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            {/* Change Status */}
            <Dialog open={editModalOpen} >
                <DialogContent sx={{ minWidth: "300px", maxWidth: "500px" }}>
                    <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "10px" }} >
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "600" }}>{selectedAstro?.astrologerName}</Typography>
                            <div onClick={() => handleStateChange({ editModalOpen: false })} style={{ backgroundColor: "grey", color: "#fff", cursor: "pointer", padding: "2px 10px 3px 10px", borderRadius: "30px" }}>x</div>
                        </div>

                        <Grid container spacing={3} >
                            <Grid item xs={5}>Change Chat Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => dispatch(AstrologerActions.changeAstrologerChatStatus({
                                    data: { astrologerId: selectedAstro?._id, chat_status: selectedAstro?.chat_status == "online" ? "offline" : "online" },
                                    onComplete: () => handleStateChange({ editModalOpen: false })
                                }))} style={{ backgroundColor: selectedAstro?.chat_status == "online" ? "green" : "red", color: "#fff", width: '200px', textWrap: "nowrap" }}>Chat Status</Button>
                            </Grid>

                            <Grid item xs={5}>Change Call Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => dispatch(AstrologerActions.changeAstrologerCallStatus({
                                    data: { astrologerId: selectedAstro?._id, call_status: selectedAstro?.call_status == "online" ? "offline" : "online" },
                                    onComplete: () => handleStateChange({ editModalOpen: false })
                                }))} style={{ backgroundColor: selectedAstro?.call_status == "online" ? "green" : "red", color: "#fff", width: '200px', }}>Call Status</Button>
                            </Grid>

                            <Grid item xs={5}>Change Video Call Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => dispatch(AstrologerActions.changeAstrologerVideoCallStatus({
                                    data: { astrologerId: selectedAstro?._id },
                                    onComplete: () => handleStateChange({ editModalOpen: false })
                                }))} style={{ backgroundColor: selectedAstro?.video_call_status == "online" ? "green" : "red", color: "#fff", width: '200px', }}>Video Call Status</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
        </>
    );
};

export default Astrologer;