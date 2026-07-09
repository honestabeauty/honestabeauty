export const CMS_MEDIA_FOLDERS = [
  { value: "general", label: "一般" },
  { value: "hero", label: "首頁主視覺" },
  { value: "journal", label: "醫美知識" },
  { value: "treatments", label: "療程" },
  { value: "posters", label: "影片封面" },
] as const;

export function mediaFolderLabel(folder: string) {
  return CMS_MEDIA_FOLDERS.find((f) => f.value === folder)?.label ?? folder;
}
