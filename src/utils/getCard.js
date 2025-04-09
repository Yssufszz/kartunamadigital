export async function getCard(id) {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${id}/latest`, {
      headers: {
        'X-Master-Key': '$2a$10$3B9dvKsm3i4gjESUOlIMVO/Dla06ivf3poKJAgo1L42W0jpUaczCu'
      }
    });
  
    const result = await res.json();
    return result.record; // ini data aslinya
  }
  