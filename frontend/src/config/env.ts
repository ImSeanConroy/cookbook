type RawEnv = {
  VITE_BASE_URL?: string;
};

declare global {
  interface Window {
    __ENV__?: RawEnv;
  }
}

const runtimeEnv: RawEnv = window.__ENV__ || {};
const buildEnv: RawEnv = {
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
};

const preferredEnv: RawEnv = import.meta.env.PROD ? runtimeEnv : buildEnv;

export const getEnv = (key: keyof RawEnv): string | undefined => {
  return preferredEnv[key] ?? buildEnv[key];
};

export const getAllEnv = (): RawEnv => ({
  VITE_BASE_URL: getEnv("VITE_BASE_URL"),
});