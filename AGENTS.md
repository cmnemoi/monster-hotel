# AI Agent Guidelines for Monster Hotel

Monster Hotel is a hotel management game. The `phaser/` folder contains a front-end proof of concept using Phaser.js (backend planned in Adonis.js).

Work exclusively in [TDD](.ai/rules/tdd.md).

## Commands
- `yarn dev` - Start dev server (http://localhost:5173) - Check server is launched before running this command
- `yarn build` - Build production
- `yarn lint` - Lint with Biome
- `yarn check` - Check code with Biome
- `yarn format` - Format with Biome

## Project
- TypeScript/ESM with Yarn workspaces
- Source in `phaser/src/`, Phaser 3 + Vite for the frontend PoC
- Strict TypeScript, use `#phaser/*` import alias
- Node.js >=24, use Yarn

## Standards
Detailed rules in [`.ai/rules/`](.ai/rules/):
- **Clean code:** [`.ai/rules/clean-code.md`](.ai/rules/clean-code.md)
- **Naming:** [`.ai/rules/naming-conventions.md`](.ai/rules/naming-conventions.md)
- **Testing:** [`.ai/rules/testing-standards.md`](.ai/rules/testing-standards.md), [`.ai/rules/testing-unit.md`](.ai/rules/testing-unit.md), [`.ai/rules/testing-integration.md`](.ai/rules/testing-integration.md)
- **TDD:** [`.ai/rules/tdd.md`](.ai/rules/tdd.md)
- **Debugging:** [`.ai/rules/debug.md`](.ai/rules/debug.md)
