import 'isomorphic-fetch';

export const getDiscordInfo = () => {
  return new Promise(resolve => {
    fetch("https://discordapp.com/api/servers/161199619630563329/widget.json")
      .then(res => resolve(res.json()));
  });
};
