const form = document.getElementById('add-form');
const addBtn = document.getElementById('add-btn');
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('input', () => {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    addBtn.disabled = !allFilled;
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {};
  inputs.forEach(input => {
    data[input.name] = input.value;
  });
  fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then((newData) => {
    const table = document.getElementById('data').querySelector('table');
    const tbody = table.querySelector('tbody');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = data.Ország;
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.textContent = data.Egyetem_neve;
    tr.appendChild(td2);
    const td3 = document.createElement('td');
    td3.textContent = data.Város;
    tr.appendChild(td3);
    const td4 = document.createElement('td');
    td4.textContent = data.Vidék_Város;
    tr.appendChild(td4);
    const td5 = document.createElement('td');
    td5.textContent = data.Minimum_pontszam;
    tr.appendChild(td5);
    const td6 = document.createElement('td');
    td6.textContent = data.Ágazat;
    tr.appendChild(td6);
    const td7 = document.createElement('td');
    td7.textContent = data.Tanfolyam_hossza;
    tr.appendChild(td7);
    const td8 = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
      const tr = editButton.parentNode.parentNode;
      const tds = tr.querySelectorAll('td');
      const data = {};
      tds.forEach((td, index) => {
        if (index < 7) {
          const input = document.createElement('input');
          input.value = td.textContent;
          td.textContent = '';
          td.appendChild(input);
        } else {
          const buttons = td.querySelectorAll('button');
          buttons.forEach(button => {
            button.style.display = 'none';
          });
          const doneButton = document.createElement('button');
          doneButton.textContent = 'Done';
          doneButton.onclick = () => {
            const inputs = tr.querySelectorAll('input');
            inputs.forEach((input, index) => {
              data[Object.keys(newData)[index]] = input.value;
            });
            fetch('/edit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: newData.id, ...data })
            })
            .then(response => response.json())
            .then(() => {
              inputs.forEach((input, index) => {
                input.parentNode.textContent = input.value;
              });
              doneButton.style.display = 'none';
              buttons.forEach(button => {
                button.style.display = 'block';
              });
            });
          };
          td.appendChild(doneButton);
        }
      });
    };
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      fetch('/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: newData.id })
      })
      .then(response => response.json())
      .then(() => {
        tr.remove();
      });
    };
    td8.appendChild(editButton);
    td8.appendChild(deleteButton);
    tr.appendChild(td8);
    tbody.appendChild(tr);
    // Clear the form fields
    inputs.forEach(input => {
      input.value = '';
    });
  });
});

fetch('/data')
  .then(response => response.json())
  .then(data => {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'Ország';
    tr.appendChild(th1);
    const th2 = document.createElement('th');
    th2.textContent = 'Egyetem neve';
    tr.appendChild(th2);
    const th3 = document.createElement('th');
    th3.textContent = 'Város';
    tr.appendChild(th3);
    const th4 = document.createElement('th');
    th4.textContent = 'Vidék_Város';
    tr.appendChild(th4);
    const th5 = document.createElement('th');
    th5.textContent = 'Minimum_pontszam';
    tr.appendChild(th5);
    const th6 = document.createElement('th');
    th6.textContent = 'Ágazat';
    tr.appendChild(th6);
    const th7 = document.createElement('th');
    th7.textContent = 'Tan folyam_hossza';
    tr.appendChild(th7);
    const th8 = document.createElement('th');
    th8.textContent = 'Actions';
    tr.appendChild(th8);
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('data').appendChild(table);

    data.forEach(item => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.textContent = item.Ország;
      tr.appendChild(td1);
      const td2 = document.createElement('td');
      td2.textContent = item.Egyetem_neve;
      tr.appendChild(td2);
      const td3 = document.createElement('td');
      td3.textContent = item.Város;
      tr.appendChild(td3);
      const td4 = document.createElement('td');
      td4.textContent = item.Vidék_Város;
      tr.appendChild(td4);
      const td5 = document.createElement('td');
      td5.textContent = item.Minimum_pontszam;
      tr.appendChild(td5);
      const td6 = document.createElement('td');
      td6.textContent = item.Ágazat;
      tr.appendChild(td6);
      const td7 = document.createElement('td');
      td7.textContent = item.Tanfolyam_hossza;
      tr.appendChild(td7);
      const td8 = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => {
        const tr = editButton.parentNode.parentNode;
        const tds = tr.querySelectorAll('td');
        const data = {};
        tds.forEach((td, index) => {
          if (index < 7) {
            const input = document.createElement('input');
            input.value = td.textContent;
            td.textContent = '';
            td.appendChild(input);
          } else {
            const buttons = td.querySelectorAll('button');
            buttons.forEach(button => {
              button.style.display = 'none';
            });
            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.onclick = () => {
              const inputs = tr.querySelectorAll('input');
              inputs.forEach(( input, index) => {
                data[Object.keys(item)[index]] = input.value;
              });
              fetch('/edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, ...data })
              })
              .then(response => response.json())
              .then(() => {
                inputs.forEach((input, index) => {
                  input.parentNode.textContent = input.value;
                });
                doneButton.style.display = 'none';
                buttons.forEach(button => {
                  button.style.display = 'block';
                });
              });
            };
            td.appendChild(doneButton);
          }
        });
      };
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => {
        fetch('/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id })
        })
        .then(response => response.json())
        .then(() => {
          tr.remove();
        });
      };
      td8.appendChild(editButton);
      td8.appendChild(deleteButton);
      tr.appendChild(td8);
      tbody.appendChild(tr);
    });
  });