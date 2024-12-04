# Building and deploying

You need NodeJS installed to use this: https://nodejs.org/en

To deploy you also need the Firebase CLI: `npm install -g firebase-tools` 

## Useful commands

- `npm install` Installs all dependencies from package.json
- `npm start` Runs a development server on localhost
- `npm run build` Builds all the files into the src directory
- `firebase login` Login to the firebase CLI so we can deploy to prod
- `firebase hosting:channel:deploy preview_name` deploy to a preview channel (background map will not work)
- `firebase deploy` deploy to prod

# Copyright
Copyright (C) 2024 Leiden University

# License
This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
