import { connect } from "react-redux";
import useValidate from "../../Hooks/useValidate";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar";
import { Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios'

export const PatientForm = ({ orgContract, web3, onSuccess = null, user }) => {
    const [formData, validator] = useValidate({
        patient_name: { value: "", validate: "required|string", error: null },
        addr: { value: "", validate: "required", error: null },
        age: { value: "", validate: "required", error: null },
        mobno: { value: "", validate: "required|mobile", error: null },
        email: { value: "", validate: "required|email", error: null },
        report_date: { value: "", validate: "required|reportdate", error: null },
        test_name: { value: "", validate: "", error: null },
        description: { value: "", validate: "required", error: null },
    });
    const [kidneytest, validator1] = useValidate({
        colour: { value: "", validate: "required|string" },
        appearance: { value: "", validate: "required|string" },
        specificgravity: { value: "", validate: "required" },
        pH: { value: "", validate: "required" },
        glucose: { value: "", validate: "required" },
        protein: { value: "", validate: "required" },
        ketones: { value: "", validate: "required" },
        blood: { value: "", validate: "required" },
        bilirubin: { value: "", validate: "required" },
        urobilinogen: { value: "", validate: "required" },
        leucocyte_esterase: { value: "", validate: "required" },
        nitrite: { value: "", validate: "required" },
        pus_cells: { value: "", validate: "required" },
        redbloodcells: { value: "", validate: "required" },
        epithelialcells: { value: "", validate: "required" },
        casts: { value: "", validate: "required" },
        crystals: { value: "", validate: "required" },
        yeast: { value: "", validate: "required" },
        bacteria: { value: "", validate: "required" }

    })


    const [selectedValue, setSelectedValue] = useState('');
    const handleDropdownChange = (eventKey) => {
        setSelectedValue(eventKey);
    };
    const handleChange = (e) => {
        validator.validOnChange(e.currentTarget);
    };
    const handleKidneyTest = (e) => {
        validator1.validOnChange(e.currentTarget.value);
    };
    const [t3, setT3] = useState('')
    const handleT3 = (e) => {
        setT3(e.target.value)
    }
    const [t4, setT4] = useState('')
    const handleT4 = (e) => {
        setT4(e.target.value)
    }
    const [thysti, setThysti] = useState('');
    const handleThySti = (e) => {
        setThysti(e.target.value)
    }

    const [rbc1, setRBC1] = useState('');
    const handleRBCchange1 = (event) => {
        setRBC1(event.target.value);
    }
    const [hemoglobin1, setHemoglobin1] = useState('');
    const handleHmgchange1 = (event) => {
        setHemoglobin1(event.target.value);
    }

    const [hemoglobin, setHemoglobin] = useState('');
    const [rbc, setRBC] = useState('');
    const [hct, setHCT] = useState('');
    const [mcv, setMCV] = useState('');
    const [mch, setMCH] = useState('');
    const [mchc, setMCHC] = useState('');
    const [rdwCV, setRDWCV] = useState('');
    const [tlc, setTLC] = useState('');
    const handleHemoglobinChange = (event) => {
        setHemoglobin(event.target.value);
    };
    const handleRBCchange = (event) => {
        setRBC(event.target.value);
    }
    const handleHCTchange = (event) => {
        setHCT(event.target.value);
    }
    const handleMCVchange = (event) => {
        setMCV(event.target.value);
    }
    const handleMCHchange = (event) => {
        setMCH(event.target.value);
    }
    const handleMCHCchange = (event) => {
        setMCHC(event.target.value);
    }
    const handleRDWCVchange = (event) => {
        setRDWCV(event.target.value);
    }
    const handleTLCchange = (event) => {
        setTLC(event.target.value);
    }

    const handleOnSubmit = async (e) => {

        let toastOption = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        e.preventDefault();
        let date = new Date(formData.report_date.value);
        // function generatePatientId() {
        //     let id = formData.email.value + "#" + user.name;
        //     id=id.replaceAll(/\s/g,'')
        //     return id;
        // }
        // const pid = generatePatientId();
        // function generatePassword() {
        //     let psd = formData.email.value
        //     psd=psd.replaceAll(/\s/g,'')
        //     return psd
        // }
        // const psd = generatePassword()
        const pid = formData.email.value

        axios.post('http://localhost:4000/addNewPatient', {
            ID: pid,
            pass: "password"
        }).then((Response) => {
            // sweet alert
            Response&&Response.data?console.log("added"):console.log("error")
        }).catch((error) => {
            console.error(error)
        })


        if (selectedValue === 'CBC') {
            axios.post('http://localhost:4000/insertcbc', {
                org_name: user.name,
                patient_id: pid,
                report_date: formData.report_date.value,
                tname: selectedValue,
                HEMOGLOBIN: hemoglobin,
                RBC: rbc,
                HCT: hct,
                MCV: mcv,
                MCH: mch,
                MCHC: mchc,
                RDWCV: rdwCV,
                TLC: tlc,
                comment: formData.description.value
            })
        };

        if (selectedValue === 'RBC') {
            axios.post('http://localhost:4000/insertrbc', {
                org_name: user.name,
                patient_id: pid,
                report_date: formData.report_date.value,
                tname: selectedValue,
                value: rbc1,
                comment: formData.description.value,
            })
        };
        if (selectedValue === 'Hemoglobin') {
            axios.post('http://localhost:4000/inserthmg', {
                org_name: user.name,
                patient_id: pid,
                report_date: formData.report_date.value,
                tname: selectedValue,
                value: hemoglobin1,
                comment: formData.description.value
            })
        }
        if (selectedValue === 'Thyroid') {
            axios.post('http://localhost:4000/inserthyroid', {
                org_name: user.name,
                patient_id: pid,
                report_date: formData.report_date.value,
                tname: selectedValue,
                T3: t3,
                T4: t4,
                thsh: thysti,
                comment: formData.description.value
            })
        }
        // if(selectedValue==='Kidney Test'){
        //     axios.post('http://localhost:4000/insertkidneytest',{
        //         org_name:user.name,
        //         patient_id:pid,
        //         report_date:formData.report_date.value,
        //         colour:kidneytest.colour.value,
        //         appearance:kidneytest.appearance.value,
        //         specificgravity:kidneytest.specificgravity.value,
        //         pH:kidneytest.pH.value,
        //         glucose:kidneytest.glucose.value,
        //         protein:kidneytest.protein.value,
        //         ketones:kidneytest.ketones.value,
        //         blood:kidneytest.blood.value,
        //         bilirubin:kidneytest.bilirubin.value,
        //         urobilinogen:kidneytest.urobilinogen.value,
        //         leucocyte_esterase:kidneytest.leucocyte_esterase.value,
        //         nitrite:kidneytest.nitrite.value,
        //         pus_cells:kidneytest.pus_cells.value,
        //         redbloodcells:kidneytest.redbloodcells.value,
        //         epithelialcells:kidneytest.epithelialcells.value,
        //         casts:kidneytest.casts.value,
        //         crystals:kidneytest.crystals.value,
        //         yeast:kidneytest.yeast.value,
        //         bacteria:kidneytest.bacteria.value,

        //         comment:formData.description.value
        //     })

        // }
        if (!validator.validate()) return;



        let address = await window.ethereum.request({
            method: "eth_accounts",
        });
        const data = await toast.promise(
            orgContract.contract.methods
                .addPatient(
                    user.name,
                    pid,
                    formData.patient_name.value,
                    formData.addr.value,
                    formData.age.value,
                    formData.mobno.value,
                    formData.email.value,
                    date.getTime(),
                    selectedValue,
                    formData.description.value

                )
                .send({ from: address[0] }),
            {
                pending: "Waiting for conformation",
                success: "Patient is added",
                error: "Error in adding Patient",
            },
            toastOption
        );
        onSuccess && onSuccess(data.events.AddPatient.returnValues._patient);
    };

    return (
        <form onSubmit={handleOnSubmit} >
            <Navbar />

            <div className="container my-4">

                <div className="card body" >
                    <>
                        <div className="card-header">
                            <h3>Add new patient</h3>
                        </div>
                        <div className="card-body">


                            <div className="row g-3 mb-5">
                                <div className="col-md-6">
                                    <label className="form-label"> Patient Name</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        value={formData.patient_name.value}
                                        name="patient_name"
                                        placeholder="Enter Patient name"
                                        className={`form-control ${formData.patient_name.error ? "is-invalid" : ""
                                            }`}
                                    />
                                    {formData.patient_name.error && (
                                        <div className="invalid-feedback">
                                            {formData.patient_name.error}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        value={formData.addr.value}
                                        name="addr"
                                        placeholder="Enter Address"
                                        className={`form-control ${formData.addr.error ? "is-invalid" : ""
                                            }`}
                                    />
                                    {formData.addr.error && (
                                        <div className="invalid-feedback">
                                            {formData.addr.error}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Age</label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        value={formData.age.value}
                                        name="age"
                                        placeholder="Enter Age"
                                        className={`form-control ${formData.age.error ? "is-invalid" : ""
                                            }`}
                                    />
                                    {formData.age.error && (
                                        <div className="invalid-feedback">
                                            {formData.age.error}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Contact No</label>
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        value={formData.mobno.value}
                                        name="mobno"
                                        placeholder="Enter mobile no"
                                        className={`form-control ${formData.mobno.error ? "is-invalid" : ""
                                            }`}
                                    />
                                    {formData.mobno.error && (
                                        <div className="invalid-feedback">
                                            {formData.mobno.error}
                                        </div>
                                    )}
                                </div>

                                {/* //for email */}
                                <div className="col-md-6">
                                    <label className="form-label">E-mail</label>
                                    <input
                                        type="email"
                                        onChange={handleChange}
                                        value={formData.email.value}
                                        name="email"
                                        placeholder="Enter E-mail"
                                        className={`form-control ${formData.email.error ? "is-invalid" : ""
                                            }`}
                                    />
                                    {formData.email.error && (
                                        <div className="invalid-feedback">
                                            {formData.email.error}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Report Date</label>
                                    <input
                                        type="date"
                                        onChange={handleChange}
                                        value={formData.report_date.value}
                                        name="report_date"
                                        placeholder="Enter Report Date"
                                        className={`form-control ${formData.report_date.error ? "is-invalid" : ""
                                            }`}
                                    />

                                    {formData.report_date.error && (
                                        <div className="invalid-feedback">
                                            {formData.report_date.error}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="col-md-6">
                                        <label className="form-label">Test Name</label>
                                        <Dropdown onSelect={handleDropdownChange}>
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                {selectedValue || 'Select a test'}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey="CBC">Complete Blood Count(CBC)</Dropdown.Item>
                                                <Dropdown.Item eventKey="RBC">Red Blood Count(RBC)</Dropdown.Item>
                                                <Dropdown.Item eventKey="Hemoglobin">Hemoglobin</Dropdown.Item>
                                                <Dropdown.Item eventKey="Thyroid">Thyroid</Dropdown.Item>
                                                {/* <Dropdown.Item eventKey="Kidney Test">Kidney Test</Dropdown.Item> */}

                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {selectedValue === 'Thyroid' && (
                                            <Form>
                                                <Form.Group controlId="t3">
                                                    <Form.Label>T3</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter value"
                                                        value={t3}
                                                        onChange={handleT3}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="t4">
                                                    <Form.Label>T4</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter value"
                                                        value={t4}
                                                        onChange={handleT4}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="tn">
                                                    <Form.Label>Thyroid Stimulating Hormone-Ultra</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter value"
                                                        value={thysti}
                                                        onChange={handleThySti}
                                                    />
                                                </Form.Group>

                                            </Form>
                                        )}

                                        {selectedValue === "CBC" && (
                                            <div className="container my-4">
                                                <Form>
                                                    <Form.Group controlId="hemoglobin" >
                                                        <Form.Label>Hemoglobin</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value "
                                                            value={hemoglobin}

                                                            onChange={handleHemoglobinChange}

                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId="rbc">
                                                        <Form.Label>RBC</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value"
                                                            value={rbc}
                                                            onChange={handleRBCchange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="hct">
                                                        <Form.Label>HCT</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value"
                                                            value={hct}
                                                            onChange={handleHCTchange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="mcv">
                                                        <Form.Label>MCV</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value"
                                                            value={mcv}
                                                            onChange={handleMCVchange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="mch">
                                                        <Form.Label>MCH</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value"
                                                            value={mch}
                                                            onChange={handleMCHchange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="mchc">
                                                        <Form.Label>MCHC</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value"
                                                            value={mchc}
                                                            onChange={handleMCHCchange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="rdw">
                                                        <Form.Label>RDW-CV</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value"
                                                            value={rdwCV}
                                                            onChange={handleRDWCVchange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="tlc">
                                                        <Form.Label>Total Leucocyte Count</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Enter value"
                                                            value={tlc}
                                                            onChange={handleTLCchange}
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        )}

                                        {selectedValue === 'RBC' && (
                                            <Form>

                                                <Form.Group controlId="rbc">
                                                    <Form.Label>RBC</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter value"
                                                        value={rbc1}
                                                        onChange={handleRBCchange1}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        )}
                                        {selectedValue === 'Hemoglobin' && (
                                            <Form>

                                                <Form.Group controlId="hmg">
                                                    <Form.Label>Hemoglobin</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter value"
                                                        value={hemoglobin1}
                                                        onChange={handleHmgchange1}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        )}
                                        {selectedValue === 'Kidney Test' && (
                                            <div>
                                                <label className="form-label">Colour</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.colour.value}
                                                    name="colour"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Appearance</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.appearance.value}
                                                    name="appearnce"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Specific gravity</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.specificgravity.value}
                                                    name="sgravity"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">pH</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.pH.value}
                                                    name="ph"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Glucose</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.glucose.value}
                                                    name="glucose"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Protei</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.protein.value}
                                                    name="protein"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Ketones</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.ketones.value}
                                                    name="ketones"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Blood</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.blood.value}
                                                    name="blood"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Bilirubin</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.bilirubin.value}
                                                    name="bilirubin"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Urobilinogen</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.urobilinogen.value}
                                                    name="urobilinogen"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Leucocyte Esterase</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.leucocyte_esterase.value}
                                                    name="le"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Nitrite</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.nitrite.value}
                                                    name="nitrite"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Pus Cells</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.pus_cells.value}
                                                    name="pc"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Red Blood Cells</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.redbloodcells.value}
                                                    name="rebc"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Epithelial Cells</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.epithelialcells.value}
                                                    name="ep"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Casts</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.casts.value}
                                                    name="casts"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Crystals</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.crystals.value}
                                                    name="crystals"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Yeast</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.yeast.value}
                                                    name="yeast"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                                <label className="form-label">Bacteria</label>
                                                <input
                                                    type="text"
                                                    onChange={handleKidneyTest}
                                                    value={kidneytest.bacteria.value}
                                                    name="bac"
                                                    placeholder="Enter Value"
                                                    className="form-control"
                                                />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Comment</label>
                                <textarea
                                    defaultValue={formData.description.value}
                                    onChange={handleChange}
                                    name="description"
                                    placeholder="Enter comment"
                                    className={`form-control ${formData.description.error ? "is-invalid" : ""
                                        }`}
                                    rows="3"
                                ></textarea>
                                {formData.description.error && (
                                    <div className="invalid-feedback">
                                        {formData.description.error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                </div>
            </div>
            <center>
                <button className="btn btn-primary" type="submit">
                    Add
                </button>
            </center>
            <ToastContainer />
        </form>
    );

};

const mapStateToProps = (state) => {
    return {
        orgContract: state.contractReducer,
        web3: state.web3Reducer,
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(PatientForm);