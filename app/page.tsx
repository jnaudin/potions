import MagicLayout from "@/components/ui/MagicLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MagicLayout>
      <h1 className="magic-title-h1">
        Bienvenue jeune sorcier <span aria-hidden="true">🧙</span>
      </h1>

      <section className="space-y-6 mb-8">
        <p className="text-sky-flashy text-lg">
          Prêt à explorer le monde magique des potions ?
        </p>

        <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h2 className="text-yellow-flashy font-bold text-xl mb-4">
            <span aria-hidden="true">🎮</span> Comment jouer
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 list-none">
            <li>
              <h3 className="text-white font-bold">
                <span aria-hidden="true">🧑‍🍳</span> Chaudron magique
              </h3>
              <p className="text-sm">
                Combine 3 ingrédients pour créer des potions
              </p>
            </li>

            <li>
              <h3 className="text-white font-bold">
                <span aria-hidden="true">💰</span> Boutique
              </h3>
              <p className="text-sm">
                Achète des ingrédients et vends tes potions
              </p>
            </li>

            <li>
              <h3 className="text-white font-bold">
                <span aria-hidden="true">📚</span> Grimoire
              </h3>
              <p className="text-sm">
                Consulte les recettes et découvre les nouvelles potions
              </p>
            </li>
          </ul>
        </section>
      </section>

      <Link
        href="/brew"
        className="bg-pink-flashy text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-flashy transition-colors"
      >
        Commencer l&apos;aventure <span aria-hidden="true">✨</span>
      </Link>
    </MagicLayout>
  );
}
