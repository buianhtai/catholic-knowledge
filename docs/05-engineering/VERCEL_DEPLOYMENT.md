# Vercel Deployment

Catholic Knowledge is a standard Next.js 16 application and should be deployed from the GitHub repository `buianhtai/catholic-knowledge`.

## Recommended setup

1. In Vercel, import the GitHub repository `buianhtai/catholic-knowledge`.
2. Use the connected team `buianhtai90-5959`.
3. Keep the repository root as the project root.
4. Framework preset: **Next.js**.
5. Production branch: **main**.
6. Node.js: **22.x** (also declared in `package.json`).
7. Install command: `npm install`.
8. Build command: `npm run build`.
9. No environment variables are required for the current static/content MVP.

`vercel.json` declares the same framework/install/build contract so the deployment does not rely on dashboard defaults.

## Pre-deployment gate

Every deployment candidate must pass:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

GitHub Actions runs the same validation for pull requests and `main`.

## Git integration

After the project is imported:

- pushes to `main` create production deployments;
- pull requests create preview deployments;
- Vercel deployment URLs can be reviewed before merge;
- production should only be considered healthy after the deployment state is `READY` and `/`, `/explore`, `/scripture`, `/doctrine`, `/timeline`, `/liturgy`, `/places`, `/kids`, `/ask`, `/councils/nicaea`, and `/saints/augustine-of-hippo` respond successfully.

## CI-token deployment (optional)

Git integration is preferred. If CLI deployment is later required, add these GitHub Actions secrets rather than committing credentials:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Then use `vercel pull`, `vercel build --prod`, and `vercel deploy --prebuilt --prod`.

## Current connector limitation

The connected Vercel integration can inspect existing projects/deployments but currently does not expose a project-creation action. If the team has no project yet, the one-time GitHub import must be performed in the Vercel dashboard. Once the project exists, deployments and failures can be inspected from the connected Vercel tools.
