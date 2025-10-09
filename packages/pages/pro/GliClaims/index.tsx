import * as React from "react";
import { ClaimsStats } from "@pages/pro/GliClaims/components/ClaimsStats";
import { ClaimsTable } from "@pages/pro/GliClaims/components/ClaimsTable";

export default function GliClaimsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des sinistres GLI</h1>
        <p className="text-gray-600 mt-2">
          Suivi et gestion des sinistres de garantie des loyers impayés
        </p>
      </div>

      <ClaimsStats />
      <ClaimsTable />
    </div>
  );
}
