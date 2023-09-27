# React Template

This is a React base project that is set up with a custom JWT auth system, authenticated routing, api interactions, and some basic UI components 

## Setup

```bash
yarn install
yarn dev
```

### Environment

You can define and API base to specify where queryAPI and mutateAPI should send requests, this value is also configurable in src/core/utilities/constants.ts 

```
API_BASE=http://yourapi.com/v1
```

#### Dependencies

- [React](https://reactjs.org)
- [TypeScript](https://typescriptlang.org)
- [Styled-Components](https://styled-components.com/)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
