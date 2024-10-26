import { useLocation, useNavigate } from 'react-router-dom';

function DetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { project } = location.state || {};

    if (!project) {
        return (
            <div className="flex h-screen items-center justify-center text-center">
                <p>No project selected. Please go back to the Dashboard.</p>
                <button onClick={() => navigate(-1)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <button onClick={() => navigate(-1)} className="mb-4 bg-blue-600 text-white py-2 px-4 rounded">
                Back to Dashboard
            </button>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{project.projectName}</h2>
                <p className='text-black dark:text-white'><strong>Location:</strong> {project.projectLocation}</p>
                <p className='text-black dark:text-white'><strong>Type:</strong> {project.projectType}</p>
                <p className='text-black dark:text-white'><strong>Total Capacity:</strong> {project.totalCapacity}</p>
                <p className='text-black dark:text-white'><strong>Energy Production:</strong> {project.energyProduction}</p>
                <p className='text-black dark:text-white'><strong>Carbon Offset:</strong> {project.carbonOffset}</p>
                <p className='text-black dark:text-white'><strong>Min Investment:</strong> {project.minInvestmentAmount}</p>
                <p className='text-black dark:text-white'><strong>Investment Term:</strong> {project.investmentTerm}</p>
                <p className='text-black dark:text-white'><strong>Solar Panel Type:</strong> {project.solarPanelType}</p>
                <p className='text-black dark:text-white'><strong>Grid Connectivity:</strong> {project.gridConnectivity}</p>
                <p className='text-black dark:text-white'><strong>Battery Storage:</strong> {project.batteryStorage}</p>
            </div>
        </div>
    );
}

export default DetailPage;
