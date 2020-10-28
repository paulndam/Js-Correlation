let journal = [];

function addEntry (events, squirrel) {
  journal.push ({events, squirrel});
}

addEntry (['work', 'meeting', 'doctor-aptmnt'], false);
addEntry (['work', 'lunch', 'code'], false);
addEntry (['eat', 'sleep', 'chill'], false);
addEntry (['dance', 'fight', 'drive', 'drink', 'play', 'walk', 'race'], true);

// this function computes the phi coefficient of an array

function phi (table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt (
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}

console.log (phi ([76, 9, 4, 1]));

function tableFor (event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;

    if (entry.events.includes (event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log (tableFor ('pizza', journal));

function journalEvents (journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes (event)) {
        events.push (event);
      }
    }
  }
  return events;
}

console.log (journalEvents (journal));

// now checking to see all the correlations between each events

for (let event of journalEvents (journal)) {
  console.log (event + ' : ', phi (tableFor (event, journal)));
}

//  now filtering to show correlations greater than 0.1 or less than -0.1

for (let event of journalEvents (journal)) {
  let correlation = phi (tableFor (event, journal));

  if (correlation > 0.1 || correlation < -0.1) {
    console.log (event + ':', correlation);
  }
}

//  now lets us actually check and see what are the main events that happens to give a strong correlation of a relationship

for (let entry of journal) {
  if (entry.events.includes ('drink') && !entry.events.includes ('chill')) {
    entry.events.push ('chill drink');
  }
}

console.log (tableFor ('chill drink', journal));
