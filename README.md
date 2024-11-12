# katoolin.ts

## What can this code do

- Automatically install all Kali tools listed on https://www.kali.org/tools/kali-meta with prefix "kali-tools".

- The new version uses a very convenient npm 2 install the program.

## Support the legitimate rights & interests of programmers

Supporting the 996 prohibited license while not violating the GPLv2.0 license.

[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) [![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu) [![LICENSE](https://img.shields.io/badge/license-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

## Requirements

- Latest [node.js](https://github.com/nvm-sh/nvm) & globally installed typescript. 
- An Debian & its derivatives operating system.
- Not supprot Redhat based distros.

## Tested Distribution

- Debian 12
- Ubuntu 22.04.3 LTS

## Installation

```bash
sudo apt install git
git clone https://github.com/zukhok/katoolin.ts.git
cd katoolin.ts
npm i
```

## Uninstallation

U can manually delete repository by removing sources from /etc/apt/sources.list, then use "apt-key del".

## Usage

```bash
tsc
node build/main.js
```

## Upgrade

```bash
git pull
npm i
```

## Warning

B4 upgrade ur system, plz make sure u have removed all Kali-linux repositories in ur `/etc/apt/sources.list`.

## Have questions

Plz visit [issues](https://github.com/zukhok/katoolin.ts/issues).