"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

const STATUS_OPTIONS = [
  { value: "DRAFT",      label: "Draft" },
  { value: "PROCESSING", label: "Processing" },
  { value: "COMPLETED",  label: "Completed" },
  { value: "FAILED",     label: "Failed" },
  { value: "REJECTED",   label: "Rejected" },
];

const defaultForm = {
  scholarshipId: "",
  scholarshipTitle: "",
  scholarshipName: "",
  scholarshipDeadline: "",
  essayId: "",
  essayTitle: "",
  prompt: "",
  details: "",
  requirements: "",
  status: "DRAFT",
};

// ── Reusable Searchable Dropdown ──────────────────────────────────────────────
function SearchableDropdown({ label, required, placeholder, isLoading, options, selectedId, selectedLabel, onSelect, error, searchQuery, onSearchChange, isOpen, onToggle }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-left flex items-center justify-between gap-2 outline-none transition-all
            ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-[#FFCA42] focus:bg-white focus:ring-2 focus:ring-[#FFCA42]/20"}`}
        >
          <span className={selectedId ? "text-gray-900 font-medium" : "text-gray-400"}>
            {selectedId ? selectedLabel : placeholder}
          </span>
          <Icon icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} width={18} className="text-gray-400 shrink-0" />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-2 border-b border-gray-100">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Icon icon="mdi:magnify" width={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="bg-transparent text-sm text-gray-800 outline-none w-full placeholder:text-gray-400"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto py-1">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-6 text-gray-500 text-sm">
                  <Icon icon="svg-spinners:3-dots-fade" width={24} className="text-[#FFCA42]" />
                  Loading...
                </div>
              ) : options.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-6">No results found.</p>
              ) : (
                options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelect(opt)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between gap-2
                      ${selectedId === opt.id ? "bg-[#FFFAEC] text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <div>
                      <p className="line-clamp-1">{opt.label}</p>
                      {opt.sublabel && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{opt.sublabel}</p>}
                    </div>
                    {selectedId === opt.id && <Icon icon="mdi:check" width={16} className="text-[#FFCA42] shrink-0" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {selectedId && <p className="text-xs text-gray-400 mt-1 font-mono truncate">ID: {selectedId}</p>}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <Icon icon="mdi:alert-circle-outline" width={14} />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main Modal ──────────────────────────────────────────────
// ──────────────────
export default function 
AddScholarshipModal({ isOpen, onClose, onSubmit, isSubmitting = false, initialData = null }) {
  const isEditMode = !!initialData;

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [scholarshipSearch, setScholarshipSearch] = useState("");
  const [essaySearch, setEssaySearch] = useState("");
  const [scholarshipOpen, setScholarshipOpen] = useState(false);
  const [essayOpen, setEssayOpen] = useState(false);

  // ── Pre-fill form when editing ────────────────────────────────────────────
  useEffect(() => {
    if (initialData) {
      setForm({
        scholarshipId: initialData.scholarshipId || "",
        scholarshipTitle: initialData.scholarshipTitle || "",
        scholarshipName: initialData.scholarshipName || "",
        scholarshipDeadline: initialData.scholarshipDeadline
          ? initialData.scholarshipDeadline.slice(0, 10)
          : "",
        essayId: initialData.essayId || "",
        essayTitle: initialData.essayTitle || "",
        prompt: initialData.prompt || "",
        details: initialData.details || "",
        requirements: initialData.requirements || "",
        status: initialData.status || "DRAFT",
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [initialData, isOpen]);

  // ── Fetch scholarships ────────────────────────────────────────────────────
  const { data: scholarshipsRes, isLoading: isLoadingScholarships } = useQuery({
    queryKey: ["scholarshipsDropdown"],
    queryFn: () => apiGet("/essay-recommendation/scholarships"),
    enabled: isOpen,
  });

  // ── Fetch essays ──────────────────────────────────────────────────────────
  const { data: essaysRes, isLoading: isLoadingEssays } = useQuery({
    queryKey: ["essaysDropdown"],
    queryFn: () => apiGet("/generate-essay"),
    enabled: isOpen,
  });

  const scholarshipOptions = useMemo(() => {
    const list = scholarshipsRes?.data || scholarshipsRes || [];
    return list
      .filter((s) => (s.title || s.name || "").toLowerCase().includes(scholarshipSearch.toLowerCase()))
      .map((s) => ({ id: s.id, label: s.title || s.name, sublabel: s.provider || null, raw: s }));
  }, [scholarshipsRes, scholarshipSearch]);

  const essayOptions = useMemo(() => {
    const list = essaysRes?.data || essaysRes || [];
    return list
      .filter((e) => (e.title || e.essayTitle || "").toLowerCase().includes(essaySearch.toLowerCase()))
      .map((e) => ({ id: e.id, label: e.title || e.essayTitle, sublabel: e.subject || null, raw: e }));
  }, [essaysRes, essaySearch]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!form.scholarshipId) errs.scholarshipId = "Please select a scholarship.";
    if (!form.essayId) errs.essayId = "Please select an essay.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectScholarship = (opt) => {
    setForm((prev) => ({
      ...prev,
      scholarshipId: opt.id,
      scholarshipTitle: opt.raw.title || opt.raw.scholarshipTitle || "",
      scholarshipName: opt.raw.name || opt.raw.scholarshipName || opt.raw.title || "",
      scholarshipDeadline: opt.raw.deadline
        ? opt.raw.deadline.slice(0, 10)
        : opt.raw.scholarshipDeadline
        ? opt.raw.scholarshipDeadline.slice(0, 10)
        : "",
    }));
    setErrors((prev) => ({ ...prev, scholarshipId: "" }));
    setScholarshipOpen(false);
    setScholarshipSearch("");
  };

  const handleSelectEssay = (opt) => {
    setForm((prev) => ({
      ...prev,
      essayId: opt.id,
      essayTitle: opt.raw.title || opt.raw.essayTitle || "",
    }));
    setErrors((prev) => ({ ...prev, essayId: "" }));
    setEssayOpen(false);
    setEssaySearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      scholarshipId: form.scholarshipId,
      scholarshipTitle: form.scholarshipTitle,
      scholarshipName: form.scholarshipName,
      scholarshipDeadline: form.scholarshipDeadline,
      essayId: form.essayId,
      essayTitle: form.essayTitle,
      prompt: form.prompt,
      details: form.details,
      requirements: form.requirements,
      status: form.status,
    });
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setForm(defaultForm);
    setErrors({});
    setScholarshipSearch("");
    setEssaySearch("");
    setScholarshipOpen(false);
    setEssayOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden z-10 animate-fadeInScale">
        {/* Header */}
        <div className="bg-[#FFFAEC] border-b border-[#FFE88A] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-[#FFCA42] `}>
              <Icon
                icon={isEditMode ? "mdi:pencil-outline" : "mdi:file-document-plus-outline"}
                width={22} height={22}
                className={isEditMode ? "text-[#0C0C0D]" : "text-[#0C0C0D]"}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEditMode ? "Edit Application" : "Add Application"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEditMode ? "Update the details of this application" : "Fill in the details to track your application"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5 overflow-y-auto max-h-[72vh]">

          {/* Scholarship + Essay dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SearchableDropdown
              label="Scholarship" required placeholder="Select a scholarship..."
              isLoading={isLoadingScholarships} options={scholarshipOptions}
              selectedId={form.scholarshipId} selectedLabel={form.scholarshipTitle || form.scholarshipName}
              onSelect={handleSelectScholarship} error={errors.scholarshipId}
              searchQuery={scholarshipSearch} onSearchChange={setScholarshipSearch}
              isOpen={scholarshipOpen}
              onToggle={() => { setScholarshipOpen((o) => !o); setEssayOpen(false); }}
            />
            <SearchableDropdown
              label="Essay" required placeholder="Select an essay..."
              isLoading={isLoadingEssays} options={essayOptions}
              selectedId={form.essayId} selectedLabel={form.essayTitle}
              onSelect={handleSelectEssay} error={errors.essayId}
              searchQuery={essaySearch} onSearchChange={setEssaySearch}
              isOpen={essayOpen}
              onToggle={() => { setEssayOpen((o) => !o); setScholarshipOpen(false); }}
            />
          </div>

          {/* Deadline + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Scholarship Deadline</label>
              <input
                type="date" name="scholarshipDeadline"
                value={form.scholarshipDeadline}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition-all focus:border-[#FFCA42] focus:bg-white focus:ring-2 focus:ring-[#FFCA42]/20"
              />
              {form.scholarshipDeadline && !isEditMode && (
                <p className="text-xs text-gray-400 mt-1">Auto-filled from scholarship</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
              <select
                name="status" value={form.status} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition-all focus:border-[#FFCA42] focus:bg-white focus:ring-2 focus:ring-[#FFCA42]/20 cursor-pointer"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Prompt</label>
            <textarea
              name="prompt" value={form.prompt} onChange={handleChange} rows={2}
              placeholder="e.g. How will this scholarship help you achieve your goals?"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 resize-none focus:border-[#FFCA42] focus:bg-white focus:ring-2 focus:ring-[#FFCA42]/20"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Requirements</label>
            <textarea
              name="requirements" value={form.requirements} onChange={handleChange} rows={2}
              placeholder="e.g. GPA > 3.5, Statement of Purpose, 2 Letters of Recommendation..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 resize-none focus:border-[#FFCA42] focus:bg-white focus:ring-2 focus:ring-[#FFCA42]/20"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Details</label>
            <textarea
              name="details" value={form.details} onChange={handleChange} rows={2}
              placeholder="e.g. This is a merit-based scholarship for international students..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 resize-none focus:border-[#FFCA42] focus:bg-white focus:ring-2 focus:ring-[#FFCA42]/20"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button" onClick={handleClose} disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={isSubmitting}
              className={`inline-flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl text-sm shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed bg-[#FFCA42] hover:bg-[#f5be2e] text-[#0C0C0D]`}
            >
              {isSubmitting ? (
                <>
                  <Icon icon="svg-spinners:3-dots-fade" width={20} height={20} />
                  {isEditMode ? "Updating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Icon icon={isEditMode ? "mdi:content-save-outline" : "mdi:plus"} width={18} height={18} />
                  {isEditMode ? "Update Application" : "Add Application"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
