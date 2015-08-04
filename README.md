# Soulfit Challenge

An application to help track the Soulfit statistics.  Simplified by using basic jQuery instead of Angular framework.

## Installation

If you would like a local copy of this project please navigate to the directory where you would like to clone it and run:

```
git clone https://github.com/bwaang/soulfit-jquery
cd soulfit-jquery
```

Make sure to **install all dependencies** with `bower install` and `npm install` that are not found in this repository.

To **start your server** just run the command `grunt serve`.

It should redirect you to your [local server](http://localhost:9000/) under port 9000, and you should be good to go.

## Basic File Structure

There's only one html file for this project under:

```
app/index.html
```

You can modify the **less/css** styles under:

```
app/styles/less
```

Make to do your soulfit data manipulation in `soulfit.js` under:

```
app/scripts/soulfit.js
```

And all your jquery can be coded under `main.js`:

```
app/scripts/main.js
```
