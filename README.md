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
[Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg
