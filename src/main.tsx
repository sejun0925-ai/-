import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07080a] text-white flex items-center justify-center p-6 text-center font-pretendard">
          <div className="max-w-md space-y-4 p-8 rounded-xl bg-[#12141a] border border-white/10">
            <h2 className="text-xl font-bold text-white">화면을 불러오는 중 문제가 발생했습니다</h2>
            <p className="text-sm text-neutral-400">
              일시적인 로딩 오류일 수 있습니다. 아래 버튼을 눌러 새로고침해 주세요.
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch (e) {}
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-[#e5b964] text-black font-bold text-xs rounded hover:bg-[#f2c776] transition-colors cursor-pointer"
            >
              새로고침 및 캐시 초기화
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
}
