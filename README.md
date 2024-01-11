# Haiku

GitHub Action to detect a haiku in an issue.

## Usage

Add the following workflow to your repository at `.github/workflows/haiku.yml`:

```yaml
name: 🎎 Haiku detection
on:
  issues:
    types: [opened, reopened, edited]

jobs:
  detect_haiku:
    runs-on: ubuntu-latest
    steps:
      - name: Check for haiku
        uses: quaternionmedia/haiku@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```
