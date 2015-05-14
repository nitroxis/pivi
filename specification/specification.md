# Specification for the pivi Language

The pivi Language is a *one command per line* language that converts commands
into drawings. There are essentially three kinds of commands.

 1. Drawing commands that perform a real drawing operation
 2. State changing commands. All of these start with `set`
 3. Controlling commands.

## Drawing Commands

Nearly every drawing command in pivi accepts multplie datasets, that means it is
possible to draw multiple points, circles etc. in one line.

The available commands are

### points

The `points` command draws points at the specified position. Each point needs
exactly one 2 tuple.

*Aliasses: `points`, `point`*

```
point 100 100 100 101 100 102 100 103 100 104
points 100 105 100 106 100 107
```
![](example1.png)


### lines

The `lines` command draws multiple lines that are not connected. Every line
takes two two-dimensional tuples as the endpoints. The n-th line takes point
2n-1 and 2n as its endpoints (n starting at 1).

*Aliasses: `lines`, `line`*

```
lines ((100 100), (200, 200)) 200 100 100 200
```
![](example2.png)


### polyline

The `polyline` command draws connected line segments. The first line segment
uses the first two points as two-dimensional tuples. Every following line takes
a new two-dimensional tuple and reuses the last point as its endpoints. The
n-th line segment thus takes point n and n+1 as its enpoints (n starting at 1).
The `polyline` command supports exactly one polyline per command line. If you
want multiple polylines you have to create a new line for each polyline.

```
polyline 100 100 200 200 200 100 100 200
```
![](example3.png)


### circles

The `circles` command draws multiple circles. Every circle has a point as a
two-dimensional tuple and a positive radius such that every circle needs exactly
three values.

*Aliasses: `circles`, `circle`*

```
circle ((120 120) 40) 50 50 30
```
![](example4.png)



## State commands

## Controlling commands
