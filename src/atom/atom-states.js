import { atom } from "recoil";

export const salaryDataState = atom({
  key: "salaryDataState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
