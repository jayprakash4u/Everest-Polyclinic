"use client";

import { serviceData } from "../../constants/services";
import EmergencyModal from "../modals/EmergencyModal";
import AmbulanceModal from "../modals/AmbulanceModal";
import ICUModal from "../modals/ICUModal";
import SurgeryModal from "../modals/SurgeryModal";
import DiagnosticModal from "../modals/DiagnosticModal";
import PharmacyModal from "../modals/PharmacyModal";
import BloodBankModal from "../modals/BloodBankModal";
import TelemedicineModal from "../modals/TelemedicineModal";
import HealthCheckupModal from "../modals/HealthCheckupModal";
import HomeCareModal from "../modals/HomeCareModal";
import VaccinationModal from "../modals/VaccinationModal";
import PhysiotherapyModal from "../modals/PhysiotherapyModal";
import MaternityModal from "../modals/MaternityModal";
import DialysisModal from "../modals/DialysisModal";
import CardiacCareModal from "../modals/CardiacCareModal";
import MentalHealthModal from "../modals/MentalHealthModal";

const modalComponents = {
  1: EmergencyModal,
  2: AmbulanceModal,
  3: ICUModal,
  4: SurgeryModal,
  5: DiagnosticModal,
  6: PharmacyModal,
  7: BloodBankModal,
  9: TelemedicineModal,
  10: HealthCheckupModal,
  11: HomeCareModal,
  12: VaccinationModal,
  13: PhysiotherapyModal,
  14: MaternityModal,
  15: DialysisModal,
  16: CardiacCareModal,
  17: MentalHealthModal,
};

export default function ServiceDetailModal({ service, onClose }) {
  const data = serviceData[service.id] || {
    title: service.title,
    description:
      "Comprehensive healthcare service at Everest International Polyclinic.",
    price: "Contact for pricing",
    process: [
      { num: "01", label: "Contact" },
      { num: "02", label: "Consultation" },
      { num: "03", label: "Assessment" },
      { num: "04", label: "Treatment" },
      { num: "05", label: "Follow-up" },
      { num: "06", label: "Complete" },
    ],
    timing: { main: "Contact for timing", sub: "" },
    color: "primary",
  };

  const ModalComponent = modalComponents[service.id];

  if (!ModalComponent) {
    return (
      <div className="bg-white p-8">
        <h2 className="text-2xl font-heading font-bold text-slate-800 mb-4">
          {data.title}
        </h2>
        <p className="text-slate-700 text-sm leading-6">{data.description}</p>
        <button
          onClick={onClose}
          className="mt-4 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="font-medium">Close</span>
        </button>
      </div>
    );
  }

  return <ModalComponent service={data} onClose={onClose} />;
}
