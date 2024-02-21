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

If you are a new developer, we are a docker container to development environment, just run the command below to have 
all things done, running at port: 4000

```docker-compose
docker-compose up
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