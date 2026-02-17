export interface Package {
  weight: number;
  length: number;
  width: number;
  height: number;
  unitOfMeasurement: "IN" | "CM";
  weightUnit: "LBS" | "KGS";
}
