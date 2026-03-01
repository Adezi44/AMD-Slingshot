import { Camera, Activity, Route } from 'lucide-react';

export default function Architecture() {
    return (
        <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden text-text-primary font-mono bg-[#050505] pb-32 pt-24 md:pt-32">

            <div className="flex flex-col items-center justify-start w-full max-w-4xl mx-auto relative px-4">

                {/* Shared SVG Defs for Arrows used across multiple lines */}
                <svg className="w-0 h-0 absolute pointer-events-none">
                    <defs>
                        <marker id="arrow-white" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" />
                        </marker>
                        <marker id="arrow-gray" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#aaaaaa" />
                        </marker>
                    </defs>
                </svg>

                {/* 1. DATA INGESTION */}
                <div className="w-[300px] flex flex-col items-center z-10">
                    <span className="text-[14px] opacity-70 mb-2 whitespace-nowrap text-white font-bold">1. Data Ingestion</span>
                    <div className="bg-[#111111] border-[1px] border-white/50 p-6 w-full text-center shadow-lg">
                        <span className="text-white text-[14px] flex items-center justify-center gap-2">
                            <Camera size={18} /> Live CCTV / RTSP Stream
                        </span>
                    </div>
                </div>

                {/* Line: Ingestion -> AMD Edge */}
                <div className="flex flex-col items-center my-[-4px] z-0">
                    <svg width="4" height="60" className="overflow-visible">
                        <path d="M 2 0 L 2 60" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-white)" />
                    </svg>
                    <span className="uppercase tracking-widest leading-none font-bold text-[10px] text-white mt-8 mb-2 z-10 bg-[#050505] px-2">LIVE VIDEO FRAMES</span>
                    <svg width="4" height="60" className="overflow-visible">
                        <path d="M 2 0 L 2 60" stroke="#ffffff" strokeWidth="2" fill="none" />
                    </svg>
                </div>


                {/* 2. AMD EDGE PROCESSING NODE (Wrapper) */}
                <div className="w-full md:w-[740px] border-[1px] border-dashed border-[#555555] p-6 lg:p-12 flex flex-col items-center z-10 relative mt-4">
                    <span className="text-[14px] text-center mb-8 uppercase text-[#aaaaaa] absolute -top-4 w-full left-0 font-bold bg-[#050505] inline-block px-4 max-w-fit mx-auto right-0">
                        2. AMD Edge Processing Node
                    </span>

                    {/* CV Pipeline Sub-box */}
                    <div className="border-[1px] border-white/50 p-6 md:p-8 flex flex-col items-center w-full relative">
                        <span className="text-[14px] opacity-90 mb-6 w-full text-center text-white font-bold">Computer Vision Pipeline</span>

                        <div className="bg-[#1a1a1a] text-white px-6 py-4 border-b-[4px] border-[#ffffff] z-10 w-[260px] text-center shadow-lg font-bold">
                            OpenCV Preprocessing
                        </div>

                        {/* Internal CV Split lines */}
                        <svg width="300" height="40" className="my-2 overflow-visible z-0">
                            {/* Down from preproc */}
                            <path d="M 150 0 L 150 15" stroke="#aaaaaa" strokeWidth="2" fill="none" />
                            {/* Horizontal split */}
                            <path d="M 20 15 L 280 15" stroke="#aaaaaa" strokeWidth="2" fill="none" />
                            {/* Down to branches */}
                            <path d="M 20 15 L 20 40" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-gray)" />
                            <path d="M 280 15 L 280 40" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-gray)" />
                        </svg>

                        <div className="flex w-full justify-around items-center z-10">
                            <div className="bg-[#1a1a1a] text-white px-4 py-3 border-b-[4px] border-[#ffffff] w-[200px] text-center shadow-lg font-bold text-sm">
                                YOLOv8 Inference
                            </div>
                            <div className="bg-[#1a1a1a] text-white px-4 py-3 border-b-[4px] border-[#ffffff] w-[200px] text-center shadow-lg font-bold text-sm">
                                Lucas-Kanade Flow
                            </div>
                        </div>
                    </div>

                    {/* Line: CV -> Math */}
                    <svg width="4" height="60" className="my-4 overflow-visible z-0">
                        <path d="M 2 0 L 2 60" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-gray)" />
                    </svg>

                    {/* Predictive Engine Sub-box */}
                    <div className="border-[1px] border-white/30 p-6 md:p-8 flex flex-col items-center w-full relative">
                        <span className="text-[14px] mb-6 w-full text-center text-[#cccccc] font-bold">Predictive Decision Engine</span>

                        <div className="bg-[#1a1a1a] text-white px-6 py-4 border-b-[4px] border-[#ffffff] z-10 w-[280px] text-center shadow-lg font-bold">
                            CPI & Surge Detection (Math)
                        </div>

                        <svg width="4" height="40" className="my-2 overflow-visible z-0">
                            <path d="M 2 0 L 2 40" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-gray)" />
                        </svg>

                        <div className="bg-[#1a1a1a] text-white px-6 py-4 border-b-[4px] border-[#ffffff] z-10 w-[280px] text-center shadow-lg font-bold">
                            A* Dynamic Escape Routing
                        </div>
                    </div>
                </div>

                {/* Line: AMD Edge -> Transport */}
                <div className="flex flex-col items-center my-[-4px] z-0">
                    <svg width="4" height="60" className="overflow-visible">
                        <path d="M 2 0 L 2 60" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-white)" />
                    </svg>
                    <span className="uppercase tracking-widest leading-none font-bold text-[10px] text-white mt-8 mb-2 z-10 bg-[#050505] px-2">PROCESSED TELEMETRY</span>
                    <svg width="4" height="60" className="overflow-visible">
                        <path d="M 2 0 L 2 60" stroke="#ffffff" strokeWidth="2" fill="none" />
                    </svg>
                </div>

                {/* 3. DATA TRANSPORT */}
                <div className="w-[300px] flex flex-col items-center z-10 group">
                    <span className="text-[14px] mb-2 whitespace-nowrap text-[#aaaaaa] font-bold">3. Data Transport</span>
                    <div className="bg-[#222222] p-6 w-full text-center hover:brightness-110 transition-all shadow-lg border-b-[4px] border-[#ffffff]">
                        <span className="text-white text-[14px] leading-relaxed block font-bold">
                            FastAPI WebSockets<br />
                            <span className="opacity-80 text-[11px] font-normal">(30fps JSON Telemetry)</span>
                        </span>
                    </div>
                </div>

                {/* Line: Transport -> MERN -> Transport (Bidirectional) */}
                <div className="flex flex-col items-center my-4 z-0 relative">
                    <svg width="40" height="90" className="overflow-visible">
                        {/* Down Arrow */}
                        <path d="M 10 0 L 10 90" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-white)" />
                        {/* Up Arrow */}
                        <path d="M 30 90 L 30 0" stroke="#ffffff" strokeWidth="2" fill="none" markerEnd="url(#arrow-white)" />
                    </svg>
                    <div className="absolute top-1/2 -translate-y-1/2 bg-[#050505] py-2 px-4 z-10">
                        <span className="uppercase tracking-widest leading-none font-bold text-[10px] text-white">BI-DIRECTIONAL SYNC</span>
                    </div>
                </div>


                {/* 4. MERN COMMAND CENTER */}
                <div className="w-full md:w-[600px] border-[1px] border-dashed border-[#555555] p-6 lg:p-10 flex flex-col items-center justify-start z-10 relative">
                    <span className="text-[14px] mb-8 uppercase text-[#aaaaaa] font-bold absolute -top-4 bg-[#050505] px-4">
                        4. MERN Command Center
                    </span>

                    <div className="flex flex-col items-center w-full">
                        <div className="bg-[#1a1a1a] text-white px-8 py-5 z-10 text-center shadow-lg border-b-[4px] border-[#555555] w-[300px] font-bold text-[16px]">
                            React 18 Dashboard UI
                        </div>

                        {/* Internal UI Split lines */}
                        <svg width="240" height="40" className="my-4 overflow-visible z-0">
                            {/* Down from React */}
                            <path d="M 120 0 L 120 15" stroke="#aaaaaa" strokeWidth="2" fill="none" />
                            {/* Horizontal split */}
                            <path d="M 10 15 L 230 15" stroke="#aaaaaa" strokeWidth="2" fill="none" />
                            {/* Down to branches */}
                            <path d="M 10 15 L 10 40" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-gray)" />
                            <path d="M 230 15 L 230 40" stroke="#aaaaaa" strokeWidth="2" fill="none" markerEnd="url(#arrow-gray)" />
                        </svg>

                        <div className="flex justify-between w-full max-w-[500px]">
                            <div className="bg-[#1a1a1a] text-white px-6 py-4 z-10 text-center shadow-lg border-b-[4px] border-[#555555] hover:-translate-y-1 transition-transform cursor-pointer flex items-center justify-center font-bold text-[13px] w-[220px]">
                                <Activity size={16} className="inline mr-2 flex-shrink-0" /> Live Recharts Analytics
                            </div>
                            <div className="bg-[#1a1a1a] text-white px-6 py-4 z-10 text-center shadow-lg border-b-[4px] border-[#555555] hover:-translate-y-1 transition-transform cursor-pointer flex items-center justify-center font-bold text-[13px] w-[220px]">
                                <Route size={16} className="inline mr-2 flex-shrink-0" /> Venue Evacuation Map
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
