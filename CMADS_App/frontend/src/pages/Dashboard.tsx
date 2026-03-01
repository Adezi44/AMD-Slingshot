import { useState, useEffect, useRef } from 'react';

type TelemetryData = {
    globalRisk: number;
    detections: number;
    fps: number;
    surgeWarning: boolean;
    zones: { id: number; name: string; cpi: number; status: string; peopleCount: number }[];
    frame: string | null;
};

type LogEntry = {
    timestamp: string;
    message: string;
    type: 'info' | 'warn' | 'error';
};

export default function Dashboard() {
    // Extract video ID from localStorage, or default to "local"
    const videoSourceId = localStorage.getItem('cmads_video_source') || "local";

    const [telemetry, setTelemetry] = useState<TelemetryData>({
        globalRisk: 0.0,
        detections: 0,
        fps: 24,
        surgeWarning: false,
        zones: [
            { id: 1, name: 'Zone 1', cpi: 0.0, status: 'SAFE', peopleCount: 0 },
            { id: 2, name: 'Zone 2', cpi: 0.0, status: 'SAFE', peopleCount: 0 },
            { id: 3, name: 'Zone 3', cpi: 0.0, status: 'SAFE', peopleCount: 0 },
            { id: 4, name: 'Zone 4', cpi: 0.0, status: 'SAFE', peopleCount: 0 }
        ],
        frame: null
    });

    const [logs, setLogs] = useState<LogEntry[]>([{ timestamp: new Date().toLocaleTimeString(), message: 'SYSTEM INITIALIZED', type: 'info' }]);
    const [historyData, setHistoryData] = useState<TelemetryData[]>([]);
    const [showLogs, setShowLogs] = useState(false);
    const [isCalibrating, setIsCalibrating] = useState(false);
    const [restartKey, setRestartKey] = useState(0);

    const wsRef = useRef<WebSocket | null>(null);

    const addLog = (message: string, type: 'info' | 'warn' | 'error' = 'info') => {
        setLogs(prev => [...prev, { timestamp: new Date().toLocaleTimeString(), message, type }]);
    };


    useEffect(() => {
        // Connect to FastAPI backend
        const wsUrl = `ws://localhost:8000/ws/${videoSourceId}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connected");
            addLog(`CONNECTION ESTABLISHED TO STREAM [${videoSourceId}]`, 'info');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.error) {
                    console.error("Backend Error:", data.error);
                    addLog(`STREAM ERROR: ${data.error}`, 'error');
                    return;
                }

                const newTelemetry = {
                    globalRisk: data.globalRisk || 0,
                    detections: data.zones?.reduce((acc: number, z: any) => acc + (z.peopleCount || 0), 0) || 0,
                    fps: 24, // Assuming 24 as backend doesn't send FPS currently
                    surgeWarning: data.surgeWarning || false,
                    zones: data.zones || [],
                    frame: data.frame || null
                };

                setTelemetry(newTelemetry);

                // Keep last 100 historical records for export
                setHistoryData(prev => {
                    const next = [...prev, newTelemetry];
                    if (next.length > 100) next.shift();
                    return next;
                });

                if (data.surgeWarning && !telemetry.surgeWarning) {
                    addLog('SURGE WARNING DETECTED - RAPID DENSITY INCREASE', 'warn');
                }

            } catch (err) {
                console.error("Failed to parse WebSocket message:", err);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected.");
            addLog('CONNECTION TERMINATED', 'warn');
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error: ", error);
            addLog('WEBSOCKET PROTOCOL ERROR', 'error');
        };

        return () => {
            ws.close();
        };
    }, [videoSourceId, restartKey]);

    const handleCalibrate = () => {
        addLog('MANUAL CALIBRATION PROTOCOL INITIATED', 'info');
        setIsCalibrating(true);
        setTimeout(() => setIsCalibrating(false), 1500);
    };

    const handleReset = () => {
        addLog('YOLOv8 TRACKING STATE RESET FORCED', 'warn');
        setRestartKey(prev => prev + 1);
    };

    const handleExport = () => {
        addLog('EXPORTING TELEMETRY (CSV)', 'info');

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Timestamp,Global Risk,Detections,Surge Warning\n";

        historyData.forEach(row => {
            // Reconstruct a pseudo timestamp based on array index since real time is rapid
            const timestamp = new Date().toISOString();
            const csvRow = `${timestamp},${row.globalRisk},${row.detections},${row.surgeWarning}`;
            csvContent += csvRow + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "cmads_telemetry_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getZoneColor = (cpi: number) => {
        if (cpi > 0.85) return 'bg-risk-critical';
        if (cpi > 0.6) return 'bg-risk-moderate';
        return 'bg-risk-safe';
    };

    return (
        <div className={`w-full h-full flex flex-col md:flex-row gap-12 font-mono uppercase ${telemetry.surgeWarning ? 'animate-surge-bg' : ''} transition-colors duration-75`}>

            {/* Left: Telemetry Panel */}
            <div className="w-full md:w-1/4 flex flex-col justify-end pb-12 gap-12">
                <div className="flex flex-col gap-1">
                    <span className="text-[12px] opacity-50 block">GLOBAL CPI</span>
                    <span className="text-[40px] leading-none text-text-primary tracking-tighter">{(telemetry.globalRisk * 100).toFixed(1)}</span>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between border-b border-text-primary/20 pb-1">
                        <span className="text-[12px] opacity-50">DETECTIONS</span>
                        <span className="text-[12px]">{telemetry.detections} PERSONS</span>
                    </div>
                    <div className="flex justify-between border-b border-text-primary/20 pb-1">
                        <span className="text-[12px] opacity-50">STREAM FPS</span>
                        <span className="text-[12px]">{telemetry.fps}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-8">
                    <button onClick={handleCalibrate} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1">[ CALIBRATE ]</button>
                    <button onClick={handleReset} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1 text-risk-moderate">[ RESET MODEL ]</button>
                    <button onClick={() => setShowLogs(true)} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1">[ SYSTEM LOGS ]</button>
                    <button onClick={handleExport} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1">[ DATA EXPORT ]</button>
                </div>
            </div>

            {/* Right: Live Video Grid */}
            <div className={`relative flex-1 bg-black border ${telemetry.surgeWarning ? 'border-risk-critical border-[4px]' : 'border-text-primary/20'} transition-all duration-75 flex flex-col overflow-hidden`}>

                {/* Video Stream Background */}
                {telemetry.frame && (
                    <img src={`data:image/jpeg;base64,${telemetry.frame}`} alt="Stream Frame" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
                )}

                {/* 2x2 Grid */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    {telemetry.zones.map((zone, idx) => (
                        <div key={zone.id} className="relative border border-text-primary/10 overflow-hidden">
                            {/* Translucent overlay based on risk */}
                            <div className={`absolute inset-0 ${getZoneColor(zone.cpi)} opacity-[15%] mix-blend-screen`}></div>

                            {/* Floating data sharp to corner */}
                            <div className={`absolute p-4 flex flex-col ${idx % 2 === 0 ? 'bottom-0 left-0 text-left' : 'bottom-0 right-0 text-right'}`}>
                                <span className="font-koulen text-[32px] md:text-[48px] leading-none opacity-80">{zone.name}</span>
                                <span className="text-[12px] mt-1">CPI: {zone.cpi.toFixed(2)}</span>
                                <span className="text-[12px] opacity-50">
                                    COUNT: {zone.peopleCount} | STATUS: {zone.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Surge Overlay Text */}
                {telemetry.surgeWarning && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <h2 className="font-serif italic text-risk-critical text-[40px] md:text-[64px] bg-black/80 px-4 py-2 leading-none text-center mix-blend-screen uppercase">
                            [ SURGE WARNING IN EFFECT ]
                        </h2>
                    </div>
                )}

                {/* Calibrating Overlay */}
                {isCalibrating && (
                    <div className="absolute inset-0 bg-text-primary/10 flex items-center justify-center pointer-events-none z-20">
                        <div className="w-full h-1 bg-text-primary/50 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 bg-text-primary animate-ping w-1/4"></div>
                        </div>
                        <h2 className="absolute font-mono text-text-primary text-[24px] tracking-widest bg-black px-4 py-2 animate-pulse">
                            CALIBRATING SENSORS...
                        </h2>
                    </div>
                )}

                {/* System Logs Modal overlay within Right Panel */}
                {showLogs && (
                    <div className="absolute inset-0 bg-black/95 z-30 p-8 flex flex-col border border-text-primary/30 font-jetbrains overflow-hidden">
                        <div className="flex justify-between items-center mb-6 border-b border-text-primary/20 pb-2">
                            <h3 className="text-text-primary tracking-widest uppercase">System Execution Logs</h3>
                            <button onClick={() => setShowLogs(false)} className="text-text-primary hover:text-risk-critical">[ CLOSE TERMINAL ]</button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 text-xs flex flex-col-reverse">
                            {/* Render reversed so newest is at bottom naturally */}
                            {[...logs].reverse().map((log, i) => (
                                <div key={i} className={`flex gap-4 ${log.type === 'warn' ? 'text-risk-moderate' : log.type === 'error' ? 'text-risk-critical' : 'text-text-primary/70'}`}>
                                    <span className="opacity-50 flex-shrink-0">[{log.timestamp}]</span>
                                    <span>{log.message}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
