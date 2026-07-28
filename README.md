# Codex → GitHub → Azure Calculator

A deliberately small full-stack demonstration:

- React/Vite frontend
- Node.js/Express API
- `POST /api/add` adds two numbers
- One production Docker container
- Suitable for Azure Container Apps

## Run locally

Use two terminals.

### Terminal 1: API

```bash
cd backend
npm install
npm run dev
```

### Terminal 2: React

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Run the production container locally

```bash
docker build -t azure-calculator .
docker run --rm -p 3000:3000 azure-calculator
```

Open `http://localhost:3000`.

## Automatic Azure deployment

Every push to `main` runs the API tests, builds the production container, pushes
it to Azure Container Registry, and deploys it to the `codex-calculator` Azure
Container App. You can also start the workflow manually from the **Actions** tab.

The repository must define these GitHub Actions secrets:

- `CODEXCALCULATOR_AZURE_CREDENTIALS`
- `CODEXCALCULATOR_REGISTRY_USERNAME`
- `CODEXCALCULATOR_REGISTRY_PASSWORD`

The deployment workflow is in `.github/workflows/auto-deploy.yml`.

## Test the API directly

```bash
curl -X POST http://localhost:3000/api/add   -H "Content-Type: application/json"   -d '{"x":12,"y":30}'
```

Expected response:

```json
{"x":12,"y":30,"result":42}
```

## Suggested first Codex change

After the first Azure deployment, ask Codex:

> Change both number input boxes to a pale blue background. Keep sufficient colour contrast, update or add any relevant tests, and open a pull request. Do not change the button colour.

Merge the pull request after the checks pass. The Azure-generated GitHub Actions workflow should deploy the new revision.
