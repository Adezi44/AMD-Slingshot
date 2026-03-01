import { useState, useEffect } from 'react';

type TelemetryData = {
    global_cpi: number;
    detections: number;
    fps: number;
    surge: boolean;
    zones: { id: string; cpi: number; density: number; motion: number }[];
};

export default function Dashboard() {
    const [telemetry, setTelemetry] = useState<TelemetryData>({
        global_cpi: 0.0,
        detections: 0,
        fps: 24,
        surge: false,
        zones: [
            { id: 'TOP-LEFT', cpi: 0.2, density: 0.1, motion: 0.1 },
            { id: 'TOP-RIGHT', cpi: 0.4, density: 0.3, motion: 0.2 },
            { id: 'BTM-LEFT', cpi: 0.1, density: 0.1, motion: 0.1 },
            { id: 'BTM-RIGHT', cpi: 0.7, density: 0.8, motion: 0.6 },
        ]
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTelemetry(prev => {
                const newCpi = Math.max(0, Math.min(1, prev.global_cpi + (Math.random() - 0.5) * 0.1));
                const isSurge = newCpi > 0.85;

                return {
                    ...prev,
                    global_cpi: newCpi,
                    detections: Math.floor(Math.random() * 50) + 10,
                    fps: 24 + Math.floor(Math.random() * 5),
                    surge: isSurge,
                    zones: prev.zones.map(z => ({
                        ...z,
                        cpi: Math.max(0, Math.min(1, z.cpi + (Math.random() - 0.5) * 0.2)),
                        density: Math.max(0, Math.min(1, z.density + (Math.random() - 0.5) * 0.1)),
                        motion: Math.max(0, Math.min(1, z.motion + (Math.random() - 0.5) * 0.1)),
                    }))
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getZoneColor = (cpi: number) => {
        if (cpi > 0.85) return 'bg-risk-critical';
        if (cpi > 0.6) return 'bg-risk-moderate';
        return 'bg-risk-safe';
    };

    return (
        <div className={`w-full h-full flex flex-col md:flex-row gap-12 font-mono uppercase ${telemetry.surge ? 'animate-surge-bg' : ''} transition-colors duration-75`}>

            {/* Left: Telemetry Panel */}
            <div className="w-full md:w-1/4 flex flex-col justify-end pb-12 gap-12">
                <div className="flex flex-col gap-1">
                    <span className="text-[12px] opacity-50 block">GLOBAL CPI</span>
                    <span className="text-[40px] leading-none text-text-primary tracking-tighter">{(telemetry.global_cpi * 100).toFixed(1)}</span>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between border-b border-text-primary/20 pb-1">
                        <span className="text-[12px] opacity-50">DENSITY</span>
                        <span className="text-[12px]">W1 : {(Math.random()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-text-primary/20 pb-1">
                        <span className="text-[12px] opacity-50">MOTION</span>
                        <span className="text-[12px]">W2 : {(Math.random()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-text-primary/20 pb-1">
                        <span className="text-[12px] opacity-50">CHAOS</span>
                        <span className="text-[12px]">W3 : {(Math.random()).toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-8">
                    <button onClick={() => alert("Model Calibration Protocol Initiated...")} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1">[ CALIBRATE ]</button>
                    <button onClick={() => alert("Warning: Resetting YOLOv8s tracking state...")} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1">[ RESET MODEL ]</button>
                    <button onClick={() => alert("Fetching system logs from edge device...")} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1">[ SYSTEM LOGS ]</button>
                    <button onClick={() => alert("Exporting 24hr CPI Telemetry (CSV)...")} className="text-left hover:bg-text-primary hover:text-text-secondary w-fit transition-none px-1">[ DATA EXPORT ]</button>
                </div>
            </div>

            {/* Right: Live Video Grid */}
            <div className={`relative flex-1 bg-black border ${telemetry.surge ? 'border-risk-critical border-[4px]' : 'border-text-primary/20'} transition-all duration-75 flex flex-col`}>

                {/* 2x2 Grid */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    {telemetry.zones.map((zone, idx) => (
                        <div key={zone.id} className="relative border border-text-primary/10 overflow-hidden">
                            {/* Translucent overlay based on risk */}
                            <div className={`absolute inset-0 ${getZoneColor(zone.cpi)} opacity-[15%] mix-blend-screen`}></div>

                            {/* Floating data sharp to corner */}
                            <div className={`absolute p-4 flex flex-col ${idx % 2 === 0 ? 'bottom-0 left-0 text-left' : 'bottom-0 right-0 text-right'}`}>
                                <span className="font-koulen text-[32px] md:text-[48px] leading-none opacity-80">{zone.id}</span>
                                <span className="text-[12px] mt-1">CPI: {zone.cpi.toFixed(2)}</span>
                                <span className="text-[12px] opacity-50">
                                    DENS: {zone.density.toFixed(2)} | MOT: {zone.motion.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Surge Overlay Text */}
                {telemetry.surge && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <h2 className="font-serif italic text-risk-critical text-[40px] md:text-[64px] bg-black/80 px-4 py-2 leading-none text-center mix-blend-screen uppercase">
                            [ SURGE WARNING IN EFFECT ]
                        </h2>
                    </div>
                )}
            </div>

        </div>
    );
}
