"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { User, Lock, Eye, EyeOff, ArrowRight, Map } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setRole = useStore((state) => state.setRole);
  const router = useRouter();

  // FIX FOR NEXT.JS FAST REFRESH DUPLICATING CARDS
  useEffect(() => {
    // Check if there are multiple MHA logos on the page (indicates Fast Refresh ghost nodes)
    const logos = document.querySelectorAll('img[src="/mha-logo.png"]');
    if (logos.length > 1) {
      window.location.reload();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        setRole("ADMIN");
        router.push("/admin/dashboard");
      } else if (username === "authority" && password === "authority123") {
        setRole("EMERGENCY_AUTHORITY");
        router.push("/authority/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  };

  const handlePublic = () => {
    setRole("PUBLIC");
    router.push("/risk-map");
  };

  return (
    <div className="login-page-container w-full h-screen overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `

        
        .login-page {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          box-sizing: border-box;
        }

        .login-card {
          width: 520px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 32px);
          box-sizing: border-box;
          padding: 28px 40px;
        }

        .login-logo-container {
          margin-bottom: 16px;
        }

        .login-logo {
          height: 60px;
        }

        .login-title-container {
          margin-bottom: 20px;
        }

        .login-title {
          font-size: 26px;
          line-height: 1.15;
          margin-bottom: 6px;
        }

        .login-subtitle {
          font-size: 13px;
          line-height: 1.35;
        }

        .form-group {
          margin-bottom: 12px;
        }

        .login-btn-container {
          margin-top: 16px;
        }
        
        .login-input {
          height: 44px;
        }

        .login-btn {
          height: 46px;
        }

        .login-credentials {
          margin-top: 10px;
        }

        .login-divider {
          margin-top: 14px;
          margin-bottom: 14px;
        }

        .community-btn {
          height: 48px;
        }

        @media (max-height: 800px) {
          .login-card {
            padding: 22px 34px;
          }
          .login-logo {
            height: 52px;
          }
          .login-title {
            font-size: 24px;
          }
          .login-logo-container {
            margin-bottom: 12px;
          }
          .login-title-container {
            margin-bottom: 16px;
          }
          .form-group {
            margin-bottom: 10px;
          }
          .login-btn-container {
            margin-top: 12px;
          }
          .login-credentials {
            margin-top: 8px;
            font-size: 10px;
          }
          .login-divider {
            margin-top: 12px;
            margin-bottom: 12px;
          }
          .login-input, .login-btn {
            height: 40px;
          }
          .community-btn {
            height: 44px;
          }
        }

        @media (max-height: 650px) {
          .login-card {
            padding: 16px 24px;
          }
          .login-logo {
            height: 44px;
          }
          .login-title {
            font-size: 20px;
          }
          .login-subtitle {
            font-size: 11px;
            line-height: 1.2;
          }
          .login-logo-container {
            margin-bottom: 8px;
          }
          .login-title-container {
            margin-bottom: 10px;
          }
          .form-group {
            margin-bottom: 8px;
          }
          .login-input, .login-btn {
            height: 36px;
            font-size: 12px;
          }
          .community-btn {
            height: 40px;
          }
          .login-divider {
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .login-credentials {
            margin-top: 6px;
          }
        }
      `}} />
      <div className="login-page relative flex items-center justify-center font-sans">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-no-repeat bg-center bg-cover" 
            style={{ backgroundImage: 'url(/login-bg-new.jpg)' }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Login Card */}
        <div className="login-card relative z-10 bg-white rounded-xl shadow-2xl flex flex-col items-center">
          
          {/* Official MHA Logo */}
          <div className="login-logo-container flex justify-center w-full mt-1">
            <a 
              href="https://www.mha.gov.in/en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative hover:opacity-90 transition-opacity block"
            >
              <img 
                src="/mha-logo.png" 
                alt="Ministry of Home Affairs Logo"
                className="login-logo object-contain"
              />
            </a>
          </div>

          {/* Title */}
          <div className="login-title-container text-center w-full">
            <h3 className="login-title font-extrabold text-slate-900 tracking-tight">
              FlashFlood <span className="text-[#1a5b9e]">Alert AI</span>
            </h3>
            <p className="login-subtitle text-slate-500 font-medium">
              Hyper-Local Flash Flood and Landslide<br />Early Warning System
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full">
            <div className="form-group w-full">
              <label className="text-[12px] font-bold text-slate-800 ml-1 block mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-[16px] w-[16px] text-slate-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="login-input w-full pl-9 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  required
                />
              </div>
            </div>

            <div className="form-group w-full">
              <label className="text-[12px] font-bold text-slate-800 ml-1 block mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-[16px] w-[16px] text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="login-input w-full pl-9 pr-10 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-[16px] w-[16px]" /> : <Eye className="h-[16px] w-[16px]" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-center text-red-600 text-[12px] font-medium pt-1 mb-1">
                {error}
              </div>
            )}

            <div className="login-btn-container w-full">
              <button
                type="submit"
                disabled={isLoading}
                className="login-btn w-full bg-[#061b3d] hover:bg-[#0a2756] text-white rounded-lg text-[14px] font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? "Authenticating..." : "Login"} 
                {!isLoading && <ArrowRight className="h-[16px] w-[16px]" />}
              </button>
            </div>

            <div className="login-credentials text-center text-[11px] text-slate-500 leading-tight w-full">
              <p className="font-semibold text-slate-600 mb-0.5">Default Login Credentials:</p>
              <p>Admin: <span className="font-mono text-slate-700">admin</span> / <span className="font-mono text-slate-700">admin123</span> &nbsp;|&nbsp; Authority: <span className="font-mono text-slate-700">authority</span> / <span className="font-mono text-slate-700">authority123</span></p>
            </div>
          </form>

          {/* OR Separator */}
          <div className="login-divider w-full relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="bg-white px-2 text-slate-400 font-medium">or</span>
            </div>
          </div>

          {/* Bottom Button */}
          <button 
            type="button" 
            onClick={handlePublic} 
            className="community-btn w-full bg-white border border-[#1a5b9e]/30 hover:border-[#1a5b9e]/60 rounded-lg flex items-center justify-center gap-3 transition-colors group"
          >
            <Map className="h-[20px] w-[20px] text-[#1a5b9e]" />
            <div className="flex flex-col items-start leading-tight">
              <span className="font-bold text-[13px] text-[#061b3d]">Community / Public User</span>
              <span className="text-[10px] text-slate-400 font-medium">No login required</span>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
