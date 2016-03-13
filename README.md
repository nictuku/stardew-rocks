# stardew-rocks

This provides a client for Windows sends Stardew Valley saved games to a fanout queue. 

Developers can watch that queue and do cool things with the saved files.

For example:
- write cool web apps showing what people are doing
- analyze the most efficient players
- host a Stardew Valley tourney: see who get a certain amount of resources faster without cheating!

To give it a try, see the pre-compiled Windows amd64 binary in the Releases section. Download the .exe file and run it.

It looks a bit like this:

`screenshot here soon`

Please leave this window open in the background while you're playing Stardew Valley. If that's working well then mod
developers can see whenever your save file changes and they can build very cool stuff with everyone's information!

# For Developers

We currently publish the following topics:

 - topic "SaveGameInfo-1" receives raw uncompressed XML files with contributors' SaveGameInfo.

# Known limitations

For now we only publish the raw XML file of the SaveGameInfo file. 

# Future versions

