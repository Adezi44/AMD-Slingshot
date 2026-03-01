import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Link2 } from 'lucide-react';

export default function Picker() {
    const navigate = useNavigate();
    // In a full implementation, you'd use the access_token here to list Google Drive files
    const [driveUrl, setDriveUrl] = useState('');

    const handleConnect = () => {
        // Navigate to dashboard and optionally pass the file ID
        navigate('/dashboard', { state: { videoSource: driveUrl } });
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="space-y-2 border-b border-border-subtle pb-6">
                <h2 className="text-2xl font-inter font-bold text-accent-white">Video Source Configuration</h2>
                <p className="text-sm text-text-secondary">
                    Connect the inference engine to a Google Drive video stream or a local feed.
                </p>
            </header>

            <div className="bg-bg-secondary border border-border-subtle rounded-lg p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <Database className="text-primary" size={24} />
                    <h3 className="font-inter font-semibold text-accent-white">Data Ingestion</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-jetbrains uppercase tracking-widest text-text-tertiary">
                            Google Drive File ID or URL
                        </label>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
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
                                onClick={handleConnect}
                                disabled={!driveUrl}
                                className="px-6 py-2 bg-accent-white text-bg-primary rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                            >
                                Connect Stream
                            </button>
                        </div>
                        <p className="text-xs text-text-tertiary">
                            Paste the ID of the .mp4 file to begin processing. The file must be accessible to the authenticated account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
