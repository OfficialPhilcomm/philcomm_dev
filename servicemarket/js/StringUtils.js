class StringUtils {
  static humanize(string) {
    let words = string.split('-');
    for(let i in words) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  }

  static stateToString(state) {
    if(state === 0) {
      return 'accepted'
    } else if(state === 1) {
      return 'started'
    } else if(state === 2) {
      return 'breeded'
    } else if(state === 3) {
      return 'leveled'
    } else if(state === 4) {
      return 'finished'
    }
  }
}
