if (window.matchMedia('(display-mode: standalone)').matches) {
  // The app is running in standalone mode (launched from the home screen)
  console.log('App is in standalone mode');
  alert("Saved to home screen")
} else {
  // The app is not running in standalone mode
  alert("Not Saved")
  console.log('App is not in standalone mode');
}

const apiUrl = 'https://labs.bible.org/api/?passage=random&type=json';
let currentReel = 2;
// Create a new reel element
function createNewReel() {
  const newReel = document.createElement('div');
  newReel.className = 'reel';
  newReel.id = 'reel' + (document.getElementsByClassName('reel').length + 1);

  // Create the verse div
  const verseDiv = document.createElement('div');
  verseDiv.className = 'verse';

  // Create the text paragraph
  const textParagraph = document.createElement('p');
  textParagraph.className = 'text';
  textParagraph.id = 'text' + (document.getElementsByClassName('text').length + 1);
  
  fetchVerse()
    .then(result => {
      textParagraph.innerHTML = result;
    })
    .catch(error => {
      console.error(error);
      // Handle errors if necessary
    });
  // Append the text paragraph to the verse div
  verseDiv.appendChild(textParagraph);

  // Create the actions div
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'actions';

  // Create the heart button
  const heartButton = document.createElement('button');
  heartButton.className = 'heart';
  heartButton.id = 'heart' + (document.getElementsByClassName('heart').length + 1);

  // Create the comment button
  const commentButton = document.createElement('button');
  commentButton.className = 'comment';
  commentButton.id = 'comment' + (document.getElementsByClassName('comment').length + 1);

  // Create the share button
  const shareButton = document.createElement('button');
  shareButton.className = 'share';
  shareButton.id = 'share' + (document.getElementsByClassName('share').length + 1);

  // Append the buttons to the actions div
  actionsDiv.appendChild(heartButton);
  actionsDiv.appendChild(commentButton);
  actionsDiv.appendChild(shareButton);

  // Append the verse div and actions div to the new reel
  newReel.appendChild(verseDiv);
  newReel.appendChild(actionsDiv);

  // Append the new reel to the container (replace 'containerId' with the actual container ID)
  document.getElementById('fullscreen').appendChild(newReel);
}
// Call the function to create a new reel
createNewReel();
createNewReel();

function checkAndMoveReel() {

  // Assuming 'reel' is the class name for your reels
  const reels = document.getElementsByClassName("reel");

  for (let i = 0; i < reels.length; i++) {
    const reelRect = reels[i].getBoundingClientRect();
    if (reelRect.top < -725) {
      createNewReel();
    }
  }
}
// Attach the checkAndMoveReel function to a scroll event listener
document.getElementById("fullscreen").addEventListener('scroll', checkAndMoveReel);

async function fetchVerse() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const verseText = data[0].text;
    const verseReference = data[0].bookname + ' ' + data[0].chapter + ':' + data[0].verse;
    return verseText + verseReference;
  } catch (error) {
    console.error('Error fetching Bible verse:', error);
    throw error; // Propagate the error
  }
}
