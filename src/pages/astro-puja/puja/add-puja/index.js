import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { img_url } from "../../../../utils/api-routes";
import { UploadImageSvg } from "../../../../assets/svg";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha, Regex_Accept_Number } from "../../../../utils/regex-pattern";
import * as AstropujaActions from '../../../../redux/actions/astropujaAction';
import 'react-image-crop/dist/ReactCrop.css';

const AddPuja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [pujaDetail, setPujaDetail] = useState({ pujaName: stateData ? stateData?.pujaName : '', pujaPrice: stateData ? stateData?.price : '', description: stateData ? stateData?.description : '' });
    const [inputFieldError, setInputFieldError] = useState({ pujaName: '', pujaPrice: '', description: '', image: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });

    const [crop, setCrop] = useState({
        unit: '%', // Crop dimensions in percentage
        width: 50, // Starting width of the crop box
        aspect: 1 / 1 // Aspect ratio of 1:1 for square crop
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
            setIsEditing(true);
        }

        handleInputFieldError("image", null)
    };

    const onImageLoad = useCallback((e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        const initialCrop = centerCrop(
            makeAspectCrop(
                { unit: '%', width: 50 },
                1 / 1,
                naturalWidth,
                naturalHeight
            ),
            naturalWidth,
            naturalHeight
        );
        setCrop(initialCrop);
        setImageRef(e.currentTarget);
    }, []);

    const onCropComplete = (crop) => setCompletedCrop(crop);

    const applyCrop = async () => {
        if (!completedCrop || !imageRef) return;

        const canvas = document.createElement('canvas');
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            imageRef,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );

        canvas.toBlob((blob) => {
            if (blob) {
                const croppedImageUrl = URL.createObjectURL(blob);
                setImage({ file: croppedImageUrl, bytes: blob });
                setIsEditing(false); // Hide editor after cropping
            }
        });
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
            setIsEditing(true);
        }

        handleInputFieldError("image", null)
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { pujaName, pujaPrice, description } = pujaDetail;
        const { file } = image;

        if (!pujaName) {
            handleInputFieldError("pujaName", "Please Select Puja Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(pujaName)) {
            handleInputFieldError("pujaName", "Please Enter Valid Puja Name")
            isValid = false;
        }

        if (!pujaPrice) {
            handleInputFieldError("pujaPrice", "Please Enter Puja Price")
            isValid = false;
        }
        if (pujaPrice <= 0) {
            handleInputFieldError("pujaPrice", "Please Enter Valid Puja Price (Greater Than 0)")
            isValid = false;
        }
        if (!Regex_Accept_Number.test(pujaPrice)) {
            handleInputFieldError("pujaPrice", "Please Enter Valid Puja Price")
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
        if ((description.toString().length > 2000)) {
            handleInputFieldError("description", "Please Enter Description Less Than 2000 Character")
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

        if (handleValidation()) {
            console.log("Puja Data :: ", { ...pujaDetail, image });
            const { pujaName, pujaPrice, description } = pujaDetail;

            if (stateData) {
                let formData = new FormData();
                formData.append("pujaId", stateData?._id);
                formData.append("pujaName", pujaName);
                formData.append("price", pujaPrice);
                formData.append("description", description);
                formData.append("image", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-puja/puja')
                }

                //! Dispatching API for Updating Puja
                dispatch(AstropujaActions.updatePuja(payload));

            } else {
                let formData = new FormData();
                formData.append("pujaName", pujaName);
                formData.append("price", pujaPrice);
                formData.append("description", description);
                formData.append("image", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-puja/puja')
                }

                //! Dispatching API for Creating Puja
                dispatch(AstropujaActions.createPuja(payload));
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
                                    <div style={{ height: '300px' }}>
                                        <Avatar src={image.file} style={{ height: '100%', width: '100%', borderRadius: "initial", objectFit: 'contain' }} />
                                    </div>
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

                        {/* Image Editor with Toolbar at the Top */}
                        {isEditing && (
                            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: '1000', backgroundColor: Color.white, border: '1px solid #ccc', padding: '10px', display: 'flex', flexDirection: 'column', gap: '50px', justifyContent: 'center', alignItems: 'center' }}>
                                <ReactCrop crop={crop} onChange={(newCrop) => setCrop(newCrop)} onComplete={onCropComplete}>
                                    <img src={image.file} onLoad={onImageLoad} alt="Source" style={{ maxWidth: '300px', borderRadius: '8px' }} />
                                </ReactCrop>

                                <div style={{ display: 'flex', gap: "20px", justifyContent: 'space-around' }}>
                                    <Button onClick={applyCrop} variant="contained" color="primary">Done</Button>
                                    <Button onClick={() => setIsEditing(false)} variant="outlined" color="error">Cancel</Button>
                                </div>
                            </div>
                        )}
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

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Puja Price <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='pujaPrice'
                            value={pujaDetail?.pujaPrice}
                            onChange={handleInputField}
                            error={inputFieldError.pujaPrice ? true : false}
                            helperText={inputFieldError.pujaPrice}
                            onFocus={() => handleInputFieldError("pujaPrice", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <label style={{ color: "#000", marginBottom: "#000", fontSize: "14.5px", color: "grey" }}>Puja Description <span style={{ color: "red" }}>*</span></label>
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