# Robotics Course Website

Source of the RAS University robotics course website, built with [Jekyll](https://jekyllrb.com/) and the [Just the Docs](https://just-the-docs.com/) theme.

## Run locally

Requires Ruby 3.x and Bundler (`gem install bundler`).

```bash
git clone https://github.com/RAS-University/robotic-courses
cd robotic-courses
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. If the port is taken, add `--port 4004`.

## Contributing

1. Branch off `develop`: `git checkout develop && git pull && git checkout -b feature/<name>`
2. Commit, push, and open a pull request to `develop`.
3. Delete your branch once it's merged.

The project maintainer merges `develop` into `main` when changes are ready to go live.

## Deployment

- **Public site:** every push to `main` is deployed to [GitHub Pages](https://ras-university.github.io/robotic-courses/) by `.github/workflows/pages.yml`. The [IEEE RAS University page](https://www.ieee-ras.org/ras-university/) loads its content from there, so don't remove that workflow or disable Pages.
- **Branch previews:** every branch is built and served by [docker_ras_webserver](https://github.com/RAS-University/docker_ras_webserver) at `/<branch>/` (slashes become dashes, e.g. `feature/chap3` → `/feature-chap3/`), about a minute after each push.
