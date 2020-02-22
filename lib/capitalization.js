const log = require('./log');

const lower = ['the', 'a', 'an', 'and', 'or', 'for', 'but', 'nor', 'to', 'aboard', 'about', 'above', 'absent ', 'across', 'cross ', 'after', 'against', 'along', 'alongside', 'amid', 'among', 'amongst ', 'apropos ', 'apud ', 'around', 'as', 'astride', 'at', 'atop', 'ontop ', 'bar', 'before', 'afore ', 'behind', 'ahind ', 'below', 'beneath', 'beside', 'besides', 'between', 'atween ', 'betwixt ', 'beyond', 'ayond ', 'but', 'by', 'chez ', 'circa', 'come', 'dehors ', 'despite', 'spite ', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'less', 'like', 'minus', 'near', 'nearer', 'nearest ', 'anear ', 'notwithstanding ', 'of', 'off', 'on', 'onto', 'opposite', 'out', 'outen ', 'outside', 'over', 'pace ', 'past', 'per', 'plus', 'post ', 'pre ', 'pro ', 'qua ', 're ', 'sans ', 'save', 'sauf ', 'short', 'since', 'sithence ', 'than', 'through', 'thru ', 'throughout', 'thruout ', 'till', 'to', 'toward', 'towards', 'under', 'underneath', 'unlike', 'until', 'til ', 'unto ', 'up', 'upon', 'upside', 'versus', 'via', 'vice ', 'with', 'within', 'without'];

module.exports = (headline) => {
  const words = headline.split(' ');
  words.forEach((word, index) => {
    const sc = index === 0 || index === words.length - 1 || !lower.includes(word.toLowerCase());
    if (sc && word[0] !== word[0].toUpperCase()) {
      log.warn(`${word} should be capitalized in headline ${headline}.`);
    }
    else if (!sc && word[0] === word[0].toUpperCase()) {
      log.warn(`${word} should be lowercased in headline ${headline}.`);
    }
  });
};
