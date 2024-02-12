# engineering-blog

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting_started)
	1. [New to the Project?](#new_to_the_project)
3. [GitHub Pages with Jekyll](#jekyll)
	1. [Run site locally](#run_local)

## Introduction <a name="introduction"></a>

A list of engineering articles from usTwo

## Getting Started <a name="getting_started"></a>

### New to the Project? <a name="new_to_the_project"></a>

If you are a new developer, we have a script you can run to install all dependencies, there
may be parts that you do-not wish to install, so pick and choose what you need when asked.

```
sh ./scripts/new-developer.sh
```

## GitHub Pages with Jekyll <a name="jekyll"></a>

We are using GitHub Pages with Jekyll templates


### Run locally <a name="run_local"></a>

```bash
bundle exec jekyll serve
```

Note: If you get a `webbrick` error you need to run:

```bash
bundle add webrick
```