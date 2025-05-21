import {useState} from "react";
import {getTags} from "../helpers.js";
import axios from "axios";

const Modal = ({mode, setMode, fetchData, currentPost}) => {
    const [form, setForm] = useState({
        title: currentPost?.data.title || "",
        description: currentPost?.data.description || "",
        line: currentPost?.data.address.line || "",
        town: currentPost?.data.address.town || "",
        region: currentPost?.data.address.region || "",
        country: currentPost?.data.address.country || "",
        longitude: currentPost?.data.address.coords[0] || undefined,
        latitude: currentPost?.data.address.coords[1] || undefined,
        photo: currentPost?.data.photo || "",
        website: currentPost?.data.website || "",
        nature: currentPost?.data.tags.includes("nature") || false,
        mountains: currentPost?.data.tags.includes("mountains") || false,
        hiking: currentPost?.data.tags.includes("hiking") || false,
        beach: currentPost?.data.tags.includes("beach") || false,
        sun: currentPost?.data.tags.includes("sun") || false,
    });

    const createMode = mode === "create";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title: form.title,
            address: {
                line: form.line,
                town: form.town,
                region: form.region,
                country: form.country,
                coords: [Number(form.latitude), Number(form.longitude)],
            },
            photo: form.photo,
            website: form.website,
            description: form.description,
            tags: getTags(form),
        };

        try {
            if (createMode) {
                const response = await axios.post("http://localhost:8000/create", {data});
                const success = response.status === 200;
                if (success) {
                    setMode(null);
                    fetchData();
                } else {
                    console.error(response);
                }
            } else {
                const response = await axios.put(`http://localhost:8000/edit/${currentPost.documentId}`, {
                    data: data
                })
                const success = response.status === 200;
                if (success) {
                    setMode(null);
                    fetchData();
                } else {
                    console.error(response);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="overlay">
            <div className={"modal"}>
                <form onSubmit={handleSubmit}>
                    <div className={"close-icon"} onClick={() => setMode(null)}>
                        x
                    </div>
                    <h1>{createMode ? "Add" : "Edit"} your adventure</h1>
                    <h5>Upload a photo of where you have visited</h5>
                    <p>Past a url from the internet</p>

                    <div className={"multi-input"}>
                        <div className="image-preview">
                            {form.photo && (
                                <img src={form.photo} alt="uploaded photo preview"/>
                            )}
                        </div>
                        <div className={"main-inputs"}>
                            <div className={"input-container"}>
                                <label>PHOTO</label>
                                <input
                                    id={"photo"}
                                    name={"photo"}
                                    placeholder={"Photo URL goes here"}
                                    required={true}
                                    onChange={handleChange}
                                    value={form.photo}
                                />
                            </div>
                            <div className={"input-container"}>
                                <label>TITLE</label>
                                <input
                                    id={"title"}
                                    name={"title"}
                                    placeholder={"Title of your post"}
                                    required={true}
                                    onChange={handleChange}
                                    value={form.title}
                                />
                            </div>
                            <div className={"input-container"}>
                                <label>WEBSITE</label>
                                <input
                                    id={"website"}
                                    name={"website"}
                                    placeholder={"Website goes here"}
                                    required={true}
                                    onChange={handleChange}
                                    value={form.website}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={"input-container"}>
                        <label htmlFor={"description"}>DESCRIPTION</label>
                        <input
                            id="description"
                            name="description"
                            required
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={"multi-input"}>
                        <div className={"input-container"}>
                            <label htmlFor={"line"}>FIRST LINE</label>
                            <input
                                id={"line"}
                                placeholder={"First Line of Address"}
                                required={true}
                                name={"line"}
                                value={form.line}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={"input-container"}>
                            <label htmlFor={"country"}>COUNTRY</label>
                            <input
                                id={"country"}
                                placeholder={"The Country"}
                                required={true}
                                name={"country"}
                                value={form.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={"input-container"}>
                            <label htmlFor={"country"}>TOWN/CITY</label>
                            <input
                                id={"town"}
                                placeholder={"Town (or city)"}
                                required={true}
                                name={"town"}
                                value={form.town}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={"multi-input"}>
                        <div className={"input-container"}>
                            <label htmlFor={"longitude"}>LONGITUDE</label>
                            <input
                                type={"number"}
                                id={"longitude"}
                                name={"longitude"}
                                required={true}
                                value={form.longitude}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={"input-container"}>
                            <label htmlFor={"latitude"}>LATITUDE</label>
                            <input
                                type={"number"}
                                id={"latitude"}
                                name={"latitude"}
                                required={true}
                                value={form.latitude}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={"input-container"}>
                            <label htmlFor={"region"}>REGION</label>
                            <input
                                type={"region"}
                                id={"region"}
                                name={"region"}
                                required={true}
                                value={form.region}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="multi-input">
                        <div className="input-container">
                            <label htmlFor="nature-checkbox">Nature</label>
                            <input
                                type="checkbox"
                                id="nature-checkbox"
                                name="nature"
                                checked={form.nature}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="mountains-checkbox">Mountains</label>
                            <input
                                type="checkbox"
                                id="mountains-checkbox"
                                name="mountains"
                                checked={form.mountains}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="hiking-checkbox">Hiking</label>
                            <input
                                type="checkbox"
                                id="hiking-checkbox"
                                name="hiking"
                                checked={form.hiking}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="beach-checkbox">Beach</label>
                            <input
                                type="checkbox"
                                id="beach-checkbox"
                                name="beach"
                                checked={form.beach}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="sun-checkbox">Sun</label>
                            <input
                                type="checkbox"
                                id="sun-checkbox"
                                name="sun"
                                checked={form.sun}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <br/>
                    <input type="submit" value="Submit for review  →"/>
                </form>
            </div>
        </div>
    );
};

export default Modal;
