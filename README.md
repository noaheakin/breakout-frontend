# Breakout

Breakout is a fun reimagination of Atari's classic game, "Breakout". The user plays a platform that can move right or left using the left and right arrows. The objective is to destroy all the blocks by ricocheting the ball off the platform and the walls to hit all the blocks without losing all their lives. If the player's platform misses the ball's ricochet, they will lose a life. The player has three lives to destroy all the blocks. If not able to do so, the game will end and the player will have to restart

## Installation

in your terminal, make a repository called `breakout` and then jump into this repository. Follow the website https://github.com/noaheakin/breakout-frontend. Fork the repository and clone this repository down to your terminal to get the frontend repository. Follow the website https://github.com/noaheakin/breakout-backend. Fork the repository and clone this repository down to your terminal to get the backend repository. Once they are both cloned, run:  

```ruby
install bundle
```
to make sure you have all the gems needed. 

## Run
To run the program, go into the `breakout-backend` repository and run 

```ruby
rails s
```
in the terminal. Once that has worked, type in (http://localhost:3000/user) into your web browser to see the information occurring on the backend. To play the game, go into `breakout-frontend` into your terminal. From there, run (for windows machine):
```javascript
explorer.exe index.html
```
run (for Mac):

```javascript
open index.html
```
## Usage

The user will create an username. This username will hold their scores. The user gets points to their score for each block destroyed. The user also loses points for each life lost. The user will be able to see their top three scores. When a user is signed in, they can delete their username.

## Contributors
Noah Eakin, Ashlee Barksdale and Chandler Hanson