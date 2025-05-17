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
git clone https://github.com/TLucking/RAS-University.git
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
