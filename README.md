# Robotics Course Website

This project uses the [Just the Docs](https://just-the-docs.github.io/just-the-docs/) Jekyll theme to build and host a free robotics course website on GitHub Pages.

---

## 🚀 How to Run This Site Locally

Follow these steps to install, build, and preview the site on your computer.

### 1. Install Prerequisites

Make sure you have:

- **Ruby** (version 3.x preferred)  
- **Bundler** and **Jekyll** gems

If you don't have them:

```bash
# Install bundler and jekyll
gem install bundler jekyll
```

### 2. Clone the Repository
```bash
git clone https://github.com/RAS-University/robotic-courses
```

### 3. Install the Required Gems

Make sure you're inside the project folder (where the Gemfile is).

```bash
bundle install
```

### 4. Serve the Site Locally
   
```bash
bundle exec jekyll serve 
```
if get error like: "Address already in use - bind(2) for 127.0.0.1:4000 (Errno::EADDRINUSE)"
```bash
bundle exec jekyll serve --port 4004
```

## Development Workflow

This repository uses a **branch-based workflow** to manage development and deployment. Follow these steps to contribute safely:


### Branching Diagram
feature/... → develop → main → Live Site

### 1. Create a feature branch
Whenever you start working on a new feature or chapter, create a branch off `develop`. Use descriptive names for your branches:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/BRANCHE_NAME
```
Example branch names:
- `feature/chap1` – work on chapter 1

### 2. Work on Your Feature
Make your changes locally.

### 3.Merge Your Feature Branch into develop

Once your feature is ready:

```bash
git checkout develop
git pull origin develop
git merge feature/chap1
git push origin develop
```


**!! Resolve any conflicts before pushing. !!**

### 4. Update main and Deploy

After the develop branch has accumulated the changes for deployment:

```bash
git checkout main
git pull origin main
git merge develop
git push origin main
```

The website is automatically built and deployed from main.

Only merge into main when changes are ready to go live.