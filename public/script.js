const ably = new Ably.Realtime('ynrGug.SXDJOg:aoStJmyUcLlpwgEzYsJt8CFDsTBCq-yMjqNn6_DkgvM');
const channel = ably.channels.get('crud-channel');

const itemsDiv = document.getElementById('items');
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');

// Função para exibir itens
function displayItem(item) {
 const itemElement = document.createElement('div');
 itemElement.textContent = item.name;
 itemsDiv.appendChild(itemElement);
}

// Carregar itens
fetch('/api/items')
 .then(response => response.json())
 .then(items => {
  items.forEach(displayItem);
 });

// Adicionar item
addButton.addEventListener('click', () => {
 const itemName = itemInput.value;
 if (itemName) {
  fetch('/api/items', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: itemName })
   })
   .then(response => response.json())
   .then(displayItem)
   .catch(console.error);
 }
});

// Inscrever-se para eventos CRUD via Ably
channel.subscribe('create', message => {
 displayItem(message.data);
});

channel.subscribe('update', message => {
 // Atualizar o item na UI (você precisará de uma forma de identificar e atualizar o item)
});

channel.subscribe('delete', message => {
 // Remover o item da UI (você precisará de uma forma de identificar e remover o item)
});