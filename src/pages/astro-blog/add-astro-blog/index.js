import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import { UploadImageSvg } from "../../../assets/svg";
import { Color } from "../../../assets/colors";
import * as SkillActions from '../../../redux/Actions/skillsActions.js'
import { img_url } from "../../../utils/Constants.js";
import RichTextEditor from 'react-rte';
import * as AddAstroBlog from "../../../redux/Actions/astroBlogActions.js";
import { Regex_Accept_Alpha } from "../../../utils/regexPattern.js";

const AddAstroblog = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [astroblogDetail, setAstroblogDetail] = useState({ title: stateData ? stateData?.title : '', created_by: stateData ? stateData?.created_by : '', category: stateData ? stateData?.blogCategory : '' });
    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());

    const [inputFieldError, setInputFieldError] = useState({ title: '', created_by: '', category: '', description: '', image: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });


    useEffect(() => {
        if (stateData) {
            const data = createValueFromString(stateData?.description)
            setDescription(data)
        }

    }, [])



    const createValueFromString = (string) => {
        return RichTextEditor.createValueFromString(string, 'html');
    };

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setAstroblogDetail({ ...astroblogDetail, [name]: value });
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

    //! Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title, category, created_by } = astroblogDetail;
        const { file } = image;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title")
            isValid = false;
        }
        if (!created_by) {
            handleInputFieldError("created_by", "Please Enter Author Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(created_by)) {
            handleInputFieldError("created_by", "Please Enter Valid Author Name")
            isValid = false;
        }
        if (!category) {
            handleInputFieldError("category", "Please Select Category")
            isValid = false;
        }
        if (description?.toString('html') == "<p><br></p>") {
            handleInputFieldError("description", "Please Enter Description")
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
        console.log("Astroblog Data :: ", { ...astroblogDetail, description: description?.toString('html'), image })
        const { title, category, created_by, blogId } = astroblogDetail;

        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("title", title);
                formData.append("created_by", created_by);
                formData.append("blogCategory", category);
                formData.append("description", description?.toString('html'));
                formData.append("image", image?.bytes);
                formData.append("blogId", stateData._id);

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/astro-blog")
                }

                //! Dispatching API for update Astro Blog  
                console.log(payload);
                dispatch(AddAstroBlog.updateAstroBlog(payload))

            } else {
                let formData = new FormData();
                formData.append("title", title);
                formData.append("created_by", created_by);
                formData.append("blogCategory", category);
                formData.append("description", description?.toString('html'));
                formData.append("image", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/astro-blog")
                }

                //! Dispatching API for add Astro Blog  
                console.log(payload);
                dispatch(AddAstroBlog.addAstroBlog(payload))
            }
        }
    };


    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Astroblog</div>
                    <div onClick={() => navigate("/astro-blog")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {image?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar src={image.file} style={{ height: '300px', width: "300px", borderRadius: "initial" }} />
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
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={astroblogDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Author <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='created_by'
                            value={astroblogDetail?.created_by}
                            onChange={handleInputField}
                            error={inputFieldError.created_by ? true : false}
                            helperText={inputFieldError.created_by}
                            onFocus={() => handleInputFieldError("created_by", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Category <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                label="Select Category * " variant="outlined" fullWidth
                                name='category'
                                value={astroblogDetail?.category}
                                onChange={handleInputField}
                                error={inputFieldError?.category ? true : false}
                                onFocus={() => handleInputFieldError("category", null)}
                            >
                                <MenuItem disabled>---Select Category---</MenuItem>
                                <MenuItem value="Love">Love </MenuItem>
                                <MenuItem value="Health">Health </MenuItem>
                                <MenuItem value="Success"> Success</MenuItem>
                                <MenuItem value="Marriage"> Marriage</MenuItem>
                                <MenuItem value="Life"> Life</MenuItem>
                                <MenuItem value="Financial"> Financial</MenuItem>
                                <MenuItem value="Vastu"> Vastu</MenuItem>
                                <MenuItem value="Education"> Education</MenuItem>
                                <MenuItem value="Business"> Business</MenuItem>
                                <MenuItem value="Festival"> Festival</MenuItem>
                                <MenuItem value="Relationship"> Relationship</MenuItem>
                            </Select>
                        </FormControl>
                        {inputFieldError?.category && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "400" }}>{inputFieldError?.category}</div>}
                    </Grid>



                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {/* <label style={{ color: "#000", marginBottom: "#000", fontSize: "14.5px", color: "grey" }}>Description</label> */}
                        <RichTextEditor
                            value={description}
                            onChange={setDescription}
                            editorStyle={{ minHeight: '50vh', }}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                        {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "400" }}>{inputFieldError?.description}</div>}
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

const mapStateToProps = (state) => ({
    // astrologerListData: state.astrologer.astrologerListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddAstroblog);