document.addEventListener('DOMContentLoaded', function(){
    

    let cc = '';
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    };

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asingar evnetos
    inputEmail.addEventListener('blur', validar);
    inputCC.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        // Reiniciamos el formulario
        resetFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.remove('hidden');
        spinner.classList.add('flex');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');

            // Reiniciamos el formulario
            resetFormulario();

            // Crear alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            // Agregamos la alerta al formulario
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === '' && !e.target.id === 'cc') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'cc' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email extra no es valido', e.target.parentElement);
            cc = '';
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();
        cc = e.target.value.trim().toLowerCase();
        
        comprobarEmail();
    };

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario
        referencia.appendChild(error);
    };

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false;
        
    }

    function resetFormulario() {
        //reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        cc =  '';

        // Reiniciamos el formulario
        formulario.reset();
        comprobarEmail();
    };
});