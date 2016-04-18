# stardew.farm

Stardew Farm is a tool for Stardew Valley that collects saved games and shares them with the community at http://stardew.farm. 

We create and share screenshots of your game with everyone - no complicated setup needed!

Install the Stardew Farm client to share your farm state with the rest of the community! Farm screenshots will automatically appear here every time your game is saved: http://stardew.farm (website is work in progress, hehe).

 - [Download Stardew Farm!](https://github.com/nictuku/stardew-rocks/releases/download/v0.8/stardew_rocks.exe)

For usage instructions, see the [About page and FAQ](http://stardew.farm/about)

Screenshots look like this:

![Farm Map](view/map-'JackyBreak'_1459385994.png)

The screenshots are not perfect yet, but we're working on it as fast as possible!

Discord server for stardew.farm chat: https://discord.gg/0tpEyZrnOVQKA93b

# For Developers

## Renderer development

The renderer is in the view/ directory. To test it, try:

<pre>
cd view
go get .  # to fetch the dependencies
go test 
</pre>
 
If all goes well, this will re-generate the .png's in the current directory. Make changes to the renderer then run "go test" again to see the results.

Reference screenshots are available in the assets/img/ directory - they were produced in-game and serve as a target for the renderer development.

## AMPQ / RabbitMQ

The ampq URL is: `amqp://guest:guest@amqp.stardew.rocks:5672/`

We currently publish the following exchanges:

 - "SaveGameInfo-1" receives raw uncompressed XML files with SaveGameInfo.
 - "OtherFiles-1" receives raw uncompressed XML files with the super-large file saves.
 
# Planned features

- Authentication of some fashion
- Finish implementing all missing tiles
- Let people upload their save games manually without installing the client

# Thanks to our testers!

freaky-m0, Beener, Kylindra, Dristan, Syndlig
