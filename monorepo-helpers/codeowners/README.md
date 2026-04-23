# Codeowners Analyzer

## General Information

It's a fork of [codeowners repo](https://github.com/beaugunderson/codeowners), enhanced for Staff Portal needs

## New Commands

Process ownership and give information from packages perspective

```
pi

-f --full                           gives full summary for all packages
-n --packageName <package_name>     gives full summary for particular package name *
--strict                            changes search method to strict equal **
-u --unowned                        gives summary for packages with unowned files
-s --single                         gives summary for packages fully owned by a single member
-e --even                           gives summary for packages fully and evenly owned by multiple members
-m --multiple [number_of_owners]    gives summary for packages fully (but not evenly) owned by >= [number_of_owners] members
-v --verbose                        includes file names
--json <file_path>                  writes output to json file
--chart                             draws charts
```

\* uses `String.include()` under the hood, so `pi -n libs/clients` will print info for `clients/libs/clients`<br/>
\*\* works only in combination with `-n, --packageName`, so `pi -n clients/libs/client` will only return summary for `clients/libs/client` and ignore `clients/libs/clients-call-requests`

<br/>

Process ownership and give information from owners perspective

```
ci

-a --all                            gives summary for all owners
-n --ownerName                      gives summary for particular owners *
-v --verbose [level]                changes verbosity level. Levels 1-4 also affect json output
                                    0: quiet
                                    1: gives general info
                                    2: + packages short info
                                    3: + list of owned files
                                    4: + list of co-owners per file
--json <file_path>                  writes output to json file
--chart                             draws charts
```

\* uses `String.include()` under the hood, so `oi -n tango cache` will give info for both `@toptal/staff-portal-tango-eng` and `@toptal/staff-portal-cache-eng`

## Original description

A tool for interacting with GitHub's
[CODEOWNERS](https://help.github.com/articles/about-codeowners/) files.

Usable as a CLI, or as a library.

## Installation

```sh
$ npm install -g codeowners
```

## cli usage

Print a list of each files in the current repo, followed by its owner:

```sh
$ codeowners audit
```

To find a list of files not covered by the `CODEOWNERS` in the project:

```sh
$ codeowners audit --unowned
```

Specify a non-standard CODEOWNERS filename

```sh
$ codeowners audit -c CODEKEEPERS
```

Verify users/teams own a specific path

```sh
$ codeowners verify src/ @foob_ar @contoso/engineers
```

## library usage

```js
const Codeowners = require('codeowners');

// workingDir is optional, defaults to process.cwd()
const repos = new Codeowners(workingDir);
repos.getOwner('path/to/file.js'); // => array of owner strings, e.g. ['@noahm']
```

## CHANGELOG

### 5.0.0

- Much-improved performance
- Removal of automatic column width calculation
- Addition of `-w/--width` option for manual column width
  - Or use e.g. `codeowners audit | column -ts " "`
