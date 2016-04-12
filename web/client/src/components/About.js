import React from 'react';
import Paper from 'material-ui/lib/paper';

class About extends React.Component {
  styles () {
    return {
      about: {
        overflow: 'auto',
        textAlign: 'center'
      },
      paper: {
        display: 'inline-block',
        textAlign: 'left',
        padding: '0 1rem 1rem 1rem',
        maxWidth: '800px',
        margin: '1rem'
      }
    };
  }

  render () {
    return (
      <div style={this.styles().about}>
        <Paper style={this.styles().paper}>
          <h2>About</h2>
          <p>
            Stardew Farm is a tool for Stardew Valley that collects saved games and shares them with our community. We create and share screenshots of your game with everyone - no complicated setup needed!
          </p>
          <p>
            Install the Stardew Farm client to share your farm state! Farm screenshots will automatically appear here every time your game is saved.
          </p>
          <a href="https://github.com/nictuku/stardew-rocks/releases/latest">
            Download Stardew Farm!
          </a>
          <p>
            Just download the .exe file and run it. It stays on your system tray and looks like this:
          </p>
          <img alt="Screenshot" src="content/systray.png" />
          <p>
            You can right click on that icon to close it.
          </p>
          <p>
            The app is configured to run on startup for you. If you don't want that, just rename the stardew_rocks.exe executable to something else and it won't start automatically anymore.
          </p>
          <h2>FAQ</h2>
          <h4>I don't see my screenshot. What happened?</h4>
          <p>
            The save files are only uploaded after the game is saved, which happens after each night in the game.
          </p>
          <h4>There's something missing on my farm :-(</h4>
          <p>
            We are still working on the tool and not everything is perfect yet. Check again in a few days :). Once we update the code, we go back and regenerate all screenshots, so nothing is lost.
          </p>
          <h4>So what do you save?</h4>
          <p>
            We save the save file for each and every day of your game, as long as the client is up and running. You can click on your farm on the site and look at it.
          </p>
          <h4>Something else is not working, I need help!</h4>
          <p>
            Just join our <a href="https://discord.gg/0tpEyZrnOVQKA93b">Discord server chat</a> and ask!
          </p>
        </Paper>
      </div>
    );
  }
}

export default About;
