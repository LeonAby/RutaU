const mostrar = document.getElementById("mostrarPassword");
if (mostrar) {
  mostrar.addEventListener("click", () => {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
    mostrar.textContent = pass.type === "password" ? "Mostrar" : "Ocultar";
  });
}

const login = document.getElementById("formLogin");
if (login) {
  login.addEventListener("submit", e => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;
    const guardado = JSON.parse(localStorage.getItem("rutaUUsuario") || "null");
    const mensaje = document.getElementById("mensaje");

    const correcto = (usuario === "estudiante" && password === "123456") ||
      (usuario === "admin" && password === "admin123") ||
      (guardado && (usuario === guardado.usuario || usuario === guardado.correo) && password === guardado.password);

    if (correcto) {
      mensaje.style.color = "green";
      mensaje.textContent = "Inicio de sesión correcto. ¡Bienvenido a RutaU!";
    } else {
      mensaje.style.color = "crimson";
      mensaje.textContent = "Usuario o contraseña incorrectos.";
    }
  });
}

const registro = document.getElementById("formRegistro");
if (registro) {
  registro.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const usuario = document.getElementById("nuevoUsuario").value.trim();
    const password = document.getElementById("nuevaPassword").value;
    const confirmar = document.getElementById("confirmarPassword").value;
    const mensaje = document.getElementById("mensajeRegistro");

    if (password !== confirmar) {
      mensaje.style.color = "crimson";
      mensaje.textContent = "Las contraseñas no coinciden.";
      return;
    }

    localStorage.setItem("rutaUUsuario", JSON.stringify({nombre, correo, usuario, password}));
    mensaje.style.color = "green";
    mensaje.textContent = "Cuenta creada correctamente. Ya puedes iniciar sesión.";
    setTimeout(() => location.href = "index.html", 1200);
  });
}

const recuperar = document.getElementById("formRecuperar");
if (recuperar) {
  recuperar.addEventListener("submit", e => {
    e.preventDefault();
    const correo = document.getElementById("correoRecuperar").value.trim();
    const guardado = JSON.parse(localStorage.getItem("rutaUUsuario") || "null");
    const mensaje = document.getElementById("mensajeRecuperar");

    if (guardado && correo === guardado.correo) {
      mensaje.style.color = "green";
      mensaje.textContent = "Enlace de recuperación enviado. (Demostración)";
    } else {
      mensaje.style.color = "crimson";
      mensaje.textContent = "No encontramos una cuenta con ese correo.";
    }
  });
}
