import { AdminPlaceholder } from "@/components/admin/placeholder";

export default function SettingsPage() {
  return (
    <AdminPlaceholder
      crumb="Paramètres"
      title="Paramètres Système"
      subtitle="Configuration plateforme"
      body="Configuration globale : frais de transaction, seuils Trust Score, intégrations API (Orange Money, PAPSS, AGL), équipe LA RUCHE et permissions."
    />
  );
}
