# 🏨 Event Storming - Monster Hotel

## 🎯 Domain Events (Orange)

### Gestion Clients
- `ClientArrivedInQueue` - Un client arrive dans la file d'attente
- `ClientPlacedInRoom` - Client placé dans une chambre
- `ClientMovedToRoom` - Client déplacé d'une chambre à une autre
- `ClientSatisfactionChanged` - Satisfaction du client modifiée (+/-)
- `ClientLeftHotel` - Client quitte l'hôtel (satisfait ou non)
- `ClientSpecialEffectTriggered` - Effet spécial d'un client déclenché

### Gestion Chambres
- `RoomBuilt` - Une chambre a été construite
- `RoomUpgraded` - Une chambre a été améliorée
- `RoomDamaged` - Une chambre a subi des dégâts
- `RoomRepaired` - Une chambre a été réparée
- `RoomDecorated` - Une chambre a été décorée

### Économie
- `GoldEarned` - Or gagné (paiement client)
- `GoldSpent` - Or dépensé (construction, achat)
- `TaxPaid` - Taxe hebdomadaire payée

### Progression
- `HotelLevelIncreased` - Le niveau de l'hôtel a augmenté
- `HotelExpanded` - L'hôtel a été agrandi (nouvelle grille)

### Événements Aléatoires
- `RandomEventOccurred` - Événement aléatoire survenu (bonne surprise, accident, etc.)

---

## ⚡ Commands (Blue)

### Gestion Clients
- `PlaceClientInRoom(clientId, roomId)` - Placer un client dans une chambre
- `MoveClientToRoom(clientId, roomId)` - Déplacer un client vers une autre chambre
- `SendClientToTrash(clientId)` - Envoyer un client à la poubelle

### Gestion Chambres
- `BuildRoom(roomType, position)` - Construire une chambre
- `UpgradeRoom(roomId)` - Améliorer une chambre
- `RepairRoom(roomId)` - Réparer une chambre
- `DecorateRoom(roomId, decorationId)` - Décorer une chambre

### Économie
- `UpgradeHotel()` - Augmenter le niveau de l'hôtel
- `ExpandHotel(direction)` - Agrandir l'hôtel (horizontal/vertical)

### Actions Services
- `RenderServiceToClient(clientId, serviceType)` - Rendre un service à un client

---

## 📦 Aggregates (Yellow)

**Hôtel** - Racine, contient la grille, le niveau, l'or
**Chambre** - État (dégâts), niveau, décoration, client occupant
**Client** - Type, satisfaction, or de poche, effet spécial, VIP ou non
**File d'attente** - Liste des clients en attente
**Inventaire** - Objets, décorations disponibles

---

## 🏛️ Policies (Purple)

- `ClientSatisfactionPolicy` - Calcul de la satisfaction (tranquillité + décoration + effets voisins)
- `RoomDamagePolicy` - Calcul des dégâts sur chambres voisines (Pyromane, Bombes...)
- `ClientDeparturePolicy` - Déclenchement du départ quand satisfaction = maximale
- `TaxPolicy` - Calcul de la taxe hebdomadaire selon le niveau de l'hôtel
- `VIPPolicy` - Application des effets VIP spéciaux lors du placement

---

## 📖 Read Models (Green)

- `HotelStateView` - État global de l'hôtel (or, niveau, grille)
- `ClientQueueView` - Vue de la file d'attente
- `RoomListView` - Liste des chambres avec leurs états
- `ClientDetailsView` - Détails d'un client (satisfaction, effets)
- `EconomyView` - Rapport économique (revenus/dépenses)

---

## 🔥 Timeline suggérée (Feature 1: MVP Core)

### 1️⃣ Cycle 1 - Grille & Chambres (Fondation)
- `BuildRoom` → `RoomBuilt`
- `UpgradeRoom` → `RoomUpgraded`
- Vue: `RoomListView` avec grille 2D

### 2️⃣ Cycle 2 - Gestion Clients Base
- `ClientArrivedInQueue`
- `PlaceClientInRoom` → `ClientPlacedInRoom`
- `ClientLeftHotel` → `GoldEarned`
- Vue: `ClientQueueView`

### 3️⃣ Cycle 3 - Satisfaction & Économie
- `ClientSatisfactionChanged` (policy: tranquillité + décoration)
- `ClientSatisfactionChanged` → `ClientLeftHotel` (quand max atteint)
- Vue: `ClientDetailsView` avec barre de satisfaction

### 4️⃣ Cycle 4 - Dégâts & Réparations
- `RoomDamaged` (événements + Pyromanes)
- `RepairRoom` → `RoomRepaired`
- Vue: Indicateurs de dégâts sur chambres

### 5️⃣ Cycle 5 - Types de Clients (Effets)
- `ClientSpecialEffectTriggered` (Zombie Jovial, Hystérique, etc.)
- `ClientMovedToRoom` (malus -2 déménagement)
