import { createAction } from "@reduxjs/toolkit";
import { Claim } from "@features/pro/gli/Claims/model/Claim";

export const claimsLoaded = createAction<Claim[]>("CLAIMS_LOADED");
