import { Network, Cpu } from 'lucide-react';

export default function Architecture() {
    return (
        <div className="w-full flex justify-center text-text-primary font-mono pb-32">
            <div className="w-full max-w-4xl flex flex-col gap-[150px] mt-12">

                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-text-primary/20 pb-12">
                    <h2 className="font-koulen text-[80px] leading-none tracking-tight">SYSTEM ARCHITECTURE</h2>
                    <p className="opacity-70 text-[14px] uppercase max-w-2xl leading-relaxed">
                        A rigorous technical breakdown of the Real-Time Intelligent Crowd and Motion Anomaly Detection System (CMADS) pipeline, composite metrics, and edge-deployment methodology.
                    </p>
                </div>

                {/* Module Breakdown */}
                <div className="flex flex-col gap-12">
                    <h3 className="font-koulen text-[40px] leading-none">1. MODULE BREAKDOWN</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-l border-text-primary/20 pl-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-[12px] opacity-50 block uppercase">Module Alpha</span>
                            <div className="flex items-center gap-3">
                                <Cpu size={20} className="text-text-primary" />
                                <h4 className="text-[18px] font-bold">PERSON DETECTION</h4>
                            </div>
                            <p className="text-[12px] opacity-70 leading-relaxed mt-2">
                                Utilizes YOLOv8s (lightweight model) for real-time bounding box detection, configured with stringent confidence filtering. Deployed via optimized inference pipelines ensuring ≥15 FPS on edge hardware.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[12px] opacity-50 block uppercase">Module Beta</span>
                            <div className="flex items-center gap-3">
                                <Network size={20} className="text-text-primary" />
                                <h4 className="text-[18px] font-bold">CHAOS ESTIMATION</h4>
                            </div>
                            <p className="text-[12px] opacity-70 leading-relaxed mt-2">
                                Employs dense optical flow (Farneback Method) to extract motion vector angles. Calculates angular dispersion as a chaos metric; higher standard deviation of motion direction directly correlates to disorganized crowd movement.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mathematical Formulation */}
                <div className="flex flex-col gap-12">
                    <h3 className="font-koulen text-[40px] leading-none">2. MATHEMATICAL FORMULATION</h3>

                    <div className="bg-text-primary text-bg-primary p-8 flex flex-col gap-6">
                        <span className="text-[12px] opacity-70 block uppercase font-bold">Composite Public Safety Index (CPI)</span>

                        <div className="font-serif italic text-[24px]">
                            CPI = w₁ (Density) + w₂ (Motion) + w₃ (Spatial Clutter) + w₄ (Chaos)
                        </div>

                        <ul className="text-[12px] flex flex-col gap-2 opacity-80 list-disc ml-4">
                            <li>All sub-components are mathematically normalized (0.0 - 1.0).</li>
                            <li>Weights (w) are configurable dependent on the specific gathering zone.</li>
                            <li>Global CPI is computed as the weighted average across all spatial zones.</li>
                        </ul>
                    </div>
                </div>

                {/* Data Flow Diagram (Stark CSS) */}
                <div className="flex flex-col gap-12 border-t border-text-primary/20 pt-16">
                    <h3 className="font-koulen text-[40px] leading-none text-right">3. SURGE LOGIC PSEUDOCODE</h3>

                    <div className="border border-text-primary/20 p-8 text-[12px] leading-loose">
                        <pre className="whitespace-pre-wrap">
                            {`FUNCTION DetectSurge(GlobalCPI, ChaosMetric, Density):
    READ TimeWindow(t, t-5)
    
    // Hysteresis Logic to prevent flickering
    IF CurrentState == "WARNING_ACTIVE":
        IF GlobalCPI < SAFE_THRESHOLD FOR CooldownPeriod:
            RETURN "SAFE"
        ELSE:
            RETURN "WARNING_ACTIVE"
            
    // Anomaly Detection
    deltaCPI = GlobalCPI(t) - EMA(GlobalCPI(t-5))
    
    IF deltaCPI > SPIKE_THRESHOLD:
        TRIGGER_ALARM("RAPID ESCALATION")
        RETURN "WARNING_ACTIVE"
        
    IF ChaosMetric > CRITICAL_CHAOS OR Density > CRUSH_RISK:
        TRIGGER_ALARM("SYSTEM OVERLOAD")
        RETURN "WARNING_ACTIVE"
        
    RETURN "SAFE"
`}
                        </pre>
                    </div>
                </div>

            </div>
        </div>
    );
}
