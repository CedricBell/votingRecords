document.getElementById('addVoterForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('voterId').value;
    const name = document.getElementById('voterName').value;
    const address = document.getElementById('voterAddress').value;
    const age = document.getElementById('voterAge').value;

    const response = await fetch('http://localhost:3000/addVoter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, address, age })
    });

    if (response.ok) {
        alert('Voter added successfully');
    } else {
        alert('Failed to add voter');
    }
});

document.getElementById('editVoterForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('editVoterId').value;
    const name = document.getElementById('editVoterName').value;
    const address = document.getElementById('editVoterAddress').value;
    const age = document.getElementById('editVoterAge').value;

    const response = await fetch('http://localhost:3000/editVoter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, address, age })
    });

    if (response.ok) {
        alert('Voter edited successfully');
    } else {
        alert('Failed to edit voter');
    }
});

document.getElementById('deleteVoterForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('deleteVoterId').value;

    const response = await fetch('http://localhost:3000/deleteVoter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });

    if (response.ok) {
        alert('Voter deleted successfully');
    } else {
        alert('Failed to delete voter');
    }
});

document.getElementById('getVoterForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('getVoterId').value;

    const response = await fetch(`http://localhost:3000/getVoter/${id}`);

    if (response.ok) {
        const voter = await response.json();
        document.getElementById('voterResult').innerText = JSON.stringify(voter, null, 2);
    } else {
        alert('Failed to get voter');
    }
});
