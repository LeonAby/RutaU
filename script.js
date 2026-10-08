// ============================================
// MOSTRAR / OCULTAR CONTRASEÑA
// ============================================

const mostrar = document.getElementById("mostrarPassword");

if (mostrar) {

    mostrar.addEventListener("click", () => {

        const pass = document.getElementById("password");

        if (pass.type === "password") {

            pass.type = "text";
            mostrar.textContent = "Ocultar";

        } else {

            pass.type = "password";
            mostrar.textContent = "Mostrar";

        }

    });

}


// ============================================
// INICIO DE SESIÓN
// ============================================

const login = document.getElementById("formLogin");

if (login) {

    login.addEventListener("submit", e => {

        e.preventDefault();


        // Obtener datos del formulario
        const usuario =
            document.getElementById("usuario").value.trim();

        const password =
            document.getElementById("password").value;


        // Obtener usuario registrado
        const guardado = JSON.parse(
            localStorage.getItem("rutaUUsuario") || "null"
        );


        // Mensaje del formulario
        const mensaje =
            document.getElementById("mensaje");


        // ========================================
        // COMPROBAR CREDENCIALES
        // ========================================

        const correcto =

            // Usuario estudiante de prueba
            (
                usuario === "estudiante" &&
                password === "123456"
            )

            ||

            // Usuario administrador de prueba
            (
                usuario === "admin" &&
                password === "admin123"
            )

            ||

            // Usuario creado mediante registro
            (
                guardado &&
                (
                    usuario === guardado.usuario ||
                    usuario === guardado.correo
                ) &&
                password === guardado.password
            );


        // ========================================
        // LOGIN CORRECTO
        // ========================================

        if (correcto) {

            mensaje.style.color = "green";

            mensaje.textContent =
                "Inicio de sesión correcto. Entrando a RutaU...";


            // Guardar sesión activa
            localStorage.setItem(
                "rutaUSesion",
                "activa"
            );


            // Guardar usuario que inició sesión
            localStorage.setItem(
                "rutaUUsuarioActivo",
                usuario
            );


            // Esperar un momento y entrar
            // a la pantalla principal
            setTimeout(() => {

                window.location.href = "inicio.html";

            }, 800);


        } else {

            // ====================================
            // LOGIN INCORRECTO
            // ====================================

            mensaje.style.color = "crimson";

            mensaje.textContent =
                "Usuario o contraseña incorrectos.";

        }

    });

}


// ============================================
// REGISTRO DE USUARIO
// ============================================

const registro =
    document.getElementById("formRegistro");


if (registro) {

    registro.addEventListener("submit", e => {

        e.preventDefault();


        // Obtener información del formulario
        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const usuario =
            document.getElementById("nuevoUsuario").value.trim();

        const password =
            document.getElementById("nuevaPassword").value;

        const confirmar =
            document.getElementById("confirmarPassword").value;


        const mensaje =
            document.getElementById("mensajeRegistro");


        // ========================================
        // VALIDAR CONTRASEÑAS
        // ========================================

        if (password !== confirmar) {

            mensaje.style.color = "crimson";

            mensaje.textContent =
                "Las contraseñas no coinciden.";

            return;
        }


        // ========================================
        // VALIDAR CAMPOS VACÍOS
        // ========================================

        if (
            nombre === "" ||
            correo === "" ||
            usuario === "" ||
            password === ""
        ) {

            mensaje.style.color = "crimson";

            mensaje.textContent =
                "Por favor completa todos los campos.";

            return;
        }


        // ========================================
        // GUARDAR USUARIO
        // ========================================

        const nuevoUsuario = {

            nombre: nombre,

            correo: correo,

            usuario: usuario,

            password: password

        };


        localStorage.setItem(
            "rutaUUsuario",
            JSON.stringify(nuevoUsuario)
        );


        // ========================================
        // MOSTRAR MENSAJE
        // ========================================

        mensaje.style.color = "green";

        mensaje.textContent =
            "Cuenta creada correctamente. Ya puedes iniciar sesión.";


        // ========================================
        // REGRESAR AL LOGIN
        // ========================================

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1200);

    });

}


// ============================================
// RECUPERAR CONTRASEÑA
// ============================================

const recuperar =
    document.getElementById("formRecuperar");


if (recuperar) {

    recuperar.addEventListener("submit", e => {

        e.preventDefault();


        // Obtener correo
        const correo =
            document
                .getElementById("correoRecuperar")
                .value
                .trim();


        // Obtener usuario registrado
        const guardado = JSON.parse(
            localStorage.getItem("rutaUUsuario") || "null"
        );


        // Mensaje
        const mensaje =
            document.getElementById("mensajeRecuperar");


        // ========================================
        // COMPROBAR CORREO
        // ========================================

        if (
            guardado &&
            correo === guardado.correo
        ) {

            mensaje.style.color = "green";

            mensaje.textContent =
                "Enlace de recuperación enviado. (Demostración)";


        } else {

            mensaje.style.color = "crimson";

            mensaje.textContent =
                "No encontramos una cuenta con ese correo.";

        }

    });

}


// ============================================
// CERRAR SESIÓN
// ============================================

function cerrarSesion() {

    // Eliminar información de sesión
    localStorage.removeItem("rutaUSesion");

    localStorage.removeItem("rutaUUsuarioActivo");


    // Regresar al inicio de sesión
    window.location.href = "index.html";

}


// ============================================
// COMPROBAR SESIÓN
// ============================================

function comprobarSesion() {

    const sesion =
        localStorage.getItem("rutaUSesion");


    if (sesion !== "activa") {

        // Si más adelante queremos proteger
        // las pantallas internas de RutaU,
        // aquí podremos hacerlo.

        return false;

    }

    return true;

}


// ============================================
// OBTENER USUARIO ACTIVO
// ============================================

function obtenerUsuarioActivo() {

    const usuario =
        localStorage.getItem("rutaUUsuarioActivo");


    return usuario;

}