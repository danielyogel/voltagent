# @voltagent/internal

## 0.0.6

### Patch Changes

- [#404](https://github.com/VoltAgent/voltagent/pull/404) [`809bd13`](https://github.com/VoltAgent/voltagent/commit/809bd13c5fce7b2afdb0f0d934cc5a21d3e77726) Thanks [@omeraplak](https://github.com/omeraplak)! - refactor: remove devLogger in favor of standardized logging approach

  Removed the internal `devLogger` utility to align with the new standardized logging architecture. This change simplifies the internal package and reduces code duplication by leveraging the comprehensive logging system now available in @voltagent/core and @voltagent/logger.

  **Changes:**

  - Removed `devLogger` from exports
  - Removed development-only logging utility
  - Consumers should use the logger instance provided by VoltAgent or create their own using @voltagent/logger

  This is part of the logging system refactoring to provide a more consistent and powerful logging experience across all VoltAgent packages.

## 0.0.5

### Patch Changes

- [`6fadbb0`](https://github.com/VoltAgent/voltagent/commit/6fadbb098fe40d8b658aa3386e6126fea155f117) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: createAsyncIterableStream import issue

## 0.0.4

### Patch Changes

- [#324](https://github.com/VoltAgent/voltagent/pull/324) [`8da1ecc`](https://github.com/VoltAgent/voltagent/commit/8da1eccd0332d1f9037085e16cb0b7d5afaac479) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: improve dev logger environment detection and add debug method

  Enhanced the dev logger to be more intelligent about when to show logs. Previously, the logger only showed logs when `NODE_ENV === "development"`. Now it shows logs unless `NODE_ENV` is explicitly set to `"production"`, `"test"`, or `"ci"`.

  **Changes:**

  - **Improved Environment Detection**: Dev logger now shows logs when `NODE_ENV` is undefined, empty string, or any value other than "production", "test", or "ci"
  - **Better Developer Experience**: Developers who don't set NODE_ENV will now see logs by default, which is more intuitive
  - **Added Debug Method**: Included a placeholder `debug` method for future structured logging with Pino
  - **Updated Tests**: Comprehensive test coverage for the new logging behavior

  **Before:**

  - Logs only shown when `NODE_ENV === "development"`
  - Empty string or undefined NODE_ENV = no logs ❌

  **After:**

  - Logs hidden only when `NODE_ENV === "production"`, `NODE_ENV === "test"`, or `NODE_ENV === "ci"`
  - Empty string, undefined, or other values = logs shown ✅

  This change makes the development experience smoother as most developers don't explicitly set NODE_ENV during local development.

## 0.0.3

### Patch Changes

- [#311](https://github.com/VoltAgent/voltagent/pull/311) [`1f7fa14`](https://github.com/VoltAgent/voltagent/commit/1f7fa140fcc4062fe85220e61f276e439392b0b4) Thanks [@zrosenbauer](https://github.com/zrosenbauer)! - fix(core, vercel-ui): Currently the `convertToUIMessages` function does not handle tool calls in steps correctly as it does not properly default filter non-tool related steps for sub-agents, same as the `data-stream` functions and in addition in the core the `operationContext` does not have the `subAgent` fields set correctly.

  ### Changes

  - deprecated `isSubAgentStreamPart` in favor of `isSubAgent` for universal use
  - by default `convertToUIMessages` now filters out non-tool related steps for sub-agents
  - now able to exclude specific parts or steps (from OperationContext) in `convertToUIMessages`

  ***

  ### Internals

  New utils were added to the internal package:

  - `isObject`
  - `isFunction`
  - `isPlainObject`
  - `isEmptyObject`
  - `isNil`
  - `hasKey`

## 0.0.2

### Patch Changes

- [`94de46a`](https://github.com/VoltAgent/voltagent/commit/94de46ab2b7ccead47a539e93c72b357f17168f6) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: add `deepClone` function to `object-utils` module

  Added a new `deepClone` utility function to the object-utils module for creating deep copies of complex JavaScript objects. This utility provides safe cloning of nested objects, arrays, and primitive values while handling circular references and special object types.

  Usage:

  ```typescript
  import { deepClone } from "@voltagent/core/utils/object-utils";

  const original = {
    nested: {
      array: [1, 2, { deep: "value" }],
      date: new Date(),
    },
  };

  const cloned = deepClone(original);
  // cloned is completely independent from original
  ```

  This utility is particularly useful for agent state management, configuration cloning, and preventing unintended mutations in complex data structures.

- Updated dependencies []:
  - @voltagent/core@0.1.44
