#!/usr/bin/env node

if (process.env.CI) {
  process.exit(0)
}

process.exit(1)
