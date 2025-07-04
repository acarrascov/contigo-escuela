const form = document.getElementById('surveyForm');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    edad: form.edad.value,
    curso: form.curso.value,
    genero: form.genero.value,
    convive: form.convive.value,
    internet: form.internet.value,
    emocion: form.emocion.value,
    ganas: form.ganas.value,
    acompanado: form.acompanado.value,
    observaciones: form.observaciones.value
  };

  // 👉 Pega aquí la URL de tu Web App publicado
  fetch("https://script.google.com/macros/s/AKfycby87cTlxP8sSC8YzOXV-SZ4CSCttMiNWtdX7FeZ2iZyEAv-8gFJl8Ikm4TPUHE3ANjA/exec", {
    method: "POST",
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
