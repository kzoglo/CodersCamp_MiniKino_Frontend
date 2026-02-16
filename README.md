<h1 align="center">Welcome to CodersCamp_MiniKino_Frontend 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.3.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E6.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D8.1.0-blue.svg" />
  <a href="https://github.com/kzoglo/CodersCamp_MiniKino_Frontend#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/kzoglo/CodersCamp_MiniKino_Frontend/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/kzoglo/CodersCamp_MiniKino_Frontend/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" />
  </a>
</p>

> Frontend application of a mini cinema, written in ReactJS. It has user creation and logging system, which allow storage of user's reservations in a DB. App is backed up with the proprietary REST API written in NodeJS.

### 🏠 [Homepage](https://kzoglo.github.io/CodersCamp_MiniKino_Frontend)

## Prerequisites

- npm >6.0.0
- node >=8.1.0

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## Tests

```sh
npm test
```

```sh
npm test-watch
```

```sh
npm run test-unit
```

```sh
npm run test-with-coverage
```

## Recent Updates

Recent updates (v2.3.0) include infrastructure migration to AWS and significant improvements:

- Migrated image storage from local assets to AWS S3 (production) and MinIO (development)
- Implemented new image service for dynamic image URL handling
- Added GitHub Actions workflow for automated PR validation
- Improved environment variable management with dotenvx
- Fixed buy ticket logic and various UI adjustments
- Updated tests and removed deprecated defaultProps from function components

## Author

👤 **Kamil Żogło**

- Github: [@kzoglo](https://github.com/kzoglo)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/kzoglo/CodersCamp_MiniKino_Frontend/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2026 [Kamil Żogło](https://github.com/kzoglo).<br />
This project is [MIT](https://github.com/kzoglo/CodersCamp_MiniKino_Frontend/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
