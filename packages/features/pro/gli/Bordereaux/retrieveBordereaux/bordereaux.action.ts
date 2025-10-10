import { createAction } from "@reduxjs/toolkit";
import { Bordereau } from "@features/pro/gli/Bordereaux/model/Bordereau";

export const bordereauxLoaded = createAction<Bordereau[]>("BORDEREAUX_LOADED");
