class StringUtils {
  static humanize(string) {
    let words = string.split('-');
    for(let i in words) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  }

  static stateToString(state) {
    return state === 0 ? 'accepted' :
    state === 1 ? 'started' :
    state === 2 ? 'breeded' :
    state === 3 ? 'leveled' :
    state === 4 ? 'finished'
  }
}
