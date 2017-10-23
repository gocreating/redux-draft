# Changelog

## `0.2.0`

### Added

- Allow to set `_initialized` flag and init from rawContent

  This is espicially for rendering on server side, where raw content is required but editor states like decorators cannot be serialized as string to pass to client.

- Export action creators

## `0.1.1`

### Fixed

- Handle default value of config.

## `0.1.0`

### Added

- Main draft reducer.
- HOC `reduxDraft` and `reduxDraftEntity`.
