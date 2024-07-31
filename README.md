# engineering-blog

## Table of Contents

- [engineering-blog](#engineering-blog)
	- [Table of Contents](#table-of-contents)
	- [Introduction ](#introduction-)
	- [Getting Started ](#getting-started-)
		- [New to the Project? ](#new-to-the-project-)
	- [GitHub Pages with Jekyll ](#github-pages-with-jekyll-)
		- [Run locally ](#run-locally-)

## Introduction <a name="introduction"></a>

A list of engineering articles from usTwo

## Getting Started <a name="getting_started"></a>

### New to the Project? <a name="new_to_the_project"></a>

If you are a new developer, you'll need to first [install Docker](https://docs.docker.com/get-docker/).

Once that's done, just run the command below to set up your docker container, running at port: 4000

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