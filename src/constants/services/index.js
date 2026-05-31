import { emergencyService } from "./emergency";
import { ambulanceService } from "./ambulance";
import { icuService } from "./icu";
import { surgeryService } from "./surgery";
import { diagnosticService } from "./diagnostic";
import { pharmacyService } from "./pharmacy";
import {
  bloodBankService,
  telemedicineService,
  healthCheckupService,
  homeCareService,
  vaccinationService,
  physiotherapyService,
  maternityService,
  dialysisService,
  cardiacCareService,
  mentalHealthService,
} from "./otherServices";

export { emergencyService } from "./emergency";
export { ambulanceService } from "./ambulance";
export { icuService } from "./icu";
export { surgeryService } from "./surgery";
export { diagnosticService } from "./diagnostic";
export { pharmacyService } from "./pharmacy";
export {
  bloodBankService,
  telemedicineService,
  healthCheckupService,
  homeCareService,
  vaccinationService,
  physiotherapyService,
  maternityService,
  dialysisService,
  cardiacCareService,
  mentalHealthService,
} from "./otherServices";

export const serviceData = {
  1: emergencyService,
  2: ambulanceService,
  3: icuService,
  4: surgeryService,
  5: diagnosticService,
  6: pharmacyService,
  7: bloodBankService,
  9: telemedicineService,
  10: healthCheckupService,
  11: homeCareService,
  12: vaccinationService,
  13: physiotherapyService,
  14: maternityService,
  15: dialysisService,
  16: cardiacCareService,
  17: mentalHealthService,
};
