async function play() {
  let playerInput = document.getElementById("playerInput").value.toLowerCase();
  const choices = ["rock", "paper", "scissors"];
  const computerInput = choices[Math.floor(Math.random() * choices.length)];
  let result = "";

  if (!choices.includes(playerInput)) {
    result = "Please enter a valid choice: rock, paper, or scissors.";
  } else {
    try {
      const playerImageUrl = await getImageUrl(playerInput);
      const computerImageUrl = await getImageUrl(computerInput);

      const playerImage =
        "<img src='" + playerImageUrl + "' alt='Player's choice'>";
      const computerImage =
        "<img src='" + computerImageUrl + "' alt='Computer's choice'>";

      document.getElementById("images").innerHTML = playerImage + computerImage;

      if (playerInput === computerInput) {
        result =
          "It's a tie! You chose " +
          playerInput +
          ", computer chose " +
          computerInput +
          ".";
      } else if (
        (playerInput === "rock" && computerInput === "scissors") ||
        (playerInput === "paper" && computerInput === "rock") ||
        (playerInput === "scissors" && computerInput === "paper")
      ) {
        result =
          "You win! You chose " +
          playerInput +
          ", computer chose " +
          computerInput +
          ".";
      } else {
        result =
          "You lose! You chose " +
          playerInput +
          ", computer chose " +
          computerInput +
          ".";
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      result =
        "An error occurred while fetching images. Please try again later.";
    }
  }

  document.getElementById("result").innerText = result;
}

async function getImageUrl(keyword) {
  const apiKey = "YOUR_PEXELS_API_KEY";
  const response = await fetch(
    "https://api.pexels.com/v1/search?query=" + keyword + "&per_page=1",
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  const data = await response.json();
  return data.photos.length > 0
    ? data.photos[0].src.small
    : "https://via.placeholder.com/150"; 
}
