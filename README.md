# Pivi
Pivi (short for Pipeviewer) is a tool that simplifies visualization tasks. It has a simple stream based input format.

# Installation
You need Cairo to create the images. We use [node-canvas](https://github.com/Automattic/node-canvas) to create the images they have an [installation guide](https://github.com/Automattic/node-canvas/wiki/_pages) on their project page.

Then you simply run:

```
npm install
```

# Example
The following program generates a zigzag line and outputs it as a PNG image.

```
echo "polyline (0 0) (100 100) (100 0) (0 100)" | node pivi.js
```

# Supported Commands
All points can be written as a tupel or you can simply omit all commas or brackets.
- `point 1 2`
- `points (1 2) (3 3)`
- `line (0, 0) (20 30)`
- `lines ((0, 0) (20 40)) ((0,0) (40,20))` (draws one line for each pair of points)
- `polyline 0 0 ... 100 0`
- `circle ((centerx,centery) radius)`
- `circles ((100,100) 20) ((centerx,centery) radius)`

# Alternatives
You can try ImageMagick's convert. You can pass arguments to it that function similar to our commands. More [here](http://www.imagemagick.org/Usage/draw/#circles)

# Contributors
- Rasmus Buchmann
- Maximilian Klein
