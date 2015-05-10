# Pivi

Pivi (short for Pipeviewer) is a tool that simplifies visualization tasks. It
has a simple stream based input format.

# Example

The following program generates a zigzag line and outputs it as a PNG image.

```
echo "polyline (0 0) (100 100) (100 0) (0 100)" | pivi
```

# Supported Commands

All points can be written as a tupel or you can simply omit all commas or 
brackets.

 - `point 1 2`
 - `line (0, 0) (20 30)`
 - `polyline 0 0 ... 100 0`