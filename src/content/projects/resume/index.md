---
title: Résumé
description: Automatically generate pdf and png versions of resume from tex using GitHub Actions.
date: "May 26 2024"
demoURL: ""
repoURL: "https://github.com/aynp/resume"
---

<img src="/projects/resume.png" />

## Repository - [aynp/resume](https://github.com/aynp/resume)

Automatically generate pdf and png versions of resume from tex using GitHub Actions.

## Steps

- Visit the repository and click on `Use this template`. alternatively you can use [this link](https://github.com/aynp/resume/generate) to create a template.

- Genrate a new Personal Access Token.

- Add repository secret to Actions by going to `Settings > Actions > Repository Secret`.

- Enter a new secret

```
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

- Clone the repository to your local system, edit the `resume.tex` file and push the changes. `resume.pdf` and `resume-1.png` will be automatically regenerated. You can pull these changed to your local system.
