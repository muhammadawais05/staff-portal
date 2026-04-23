# Monorepo Helpers

This folder contains a set of tools, utilities, etc. that help developers
extract packages.

This is temporary and should be removed once all packages have been extracted.

Below presented a short description of every helper.

## Dependency Collector

This tool is useful when converting a folder to a package. It can go through all
the imports/exports in your folder and based on them create a `package.json`
with dependencies. More info [here](./dependency-collector/README.md)

## Visualize Folder Dependencies

This tool is useful to check if your folder is ready to be extracted as a
package or not. It shows its dependencies as a graph. More info
[here](./visualize-folder-dependencies/README.md)
