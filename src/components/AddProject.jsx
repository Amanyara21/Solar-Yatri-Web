import axios from "axios";
import { useState } from "react";

function AddProject() {
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        projectLocation: "",
        projectType: "",
        totalCapacity: "",
        energyProduction: "",
        carbonOffset: "",
        minInvestmentAmount: "",
        roi: "",
        investmentTerm: "",
        solarPanelType: "",
        gridConnectivity: "",
        batteryStorage: "",
        "eventType":"Community"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        
        try {
            const response = await axios.post('https://solar-yatri-backend.vercel.app/api/project', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWMyNmVmNzI0NDk4ZDhiZjgxMzM4YiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcyOTg5OTY3NSwiZXhwIjoxNzYxNDM1Njc1fQ.4dxjIK2xMkBRB5mLbKQ6BmS95G2A6tDy5atHwaIv_g4" 
                }
            });
            console.log("API Response:", response.data);
            alert("Project submitted successfully!");
            setFormData({ 
                projectName: "",
                projectDescription: "",
                projectLocation: "",
                projectType: "",
                totalCapacity: "",
                energyProduction: "",
                carbonOffset: "",
                minInvestmentAmount: "",
                roi: "",
                investmentTerm: "",
                solarPanelType: "",
                gridConnectivity: "",
                batteryStorage: "",
            });
        } catch (error) {
            console.error("Error submitting project:", error.response?.data || error.message);
            alert("Failed to submit project. Please try again.");
        }
    };

    return (
        <div className="flex">
            
            <section className="flex-grow bg-gray-50 dark:bg-gray-900 p-8">
                <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        Project Details
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: "Project Name", name: "projectName", type: "text" },
                            { label: "Project Description", name: "projectDescription", type: "text" },
                            { label: "Project Location", name: "projectLocation", type: "text" },
                            { label: "Project Type", name: "projectType", type: "text", placeholder: "e.g., residential, commercial, industrial" },
                            { label: "Total Investment Required", name: "totalCapacity", type: "text" },
                            { label: "Energy Production - KWh", name: "energyProduction", type: "text" },
                            { label: "Carbon Offset", name: "carbonOffset", type: "text" },
                            { label: "Minimum Investment Amount", name: "minInvestmentAmount", type: "number" },
                            { label: "Return on Investment (ROI)", name: "roi", type: "text" },
                            { label: "Investment Term", name: "investmentTerm", type: "text" },
                            { label: "Solar Panel Type", name: "solarPanelType", type: "text" },
                            { label: "Grid Connectivity", name: "gridConnectivity", type: "text" },
                            { label: "Battery Storage", name: "batteryStorage", type: "text" },
                        ].map(({ label, name, type, placeholder }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    placeholder={placeholder || ""}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default AddProject;
