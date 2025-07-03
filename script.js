const form = document.getElementById('surveyForm');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    emocion: form.emocion.value,
    ganas: form.ganas.value,
    acompanado: form.acompanado.value
  };

  // 👉 Pega aquí tu URL del Web App
  fetch("https://script.google.com/macros/s/AKfycbwMcYj9tQvzNZ5DUBd8-9mzyB-cD0kxUeTv4uuXu0GwVkwTId__cNEBCOpFSNpFrq5fAQ/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  let alerta = false;

  if (data.emocion === 'triste' || data.ganas === 'si' || data.acompanado === 'no') {
    alerta = true;
  }

  if (alerta) {
    resultado.innerHTML = `<p style="color: red;"><strong>🔔 Alerta:</strong> El estudiante puede necesitar apoyo emocional. Notificar al encargado.</p>`;
  } else {
    resultado.innerHTML = `<p style="color: green;">✅ Gracias por responder. ¡Sigue así!</p>`;
  }

  form.reset();
});
