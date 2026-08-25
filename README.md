# Mullenaux Farms — website

A single-page site. Plain HTML, CSS, and JavaScript with no build step and no
dependencies, so it can be dropped onto any host as-is.

```
index.html          all page content
css/style.css       all styling
js/main.js          scroll reveals, sticky nav, mobile menu, hero parallax
assets/             logo and photographs
```

## Viewing it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 4321
```

## Publishing

Drag this folder onto [app.netlify.com/drop](https://app.netlify.com/drop) for a
free URL, or push it to a GitHub repository and turn on GitHub Pages. There is
nothing to compile.

## Editing the text

All copy lives in `index.html` as ordinary text — search for the sentence you
want to change and edit it in place.

## The "get started" buttons

Four buttons open the visitor's email app with a message already drafted to
`MullenauxFarmsLLC@protonmail.com`:

- **Schedule a Free Consultation** and **Land Owner Consultation** — asks for
  property location, acreage, land condition, and goals.
- **Get Our Eggs** and **Ask About Our Eggs** — asks for location, weekly
  quantity, and whether they are buying for a household, farm store, or
  restaurant.

Each is a plain `mailto:` link in `index.html`. To change a draft, edit the
`subject=` and `body=` parts of the link; `%0A` is a line break and `%20` is a
space.

## Photographs

The photographs came from the farm's slide deck and are the only copies
available. Three of them (`pecan-grove`, `pastured-flock`, `wyatt-allgrass`)
were small originals, so they are displayed at modest sizes to stay sharp — if
you enlarge those slots in the CSS they will soften. Higher-resolution originals
would let those sections grow.
