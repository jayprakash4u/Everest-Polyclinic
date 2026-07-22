"use client";

import { useRef, useState } from "react";
import { adminLabelClass } from "@/components/admin/AdminShell";

export default function AdminImageUpload({
  label = "Photo",
  value = "",
  onChange,
  className = "",
  optional = false,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      onChange(data.url);
    } catch (uploadError) {
      setError(uploadError.message || "Upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className={className}>
      <label className={adminLabelClass}>
        {label}
        {optional ? (
          <span className="ml-1 font-normal normal-case text-slate-400">
            (optional)
          </span>
        ) : null}
      </label>
      <div className="mt-2 flex flex-wrap items-start gap-4">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-20 w-20 rounded-lg border border-slate-200 object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-[10px] text-slate-400">
            No photo
          </div>
        )}
        <div className="flex min-w-[200px] flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex w-fit items-center rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading…" : value ? "Change photo" : "Upload photo"}
          </button>
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="w-fit text-xs text-slate-500 hover:text-red-600"
            >
              Remove photo
            </button>
          ) : null}
          <p className="text-xs text-slate-400">JPG, PNG, WebP, or GIF · max 5 MB</p>
        </div>
      </div>
    </div>
  );
}
