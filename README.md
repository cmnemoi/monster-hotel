# Monster Hotel

[![Continous Integration](https://github.com/cmnemoi/monster-hotel/actions/workflows/ci.yml/badge.svg)](https://github.com/cmnemoi/monster-hotel/actions/workflows/ci.yml)
[![Continous Delivery](https://github.com/cmnemoi/monster-hotel/actions/workflows/cd.yml/badge.svg)](https://github.com/cmnemoi/monster-hotel/actions/workflows/cd.yml)

# Installation

We will use [`mise`](https://mise.jdx.dev/) to handle our dependencies.

```
git clone https://github.com/cmnemoi/monster-hotel.git && cd monster-hotel
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc # or ~/.zshrc if you use it
source ~/.bashrc # or ~/.zshrc if you use it
mise trust
mise install
yarn install
yarn dev
```

You should now be able to access the game at http://localhost:5173

# License

This project is licensed under the GNU Affero General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details.