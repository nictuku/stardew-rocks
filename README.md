# stardew-rocks

Stardew Rocks is a tool for Stardew Valley that collects saved games and shares them with mod developers! 

We'll build some cool features based on the saved games, watch this space :-D.

# For Farmers

You can install the Stardew Rocks client and share your farm state with the rest of the community! Farm screenshots will eventually appear here: http://stardew.rocks (website is work in progress, hehe).

 - [Download Stardew Rocks!](https://github.com/nictuku/stardew-rocks/releases/download/v0.4/stardew_rocks.exe)

Just download the .exe file and run it. It stays on your system tray and looks like this:

![Screenshot](assets/img/systray.png)



You can right click on that icon to close it.

The app is configured to run on startup for you. If you don't want that, just rename the *stardew_rocks.exe* executable to something else and it won't start automatically anymore.

*WARNING*: _Stardew Rocks_ doesn't ever write to files on your computer, but there may be a risk of crashing StardewValley when it tries to save a game. That can make you lose a day of your SDV work. If that happens, please notify the _Stardew Rocks_ developers. We don't want it to happen to anybody else!

# For Developers

The ampq URL is: `amqp://guest:guest@amqp.stardew.rocks:5672/`

We currently publish the following exchanges:

 - "SaveGameInfo-1" receives raw uncompressed XML files with contributors' SaveGameInfo.
 - "OtherFiles-1" receives raw uncompressed XML files with the super-large file saves.
 
To show off what we can do, I've built a simple farm map generator that creates simple images whenever someone pushes a new game save. For example:

![Farm Map](view/map-test.png)

For now it only shows a few items. It will be more complete, eventually :-).
 
# Planned features

- Authentication of some fashion
- Prettier farm maps
- A slick website showing people's farms!

# Thanks to our testers!

freaky-m0, Beener, Kylindra, Dristan
