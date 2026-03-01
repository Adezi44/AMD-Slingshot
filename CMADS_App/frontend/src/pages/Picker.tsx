import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Link2, Upload } from 'lucide-react';

export default function Picker() {
    const navigate = useNavigate();
    const [driveUrl, setDriveUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleConnectDrive = () => {
        localStorage.setItem('cmads_video_source', driveUrl);
        navigate('/dashboard');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.status === 'success') {
                localStorage.setItem('cmads_video_source', `upload:${data.filename}`);
                navigate('/dashboard');
            } else {
                alert(`Upload failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error uploading file. Make sure the backend is running.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2 border-b border-border-subtle pb-6">
                <h2 className="text-2xl font-inter font-bold text-accent-white">Video Source Configuration</h2>
                <p className="text-sm text-text-secondary">
                    Connect the inference engine to a Google Drive video stream or upload a local file for processing.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Google Drive Option */}
                <div className="bg-bg-secondary border border-border-subtle rounded-lg p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <Database className="text-primary" size={24} />
                        <h3 className="font-inter font-semibold text-accent-white">Cloud Ingestion</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-jetbrains uppercase tracking-widest text-text-tertiary">
                                Google Drive File ID or URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Link2 size={16} className="text-text-tertiary" />
                                </div>
                                <input
                                    type="text"
                                    value={driveUrl}
                                    onChange={(e) => setDriveUrl(e.target.value)}
                                    placeholder="e.g. 1A2b3C4d5E6f7G..."
                                    className="w-full pl-10 pr-4 py-2 bg-bg-tertiary border border-border-subtle rounded-md text-text-primary placeholder-text-tertiary focus:outline-none focus:border-border-active focus:ring-1 focus:ring-border-active font-jetbrains text-sm transition-colors"
                                />
                            </div>
                            <button
                                onClick={handleConnectDrive}
                                disabled={!driveUrl}
                                className="w-full mt-2 px-6 py-2 bg-accent-white text-bg-primary rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                            >
                                Connect Stream
                            </button>
                        </div>
                    </div>
                </div>

                {/* Local Upload Option */}
                <div className="bg-bg-secondary border border-border-subtle rounded-lg p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <Upload className="text-primary" size={24} />
                        <h3 className="font-inter font-semibold text-accent-white">Local Ingestion</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-jetbrains uppercase tracking-widest text-text-tertiary">
                                Select Video File (.mp4)
                            </label>
                            <div className="relative border-2 border-dashed border-border-subtle rounded-md p-4 text-center hover:border-border-active transition-colors cursor-pointer group">
                                <input
                                    type="file"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="space-y-1">
                                    <Upload size={32} className="mx-auto text-text-tertiary group-hover:text-primary transition-colors" />
                                    <p className="text-sm text-text-secondary">
                                        {selectedFile ? selectedFile.name : 'Click or drag video here'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || isUploading}
                                className="w-full mt-2 px-6 py-2 bg-primary text-accent-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-opacity"
                            >
                                {isUploading ? 'Uploading...' : 'Upload & Process'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-text-tertiary text-center pt-4 border-t border-border-subtle">
                Processing occurs locally on your machine engine. Large files may take a few moments to initialize tracking.
            </p>
        </div>
    );
}
