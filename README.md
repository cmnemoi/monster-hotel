# Monster Hotel

# Installation

We will use [`mise`](https://mise.jdx.dev/) to handle our dependencies.

```
git clone https://github.com/cmnemoi/monster-hotel.git && cd monster-hotel
curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
mise install
yarn dev
```

You should now be able to access the game at http://localhost:8080.

# License

This project is licensed under the GNU Affero General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details.