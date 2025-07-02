import BrewClient from "./BrewClient";
import MagicLayout from "@/components/ui/MagicLayout";
import { getInventory } from "@/app/actions/inventory";

export default async function BrewPage() {
  const { data: inventory } = await getInventory();

  return (
    <MagicLayout>
      <h1 className="magic-title-h1">Composer une potion</h1>
      <BrewClient inventory={inventory || []} />
    </MagicLayout>
  );
}
