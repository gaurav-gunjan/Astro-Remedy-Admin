import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { base_url, img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import * as AstromallActions from '../../../../redux/actions/astromallAction';
import { YYYYMMDD } from "../../../../utils/common-function";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import 'react-image-crop/dist/ReactCrop.css';

const AddProduct = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const { astromallCategoryData } = useSelector(state => state.astromallReducer);

    const [productDetail, setProductDetail] = useState({ categoryId: stateData ? stateData?.categoryId : '', productName: stateData ? stateData?.productName : '', description: stateData ? stateData?.description : '', mrp: stateData ? stateData?.mrp : '', offerPrice: stateData ? stateData?.price : '', purchasePrice: stateData ? stateData?.purchasePrice : '', refundDay: stateData ? stateData?.refundRequetDay : '', stockQuantity: stateData ? stateData?.quantity : '', inventory: stateData ? stateData?.inventory : '', manufactureDate: stateData ? YYYYMMDD(stateData?.manufactureDate) : '', expiryDate: stateData ? YYYYMMDD(stateData?.expiryDate) : '' });
    const [inputFieldError, setInputFieldError] = useState({ categoryId: '', subCategoryId: '', productName: '', description: '', mrp: '', offerPrice: '', purchasePrice: '', refundDay: '', stockQuantity: '', inventory: '', manufactureDate: '', expiryDate: '', image: '', bulkImage: '' });

    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });
    const [crop, setCrop] = useState({
        unit: '%', // Crop dimensions in percentage
        width: 50, // Starting width of the crop box
        aspect: 1 / 1 // Aspect ratio of 1:1 for square crop
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [bulkImage, setBulkImage] = useState(stateData ? stateData?.bannerImages.map(value => { return { file: base_url + value, bytes: '' } }) : []); //* Mutliple File 
    const [imageBulk, setImageBulk] = useState({ file: '', bytes: '' });

    const [cropBulk, setCropBulk] = useState({
        unit: '%', // Crop dimensions in percentage
        width: 50, // Starting width of the crop box
        aspect: 1 / 1 // Aspect ratio of 1:1 for square crop
    });
    const [completedCropBulk, setCompletedCropBulk] = useState(null);
    const [imageRefBulk, setImageRefBulk] = useState(null);
    const [isEditingBulk, setIsEditingBulk] = useState(false);

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setProductDetail({ ...productDetail, [name]: value });
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

    const onImageLoadBulk = useCallback((e) => {
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
        setCropBulk(initialCrop);
        setImageRefBulk(e.currentTarget);
    }, []);

    const onCropCompleteBulk = (crop) => setCompletedCropBulk(crop);

    const applyCropBulk = async () => {
        if (!completedCropBulk || !imageRefBulk) return;

        const canvas = document.createElement('canvas');
        const scaleX = imageRefBulk.naturalWidth / imageRefBulk.width;
        const scaleY = imageRefBulk.naturalHeight / imageRefBulk.height;
        canvas.width = completedCropBulk.width;
        canvas.height = completedCropBulk.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            imageRefBulk,
            completedCropBulk.x * scaleX,
            completedCropBulk.y * scaleY,
            completedCropBulk.width * scaleX,
            completedCropBulk.height * scaleY,
            0,
            0,
            completedCropBulk.width,
            completedCropBulk.height
        );

        canvas.toBlob((blob) => {
            if (blob) {
                const croppedImageUrl = URL.createObjectURL(blob);
                // setImage({ file: croppedImageUrl, bytes: blob });
                setBulkImage([...bulkImage, {
                    file: croppedImageUrl,
                    bytes: blob,
                }]);
                setIsEditingBulk(false); // Hide editor after cropping
            }
        });
    };

    // Handle Image :  //! Bulk Image
    const handleBulkImage = (e) => {
        if (bulkImage.length + 1 <= 5) {
            if (e.target.files && e.target.files.length > 0) {
                // setBulkImage([...bulkImage, {
                //     file: URL.createObjectURL(e.target.files[0]),
                //     bytes: e.target.files[0],
                // }]);
                setImageBulk({
                    file: URL.createObjectURL(e.target.files[0]),
                    bytes: e.target.files[0],
                });
                setIsEditingBulk(true);
            }
        } else {
            alert('You have cross your limit bugger')
        }
    }

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { categoryId, productName, mrp, purchasePrice, offerPrice, refundDay, stockQuantity, inventory, manufactureDate, expiryDate, description } = productDetail;
        const { file } = image;
        console.log({ manufactureDate, expiryDate })
        if (!categoryId) {
            handleInputFieldError("categoryId", "Please Select Category Name")
            isValid = false;
        }
        if (!productName) {
            handleInputFieldError("productName", "Please Enter Product Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha_Dot_Comma_Space.test(productName)) {
            handleInputFieldError("productName", "Please Enter Valid Product Name")
            isValid = false;
        }
        if (productName.toString().length > 70) {
            handleInputFieldError("productName", "Please Enter Product Name Less Than 70 Letter")
            isValid = false;
        }
        if (!mrp) {
            handleInputFieldError("mrp", "Please Enter Mrp")
            isValid = false;
        }
        if (!offerPrice) {
            handleInputFieldError("offerPrice", "Please Enter Offer Price")
            isValid = false;
        }
        if (parseFloat(offerPrice) >= parseFloat(mrp)) {
            handleInputFieldError("offerPrice", "Please Enter Offer Price Less Than Mrp")
            isValid = false;
        }
        // if (!purchasePrice) {
        //     handleInputFieldError("purchasePrice", "Please Enter Purchase Price")
        //     isValid = false;
        // }
        // if (!refundDay) {
        //     handleInputFieldError("refundDay", "Please Enter Refund Day")
        //     isValid = false;
        // }
        if (!stockQuantity) {
            handleInputFieldError("stockQuantity", "Please Enter Stock Quantity")
            isValid = false;
        }
        // if (!inventory) {
        //     handleInputFieldError("inventory", "Please Enter Inventory")
        //     isValid = false;
        // }
        // if (!manufactureDate) {
        //     handleInputFieldError("manufactureDate", "Please Enter Manufacture Date")
        //     isValid = false;
        // }
        // if (!expiryDate) {
        //     handleInputFieldError("expiryDate", "Please Enter Expiry Date")
        //     isValid = false;
        // }
        // if (new Date(expiryDate) <= new Date(manufactureDate)) {
        //     handleInputFieldError("expiryDate", "Expiry date is greater than the manufacture date")
        //     isValid = false;
        // }
        if (!description) {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }
        if (description?.length > 2000) {
            handleInputFieldError("description", "Description Should be Less Than 2000")
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Select Image")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Ecommerce Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Product Data :: ", { ...productDetail, image, bulkImage: bulkImage?.map((value) => value?.bytes) })
        const bulkImageArray = bulkImage?.map((value) => value?.bytes);

        const { categoryId, productName, description, mrp, offerPrice, purchasePrice, stockQuantity, inventory, refundDay, manufactureDate, expiryDate } = productDetail;

        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("productId", stateData?._id);
                formData.append("categoryId", categoryId);
                formData.append("productName", productName);
                formData.append("description", description);
                formData.append("mrp", mrp);
                formData.append("price", offerPrice);
                formData.append("quantity", stockQuantity);
                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))
                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-mall/product')
                }

                //! Dispatching API for Updating Products
                dispatch(AstromallActions.updateAstromallProduct(payload))

            } else {
                let formData = new FormData();
                formData.append("categoryId", categoryId);
                formData.append("productName", productName);
                formData.append("description", description);
                formData.append("mrp", mrp);
                formData.append("price", offerPrice);
                formData.append("quantity", stockQuantity);
                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-mall/product')
                }

                //! Dispatching API for Creating Products
                dispatch(AstromallActions.createAstromallProduct(payload))
            }
        } else {
            console.log("Validation Error !!!")
        }
    };

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(AstromallActions.getAstromallCategory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Mall Product</div>
                    <div onClick={() => navigate("/astro-mall/product")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload <span style={{ color: "red" }}>*</span></div>
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

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Category Name<span style={{ color: "red" }}>* </span></InputLabel>
                            <Select
                                label="Select Category Name * " variant="outlined" fullWidth
                                name='categoryId'
                                value={productDetail?.categoryId?._id}
                                onChange={handleInputField}
                                error={inputFieldError?.categoryId ? true : false}
                                onFocus={() => handleInputFieldError("categoryId", null)}
                            >
                                <MenuItem disabled>---Select Category Name---</MenuItem>
                                {astromallCategoryData.map((value, index) => {
                                    return <MenuItem key={index} value={value?._id}>{value?.categoryName}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {inputFieldError?.categoryId && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "3px 15px 0 15px" }}>{inputFieldError?.categoryId}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Product Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='productName'
                            value={productDetail?.productName}
                            onChange={handleInputField}
                            error={inputFieldError.productName ? true : false}
                            helperText={inputFieldError.productName}
                            onFocus={() => handleInputFieldError("productName", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>MRP <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='mrp' type="number"
                            value={productDetail?.mrp}
                            onChange={handleInputField}
                            error={inputFieldError.mrp ? true : false}
                            helperText={inputFieldError.mrp}
                            onFocus={() => handleInputFieldError("mrp", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Offer Price <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth type="number"
                            name='offerPrice'
                            value={productDetail?.offerPrice}
                            onChange={handleInputField}
                            error={inputFieldError.offerPrice ? true : false}
                            helperText={inputFieldError.offerPrice}
                            onFocus={() => handleInputFieldError("offerPrice", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Stock Quantity <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='stockQuantity' type="number"
                            value={productDetail?.stockQuantity}
                            onChange={handleInputField}
                            error={inputFieldError.stockQuantity ? true : false}
                            helperText={inputFieldError.stockQuantity}
                            onFocus={() => handleInputFieldError("stockQuantity", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <label style={{ color: "#000", marginBottom: "#000", fontSize: "14.5px", color: "grey" }}>Description <span style={{ color: "red" }}>*</span></label>
                            <textarea
                                name='description'
                                value={productDetail?.description}
                                onChange={handleInputField}
                                placeholder="Description"
                                rows={8}
                                onFocus={() => handleInputFieldError("description", null)}
                                style={{ minWidth: "100%", maxWidth: "100%", minHeight: "50px", padding: "10px", outline: "none", border: `1px solid ${inputFieldError?.description ? 'red' : '#C4C4C4'}`, borderRadius: "3.5px", fontFamily: "Philosopher" }}
                            />
                        </div>
                        {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.description}</div>}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkImage.length > 0 && bulkImage?.map((value, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <div style={{ height: '150px' }}>
                                        <Avatar src={value.file} style={{ height: '100%', width: '100%', borderRadius: "initial", objectFit: 'contain' }} />
                                    </div>
                                    {/* <Avatar src={value.file} style={{ height: '150px', width: "250px", borderRadius: "initial" }} /> */}
                                    <div onClick={() => setBulkImage(bulkImage.filter((curr, currIndex) => currIndex !== index))} style={{ position: "absolute", top: '-13px', right: '-15px', cursor: "pointer" }}><CrossSvg /></div>
                                </div>
                            ))}

                            {/* Image Editor with Toolbar at the Top */}
                            {isEditingBulk && (
                                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: '1000', backgroundColor: Color.white, border: '1px solid #ccc', padding: '10px', display: 'flex', flexDirection: 'column', gap: '50px', justifyContent: 'center', alignItems: 'center' }}>
                                    <ReactCrop crop={cropBulk} onChange={(newCrop) => setCropBulk(newCrop)} onComplete={onCropCompleteBulk}>
                                        <img src={imageBulk.file} onLoad={onImageLoadBulk} alt="Source" style={{ maxWidth: '300px', borderRadius: '8px' }} />
                                    </ReactCrop>

                                    <div style={{ display: 'flex', gap: "20px", justifyContent: 'space-around' }}>
                                        <Button onClick={applyCropBulk} variant="contained" color="primary">Done</Button>
                                        <Button onClick={() => setIsEditingBulk(false)} variant="outlined" color="error">Cancel</Button>
                                    </div>
                                </div>
                            )}
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

export default AddProduct;