# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

js2flowchart is a library that converts JavaScript code into SVG flowcharts. It parses JS code using Babel, builds an intermediate flow tree representation, then renders that tree to SVG. Works in both browser and Node.js environments.

## Build commands

```bash
# Development build with watch mode
npm run dev

# Production build (outputs to dist/js2flowchart.js)
npm run build

# Format code with Prettier
npm run pretty

# Compile with Babel (outputs to build/)
npm run babel-compile
```

## CLI usage

```bash
# Generate flowchart from JS file
js2flowchart myfile.js

# With abstraction levels
js2flowchart myfile.js -a function,import
```

## Architecture

The library has three main processing stages:

### 1. Flow tree builder (`src/builder/`)

- [FlowTreeBuilder.js](src/builder/FlowTreeBuilder.js) - Main builder that parses code via Babel and traverses AST
- [astBuilder.js](src/builder/astBuilder.js) - AST parsing and visitor creation
- [entryDefinitionsMap.js](src/builder/entryDefinitionsMap.js) - Token parsing configurations for each JS construct
- [abstractionLevelsConfigurator.js](src/builder/abstractionLevelsConfigurator.js) - Filters tree nodes by abstraction level (FUNCTION, CLASS, IMPORT, EXPORT, FUNCTION_DEPENDENCIES)
- [FlowTreeModifier.js](src/builder/FlowTreeModifier.js) - Post-processing modifiers (e.g., treating array iterators as loops)

### 2. SVG renderer (`src/render/svg/`)

- [SVGRender.js](src/render/svg/SVGRender.js) - Main renderer, theme application, ShapesTreeEditor for modifications
- [svgObjectsBuilder.js](src/render/svg/svgObjectsBuilder.js) - Converts flow tree nodes to shape objects
- [shapesDefinitionsMap.js](src/render/svg/shapesDefinitionsMap.js) - Maps token types to shape classes
- `shapes/` - Individual shape classes (Rectangle, Rhombus, RootCircle, etc.)
- `appearance/themes/` - Color themes (Default, Light, BlackAndWhite, Blurred)

### 3. Presentation generator (`src/presentation-generator/`)

- [PresentationGenerator.js](src/presentation-generator/PresentationGenerator.js) - Generates multiple SVG slides at different abstraction levels

## Entry points

- [index.js](index.js) - Library entry point, exports all public APIs
- [cli/index.cli.js](cli/index.cli.js) - CLI tool entry point

## Key exports

```javascript
// Simple conversion
convertCodeToSvg(code)
convertCodeToFlowTree(code)
convertFlowTreeToSvg(flowTree)

// Factory functions for customization
createFlowTreeBuilder()
createSVGRender()
createShapesTreeEditor(shapesTree)
createFlowTreeModifier()
createPresentationGenerator(code)

// Constants
ABSTRACTION_LEVELS  // { FUNCTION, CLASS, IMPORT, EXPORT, FUNCTION_DEPENDENCIES }
MODIFIER_PRESETS    // e.g., es5ArrayIterators
TOKEN_TYPES
```

## Webpack configuration

The webpack config (`webpack.config.js`) uses path aliases for cleaner imports:
- `shared/` maps to `src/shared/`
- `builder/` maps to `src/builder/`
- `render/` maps to `src/render/`
- `presentation-generator/` maps to `src/presentation-generator/`
