import Navbar from "..components/Navbar";

export default function DetectionPage   () {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Navbar />
            <h1 className="text-4xl font-bold mb-4">Detection Page</h1>
            <p className="text-lg text-gray-700 mb-8">This is where you can detect skin conditions.</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                Start Detection
            </button>
        </div>
    );
}