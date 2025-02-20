import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, Button } from "@mui/material";
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { UploadImageSvg } from "../../../../assets/svg";
import * as AstromallActions from '../../../../redux/actions/astromallAction';
import { Color } from "../../../../assets/colors";
import { img_url } from "../../../../utils/api-routes";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import 'react-image-crop/dist/ReactCrop.css';

const AddCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [categoryDetail, setCategoryDetail] = useState({ title: stateData ? stateData?.categoryName : '' });
    const [inputFieldError, setInputFieldError] = useState({ title: '', image: '' });

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
        setCategoryDetail({ ...categoryDetail, [name]: value });
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

    //! Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = categoryDetail;
        const { file } = image;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        }
        if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title")
            isValid = false;
        }
        if (title.toString().length > 70) {
            handleInputFieldError("title", "Please Enter Title Less Than 70 Letter")
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Upload Image")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("Category Data :: ", { ...categoryDetail, image })
            const { title } = categoryDetail;

            if (stateData) {
                let formData = new FormData()
                formData.append("categoryId", stateData?._id);
                formData.append("categoryName", title)
                formData.append("image", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/astro-mall/category")
                }

                //! Dispatching API for Creating Category
                dispatch(AstromallActions.updateAstromallCategory(payload))

            } else {
                let formData = new FormData()
                formData.append("categoryName", title)
                formData.append("image", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/astro-mall/category")
                }

                //! Dispatching API for Creating Category
                dispatch(AstromallActions.createAstromallCategory(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.white, }}>Add Mall Category</div>
                    <div onClick={() => navigate("/astro-mall/category")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.image}</div>}

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

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={categoryDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
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

export default AddCategory;