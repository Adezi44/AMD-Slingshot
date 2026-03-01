import { useState, useRef, MouseEvent, WheelEvent } from 'react';
import { Camera, Activity, Route } from 'lucide-react';

export default function Architecture() {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const dragRef = useRef({ startX: 0, startY: 0 });

    const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        dragRef.current = {
            startX: e.clientX - position.x,
            startY: e.clientY - position.y
        };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragRef.current.startX,
            y: e.clientY - dragRef.current.startY
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
        // Prevent default scrolling handled by CSS overflow-hidden, but we adjust scale here
        const zoomSensitivity = 0.001;
        const delta = e.deltaY * -1; // invert scroll direction

        let newScale = scale + (delta * zoomSensitivity);
        // Clamp scale between 0.3x and 3x
        newScale = Math.min(Math.max(0.3, newScale), 3);

        setScale(newScale);
    };

    return (
        <div
            className="w-full relative h-[100vh] overflow-hidden text-text-primary font-mono bg-[#050505]"
            onWheel={handleWheel}
        >

            {/* Draggable Canvas Window */}
            <div
                className={`absolute inset-0 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* The infinitely pannable and zoomable Inner Canvas */}
                <div
                    className="absolute top-1/2 left-1/2 min-w-[3000px] min-h-[2000px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-75 ease-out origin-center"
                    style={{ transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})` }}
                >

                    {/* SVG Connector Lines Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minWidth: '3000px', minHeight: '2000px' }}>
                        <defs>
                            <marker id="arrow-magenta" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" />
                            </marker>
                            <marker id="arrow-green" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#aaaaaa" />
                            </marker>
                        </defs>

                        {/* 1 to 2 Main Input Line */}
                        <path d="M 850 1000 L 1030 1000" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-magenta)" />
                        <text x="940" y="990" fill="#ffffff" fontSize="10" textAnchor="middle" className="uppercase tracking-widest leading-none font-bold">LIVE VIDEO FRAMES</text>

                        {/* Node 2 Internal Splits (CV Pipeline) */}
                        <path d="M 1420 785 L 1420 805 L 1250 805 L 1250 835" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />
                        <path d="M 1420 785 L 1420 805 L 1590 805 L 1590 835" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />

                        {/* Node 2 Internal (CV -> Math) */}
                        <path d="M 1590 885 L 1590 1035 L 1420 1035 L 1420 1055" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />

                        {/* Node 2 Internal (Predictive Math -> Routing) */}
                        <path d="M 1420 1105 L 1420 1140" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-magenta)" />

                        {/* 2 to 3 Transport Line */}
                        <path d="M 1790 1000 L 1930 1000" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-magenta)" />
                        <text x="1860" y="990" fill="#ffffff" fontSize="10" textAnchor="middle" className="uppercase tracking-widest leading-none font-bold">PROCESSED TELEMETRY</text>

                        {/* 3 to 4 Transport Line */}
                        <path d="M 2150 1000 L 2330 1000" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-magenta)" />
                        <path d="M 2330 1010 L 2150 1010" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-magenta)" />
                        <text x="2240" y="990" fill="#ffffff" fontSize="10" textAnchor="middle" className="uppercase tracking-widest leading-none font-bold">BI-DIRECTIONAL SYNC</text>
                    </svg>

                    {/* Nodes Container (Absolute positioning over SVG) */}
                    <div className="absolute inset-0 pointer-events-none">

                        {/* 1. DATA INGESTION */}
                        <div className="absolute top-[960px] left-[650px] w-[200px] flex flex-col items-center">
                            <span className="text-[12px] opacity-70 mb-2 whitespace-nowrap text-white font-bold">1. Data Ingestion</span>
                            <div className="bg-[#111111] border-[1px] border-white p-4 w-full text-center">
                                <span className="text-white text-[12px] flex items-center justify-center gap-2">
                                    <Camera size={14} /> Live CCTV / RTSP Stream
                                </span>
                            </div>
                        </div>

                        {/* 2. AMD EDGE PROCESSING NODE (Wrapper) */}
                        <div className="absolute top-[700px] left-[1050px] w-[740px] h-[600px] border-[1px] border-dashed border-[#555555] p-6 flex flex-col pointer-events-auto">
                            <span className="text-[12px] text-center mb-4 uppercase text-[#aaaaaa] absolute -top-8 w-full left-0 font-bold">
                                2. AMD Edge Processing Node
                            </span>

                            {/* CV Pipeline Sub-box */}
                            <div className="border-[1px] border-white/50 p-6 flex flex-col items-center flex-1 h-[260px] relative">
                                <span className="text-[12px] opacity-90 mb-6 w-full text-center text-white font-bold">Computer Vision Pipeline</span>

                                <div className="bg-[#1a1a1a] text-white px-6 py-3 border-b-[4px] border-[#ffffff] z-10 w-[240px] text-center shadow-lg">
                                    OpenCV Preprocessing
                                </div>

                                <div className="flex w-full justify-between items-center px-24 mt-8 z-10">
                                    <div className="bg-[#1a1a1a] text-white px-6 py-3 border-b-[4px] border-[#ffffff] w-[240px] text-center shadow-lg">
                                        YOLOv8 Inference
                                    </div>
                                    <div className="bg-[#1a1a1a] text-white px-6 py-3 border-b-[4px] border-[#ffffff] w-[240px] text-center shadow-lg">
                                        Lucas-Kanade Flow
                                    </div>
                                </div>
                            </div>

                            {/* Predictive Engine Sub-box */}
                            <div className="border-[1px] border-white/30 p-6 flex flex-col items-center flex-1 mt-6 h-[240px] relative">
                                <span className="text-[12px] mb-6 w-full text-center text-white font-bold">Predictive Decision Engine</span>

                                <div className="bg-[#1a1a1a] text-white px-6 py-4 border-b-[4px] border-[#ffffff] z-10 w-[260px] text-center shadow-lg">
                                    CPI & Surge Detection (Math)
                                </div>

                                <div className="bg-[#1a1a1a] text-white px-6 py-4 border-b-[4px] border-[#ffffff] z-10 w-[260px] text-center mt-6 shadow-lg">
                                    A* Dynamic Escape Routing
                                </div>
                            </div>
                        </div>

                        {/* 3. DATA TRANSPORT */}
                        <div className="absolute top-[960px] left-[1950px] w-[200px] flex flex-col items-center pointer-events-auto group">
                            <span className="text-[12px] mb-2 whitespace-nowrap text-[#aaaaaa] font-bold">3. Data Transport</span>
                            <div className="bg-[#222222] p-4 w-full text-center hover:brightness-110 transition-all shadow-lg border-b-[4px] border-[#ffffff]">
                                <span className="text-white text-[12px] leading-relaxed block font-bold">
                                    FastAPI WebSockets<br />
                                    <span className="opacity-80 text-[10px] font-normal">(30fps JSON Telemetry)</span>
                                </span>
                            </div>
                        </div>

                        {/* 4. MERN COMMAND CENTER */}
                        <div className="absolute top-[820px] left-[2350px] w-[500px] h-[360px] border-[1px] border-dashed border-[#555555] p-6 flex flex-col items-center justify-start pointer-events-auto">
                            <span className="text-[12px] mb-8 uppercase text-[#aaaaaa] font-bold">
                                4. MERN Command Center
                            </span>

                            <div className="flex flex-col items-center gap-14 w-full px-8">
                                <div className="bg-[#1a1a1a] text-white px-8 py-4 z-10 text-center shadow-lg border-b-[4px] border-[#555555] w-[280px] font-bold">
                                    React 18 Dashboard UI
                                </div>

                                <div className="flex justify-between w-full">
                                    <div className="bg-[#1a1a1a] text-white px-6 py-4 z-10 text-center shadow-lg border-b-[4px] border-[#555555] hover:-translate-y-1 transition-transform cursor-pointer flex items-center justify-center font-bold">
                                        <Activity size={14} className="inline mr-2" /> Live Recharts Analytics
                                    </div>
                                    <div className="bg-[#1a1a1a] text-white px-6 py-4 z-10 text-center shadow-lg border-b-[4px] border-[#555555] hover:-translate-y-1 transition-transform cursor-pointer flex items-center justify-center font-bold">
                                        <Route size={14} className="inline mr-2" /> Venue Evacuation Map
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
