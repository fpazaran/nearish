declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_MEASUREMENTID: string
  readonly VITE_APIKEY: string
  readonly VITE_AUTHDOMAIN: string
  readonly VITE_PROJECTID: string
  readonly VITE_STORAGEBUCKET: string
  readonly VITE_MESSAGINGSENDERID: string
  readonly VITE_APPID: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}