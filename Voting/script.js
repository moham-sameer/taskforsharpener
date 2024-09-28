let totalVoteCount = 0; // Variable to track total votes

// Handle form submission
document.getElementById('submitForm').addEventListener('submit', submitHandler);

function submitHandler(event) {
    event.preventDefault(); // Prevent form refresh
    const Name = document.getElementById('name').value;
    const select = document.getElementById('select').value;
    const voteContainer = document.createElement("div");
    voteContainer.innerHTML = `${Name} <button class="delete-btn">Delete</button>`;
    
    // Increment total votes and update display
    totalVoteCount++;
    document.getElementById('totalVotes').innerText = totalVoteCount;

    if (select === "ish") {
        document.querySelector('.ishmaelVotes').appendChild(voteContainer);
        updateCount('ishmaelCount');
    } else if (select === "rah") {
        document.querySelector('.rahimVotes').appendChild(voteContainer);
        updateCount('rahimCount');
    } else if (select === "hri") {
        document.querySelector('.hrithikVotes').appendChild(voteContainer);
        updateCount('hrithikCount');
    }

    // Add delete functionality
    voteContainer.querySelector('.delete-btn').addEventListener('click', () => {
        totalVoteCount--;
        document.getElementById('totalVotes').innerText = totalVoteCount;

        // Update the count for the specific monitor
        if (select === "ish") {
            updateCount('ishmaelCount', -1);
        } else if (select === "rah") {
            updateCount('rahimCount', -1);
        } else if (select === "hri") {
            updateCount('hrithikCount', -1);
        }

        // Remove the vote from the display
        voteContainer.remove();
    });

    // Clear the input field
    document.getElementById('name').value = '';
}

function updateCount(monitorClass, increment = 1) {
    const countSpan = document.querySelector(`.${monitorClass}`);
    let currentCount = parseInt(countSpan.innerText, 10);
    currentCount += increment;
    countSpan.innerText = currentCount;
}
