# Potions, le jeu de sorcellerie !

Un jeu de création de potions développé avec **Next.js 15**, utilisant une architecture basée sur **Server Actions** et **Server Components**.

## Démarrage rapide

### Prérequis
- **Node.js**
- **pnpm**

### Installation et lancement

```bash
# 1. Cloner le projet
git clone todo
cd potions

# 2. Installer les dépendances
pnpm install

# 3. Configurer la base de données
pnpm db:reload

# 4. Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🛠️ Architecture

- **Next.js 15** avec Server Components et Server Actions
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Prisma** pour la gestion de base de données
- **Jest** pour les tests unitaires et d'intégration
- **Tests d'Accessibilité** avec jest-axe et Testing Library

## 🧪 Tests

### Tests Unitaires
```bash
pnpm test:unit
```

### Tests d'Intégration
```bash
pnpm test:integration
```

### Tous les Tests
```bash
pnpm test
```

## Fonctionnalités

### Gameplay
- **Création de potions** : Combiner 3 ingrédients pour créer des potions (connues ou inconnues)
- **Découverte de recettes** : Débloquer de nouvelles recettes en payant
- **Gestion d'inventaire** : Acheter des ingrédients et vendre des potions
- **Système économique** : Gérer son argent pour progresser

### Choix d'implémentation

- **Server Actions** : Toute la logique métier centralisée côté serveur
- **Pas de contexte global** : État géré localement avec des hooks personnalisés
- **Synchronisation temps réel** : Événements personnalisés pour l'UI réactive
- **Types centralisés** : Tous les types TypeScript dans `types/game.ts`

## Scripts disponibles

```bash
# Développement
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production

# Qualité de code
pnpm lint         # Vérification ESLint
pnpm check        # Vérification TypeScript
pnpm test         # Tests Jest

# Base de données
pnpm db:reset     # Reset complet de la DB
pnpm db:seed      # Peupler la DB avec les données initiales
pnpm db:reload    # Reset + seed en une commande
```

## Concepts clés

### Server Actions vs API Routes
- **Server Actions** : Logique métier centralisée, typage fort, moins de boilerplate
- **Pas d'API Routes** : Tout géré via les Server Actions pour la simplicité

### Hooks personnalisés
- **`useToast`** : Gestion centralisée des notifications
- **`useMoney`** : Synchronisation de l'argent via événements
- **`useServerAction`** : Gestion des transitions et états de chargement

### Organisation des types
- **Centralisation** : Tous les types dans `types/game.ts`

## Exemples d'utilisation

### Créer une potion
1. Aller sur `/brew`
2. Sélectionner 3 ingrédients
3. Cliquer sur "Préparer la potion"
4. Découvrir le résultat !

### Gérer l'inventaire
1. Aller sur `/inventory`
2. Acheter des ingrédients avec ses rubis
3. Vendre des potions créées
4. Voir son argent se mettre à jour en temps réel
