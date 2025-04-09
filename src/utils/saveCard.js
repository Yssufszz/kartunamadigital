export async function saveCard(data) {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$3B9dvKsm3i4gjESUOlIMVO/Dla06ivf3poKJAgo1L42W0jpUaczCu',
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    return result.metadata.id;
  }
  