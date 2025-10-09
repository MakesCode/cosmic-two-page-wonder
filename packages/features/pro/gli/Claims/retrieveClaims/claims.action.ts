import { createAction } from "@reduxjs/toolkit";
import { Claim } from "../model/Claim";

export const claimsLoaded = createAction<Claim[]>("CLAIMS_LOADED");
export const claimLoaded = createAction<Claim>("CLAIM_LOADED");
export const claimCreated = createAction<Claim>("CLAIM_CREATED");
