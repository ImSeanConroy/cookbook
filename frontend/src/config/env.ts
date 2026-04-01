type RawEnv = {
  VITE_BASE_URL?: string;
  VITE_READ_ONLY?: string;
};

declare global {
  interface Window {
    __ENV__?: RawEnv;
  }
}

const runtimeEnv: RawEnv = window.__ENV__ || {};
const buildEnv: RawEnv = {
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  VITE_READ_ONLY: import.meta.env.VITE_READ_ONLY,
};

const preferredEnv: RawEnv = import.meta.env.PROD ? runtimeEnv : buildEnv;

export const getEnv = (key: keyof RawEnv): string | undefined => {
  return preferredEnv[key] ?? buildEnv[key];
};

export const getAllEnv = (): RawEnv => ({
  VITE_BASE_URL: getEnv("VITE_BASE_URL"),
  VITE_READ_ONLY: getEnv("VITE_READ_ONLY"),
});