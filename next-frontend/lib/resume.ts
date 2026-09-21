// Bump the version when replacing public/Resume.pdf so an older upload cannot
// override the new bundled resume. Subsequent admin uploads use this version.
export const RESUME_VERSION = '2026-09-21';
export const RESUME_SETTING_KEY = `resumeUrl:${RESUME_VERSION}`;
export const BUNDLED_RESUME_URL = `/Resume.pdf?v=${RESUME_VERSION}`;
