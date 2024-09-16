import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { api_url, base_url, img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import * as AstropujaActionss from '../../../../redux/actions/astropujaActions';
import { YYYYMMDD } from "../../../../utils/common-function";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha } from "../../../../utils/regex-pattern";

const AddPuja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [pujaDetail, setPujaDetail] = useState({ categoryType: stateData ? stateData?.type : '', pujaName: stateData ? stateData?.poojaName : '', shortDescription: stateData ? stateData?.shortDescription : '', description: stateData ? stateData?.description : '', });
    const [inputFieldError, setInputFieldError] = useState({ categoryType: '', pujaName: '', shortDescription: '', description: '', image: '', bulkImage: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });
    const [bulkImage, setBulkImage] = useState(stateData ? stateData?.bannerImages.map(value => { return { file: base_url + value, bytes: '' } }) : []); //* Mutliple File 

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setPujaDetail({ ...pujaDetail, [name]: value });
    };

    //! Handle Image : Normally
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }

        handleInputFieldError("image", null)
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
        }

        handleInputFieldError("image", null)
    };

    // Handle Image :  //! Bulk Image
    const handleBulkImage = (e) => {
        // console.log("Bulk Image length :: ", bulkImage?.length + 1)
        if (bulkImage.length + 1 <= 5) {
            setBulkImage([...bulkImage, {
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            }]);
        } else {
            alert('You have cross your limit bugger')
        }
    }

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { categoryType, pujaName, shortDescription, description } = pujaDetail;
        const { file } = image;

        if (!categoryType) {
            handleInputFieldError("categoryType", "Please Select Category Type")
            isValid = false;
        }
        if (!pujaName) {
            handleInputFieldError("pujaName", "Please Select Puja Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(pujaName)) {
            handleInputFieldError("pujaName", "Please Enter Valid Puja Name")
            isValid = false;
        }
        if (!shortDescription) {
            handleInputFieldError("shortDescription", "Please Enter Short Description")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(shortDescription)) {
            handleInputFieldError("shortDescription", "Please Enter Valid Short Description")
            isValid = false;
        }
        if ((shortDescription.toString().length > 200)) {
            handleInputFieldError("shortDescription", "Please Enter Short Description Less Than 200 Character")
            isValid = false;
        }
        if (!description) {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(description)) {
            handleInputFieldError("description", "Please Enter Valid Description")
            isValid = false;
        }
        if ((description.toString().length > 500)) {
            handleInputFieldError("description", "Please Enter Description Less Than 500 Character")
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Select Image")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating Puja
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Product Data :: ", { ...pujaDetail, image, bulkImage: bulkImage?.map((value) => value?.bytes) })
        const bulkImageArray = bulkImage?.map((value) => value?.bytes);
        const { categoryType, pujaName, shortDescription, description } = pujaDetail;

        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("poojaId", stateData?._id);
                formData.append("type", categoryType);
                formData.append("poojaName", pujaName);
                formData.append("shortDescription", shortDescription);
                formData.append("description", description);

                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-puja/puja')
                }

                //! Dispatching API for Updating Puja
                dispatch(AstropujaActionss.updateAstroPujaPuja(payload))

            } else {
                let formData = new FormData();
                formData.append("type", categoryType);
                formData.append("poojaName", pujaName);
                formData.append("shortDescription", shortDescription);
                formData.append("description", description);

                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-puja/puja')
                }

                //! Dispatching API for Creating Puja
                dispatch(AstropujaActionss.createAstroPujaPuja(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>Add Puja</div>
                    <div onClick={() => navigate("/astro-puja/puja")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {image?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar src={image.file} style={{ height: '300px', minWidth: "50%", borderRadius: "initial" }} />
                                </label>
                                :
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                                    <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.image}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Category Type <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                label="Select Category Type * " variant="outlined" fullWidth
                                name='categoryType'
                                value={pujaDetail?.categoryType}
                                onChange={handleInputField}
                                error={inputFieldError?.categoryType ? true : false}
                                onFocus={() => handleInputFieldError("categoryType", null)}
                            >
                                <MenuItem disabled>---Select Category Type---</MenuItem>
                                <MenuItem value={'PUJA'}>Puja</MenuItem>
                                <MenuItem value={'SPELL'}>Spell</MenuItem>
                            </Select>
                        </FormControl>
                        {inputFieldError?.categoryType && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.categoryType}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Puja Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='pujaName'
                            value={pujaDetail?.pujaName}
                            onChange={handleInputField}
                            error={inputFieldError.pujaName ? true : false}
                            helperText={inputFieldError.pujaName}
                            onFocus={() => handleInputFieldError("pujaName", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Short Description <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='shortDescription'
                            value={pujaDetail?.shortDescription}
                            onChange={handleInputField}
                            error={inputFieldError.shortDescription ? true : false}
                            helperText={inputFieldError.shortDescription}
                            onFocus={() => handleInputFieldError("shortDescription", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <label style={{ color: "#000", marginBottom: "#000", fontSize: "14.5px", color: "grey" }}>Description <span style={{ color: "red" }}>*</span></label>
                            <textarea
                                name='description'
                                value={pujaDetail?.description}
                                onChange={handleInputField}
                                placeholder="Description"
                                rows={8}
                                onFocus={() => handleInputFieldError("description", null)}
                                style={{ minWidth: "100%", maxWidth: "100%", minHeight: "50px", padding: "10px", outline: "none", border: "1px solid #C4C4C4", borderRadius: "3.5px", fontFamily: "Philosopher" }}
                            />
                        </div>
                        {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.description}</div>}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkImage.length > 0 && bulkImage?.map((value, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <Avatar src={value.file} style={{ height: '150px', width: "250px", borderRadius: "initial" }} />
                                    <div onClick={() => setBulkImage(bulkImage.filter((curr, currIndex) => currIndex !== index))} style={{ position: "absolute", top: '-13px', right: '-15px', cursor: "pointer" }}><CrossSvg /></div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>Upload More Images(Max File Count : 5)</div>
                        <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-bulk-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-image" multiple type="file" onChange={handleBulkImage} hidden />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        </>
    );
};

export default AddPuja;