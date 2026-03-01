import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('Login Success:', codeResponse);
            navigate('/picker');
        },
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/drive.readonly',
    });

    return (
        <div className="w-full h-screen bg-bg-primary flex flex-col items-center justify-center font-mono">

            <div className="flex flex-col items-center gap-8 w-full max-w-lg z-10">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-koulen text-[100px] leading-none text-text-primary tracking-tighter">CMADS</h1>
                    <p className="text-[12px] opacity-50 uppercase tracking-widest text-center">
                        Computerized Monitoring and Detection System.<br />
                        Authenticate to access the command console.
                    </p>
                </div>

                <div className="flex flex-col w-full gap-4 mt-8">
                    <button
                        onClick={() => login()}
                        className="w-full border border-text-primary/20 py-4 text-[14px] uppercase hover:bg-text-primary hover:text-text-secondary transition-colors"
                    >
                        [ AUTHENTICATE VIA GOOGLE ]
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full border border-text-primary/20 py-4 text-[14px] uppercase hover:bg-risk-moderate hover:text-text-secondary hover:border-risk-moderate transition-colors text-text-primary/70"
                    >
                        [ DEV BYPASS: ENTER DASHBOARD ]
                    </button>

                    <p className="text-[10px] text-risk-critical mt-4 text-center">
                        Note: Local ports (like 5174) may not be whitelisted in your Google Cloud OAuth consent screen. Use the dev bypass to view the UI.
                    </p>
                </div>
            </div>
        </div>
    );
}
