src/
├── components/
│   ├── game/
│   │   ├── GameBoard.tsx
│   │   ├── GameHeader.tsx
│   │   ├── GameInfo.tsx
│   │   ├── GameLayout.tsx
│   │   ├── GameRules.tsx
│   │   ├── GameStats.tsx
│   │   ├── TurnViolation.tsx
│   │   └── WinCondition.tsx
│   ├── character/
│   │   ├── Character.tsx
│   │   ├── CharacterSprite.tsx
│   │   └── CharacterSelectionPhase.tsx
│   ├── battle/
│   │   ├── BotBattleStatus.tsx
│   │   ├── BotEngineSelection.tsx
│   │   └── Timer.tsx
│   ├── effects/
│   │   ├── AbilityEffect.tsx
│   │   ├── ActionFeedback.tsx
│   │   ├── CombatText.tsx
│   │   └── SkillAnimation.tsx
│   ├── ui/
│   │   ├── Castle.tsx
│   │   ├── GridCell.tsx
│   │   ├── SkillBar.tsx
│   │   └── TurnIndicator.tsx
│   ├── findMatch/
│   │   ├── FindMatch.tsx
│   │   ├── PvPCard.tsx
│   │   ├── BotBattleCard.tsx
│   │   └── RecentMatches.tsx
│   └── HomeScreen.tsx
├── services/
│   ├── botEngine.ts
│   ├── matchHistoryService.ts
│   └── soundService.ts
├── store/
│   ├── gameSlice.ts
│   └── index.ts
├── types/
│   ├── game.types.ts
│   └── store.types.ts
├── App.tsx
├── main.tsx
└── index.css