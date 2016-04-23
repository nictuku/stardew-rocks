import React, {PropTypes} from 'react';
import Radium from 'radium';
import Paper from 'material-ui/lib/paper';
import {FormattedMessage, FormattedHTMLMessage, injectIntl, intlShape, defineMessages} from 'react-intl';
import color from 'color';

import colors from '../colors';

const messages = defineMessages({
  screenshotAlt: {
    id: 'about.screenshotAlt',
    description: 'alt text for taskbar screenshot',
    defaultMessage: 'taskbar screenshot'
  }
});

@injectIntl
@Radium
class About extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired
  };

  static contextTypes = {
    season: PropTypes.string
  };

  styles () {
    /* eslint-disable no-magic-numbers */
    return {
      about: {
        overflow: 'auto',
        textAlign: 'center',
        flex: '1',
        backgroundColor: color(colors[this.context.season].color1).darken(0.5).rgbString()
      },
      paper: {
        display: 'inline-block',
        textAlign: 'left',
        padding: '0 1rem 1rem 1rem',
        maxWidth: '800px',
        margin: '1rem'
      }
    };
    /* eslint-enable */
  }

  render () {
    return (
      <div style={this.styles().about}>
        <Paper style={this.styles().paper}>
          <h2>
            <FormattedMessage
              id="about.aboutHeader"
              defaultMessage="About"
              description="about header"
            />
          </h2>
          <p>
            <FormattedMessage
              id="about.paragraph1"
              description="summary of application"
              defaultMessage="Stardew Farm is a tool for Stardew Valley that collects saved games and shares them with our community. We create and share screenshots of your game with everyone - no complicated setup needed!"
            />
          </p>
          <p>
            <FormattedMessage
              id="about.paragraph2"
              description="summary of how to upload farms"
              defaultMessage="Install the Stardew Farm client to share your farm state! Farm screenshots will automatically appear here every time your game is saved."
            />
          </p>
          <a href="https://github.com/nictuku/stardew-rocks/releases/latest">
            <FormattedMessage
              id="about.callToAction"
              description="the link to download the desktop client"
              defaultMessage="Download Stardew Farm!"
            />
          </a>
          <p>
            <FormattedMessage
              id="about.instructions1"
              description="how to use desktop client primer"
              defaultMessage="Just download the .exe file and run it. It stays on your system tray and looks like this:"
            />
          </p>
          <img alt={this.props.intl.formatMessage(messages.screenshotAlt)} src="content/systray.png" />
          <p>
            <FormattedMessage
              id="about.instructions2"
              description="how to close desktop client"
              defaultMessage="You can right click on that icon to close it."
            />
          </p>
          <p>
            <FormattedMessage
              id="about.instructions3"
              description="how to make the app not run at startup"
              defaultMessage="The app is configured to run on startup for you. If you don't want that, just rename the stardew_rocks.exe executable to something else and it won't start automatically anymore."
            />
          </p>
          <h2>
            <FormattedMessage
              id="faq.faqHeader"
              description="header for faq"
              defaultMessage="FAQ"
            />
          </h2>
          <h4>
            <FormattedMessage
              id="faq.findFarmHeader"
              description="header for how to find one's farm"
              defaultMessage="How do I find my farm?"
            />
          </h4>
          <p>
            <FormattedMessage
              id="faq.findFarm"
              description="how to find one's farm"
              defaultMessage="After you have slept one night in game with this service running, use the search bar at the top and enter your farm or farmer's name."
            />
          </p>
          <h4>
            <FormattedMessage
              id="faq.findScreenshotHeader"
              description="header for where's my screenshot"
              defaultMessage="I don't see my screenshot. What happened?"
            />
          </h4>
          <p>
            <FormattedMessage
              id="faq.findScreenshot"
              description="where's my screenshot"
              defaultMessage="The save files are only uploaded after the game is saved, which happens after each night in the game."
            />
          </p>
          <h4>
            <FormattedMessage
              id="faq.missingItemsHeader"
              description="header for missing items on farm"
              defaultMessage="There's something missing on my farm :-("
            />
          </h4>
          <p>
            <FormattedMessage
              id="faq.missingItems"
              description="stuff is missing on my farm"
              defaultMessage="  We are still working on the tool and not everything is perfect yet. Check again in a few days :). Once we update the code, we go back and regenerate all screenshots, so nothing is lost."
            />
          </p>
          <h4>
            <FormattedMessage
              id="faq.whatIsSavedHeader"
              description="header for what is saved"
              defaultMessage="So what do you save?"
            />
          </h4>
          <p>
            <FormattedMessage
              id="faq.whatIsSaved"
              description="what is uploaded to us"
              defaultMessage="We save the save file for each and every day of your game, as long as the client is up and running. You can click on your farm on the site and look at it."
            />
          </p>
          <h4>
            <FormattedMessage
              id="faq.needHelpHeader"
              description="header for I need help"
              defaultMessage="Something else is not working, I need help!"
            />
          </h4>
          <p>
            <FormattedHTMLMessage
              id="faq.needHelp"
              description="link to support discord channel"
              defaultMessage="Just join our <a href='{discordLink}'>Discord server chat</a> and ask!"
              values={{
                discordLink: "https://discord.gg/0tpEyZrnOVQKA93b"
              }}
            />
          </p>
        </Paper>
      </div>
    );
  }
}

export default About;
