(function () {
    // Paste the Formspree endpoint here, e.g. 'https://formspree.io/f/abcdwxyz'.
    // While this is empty the form falls back to composing a mailto, so the page
    // still works — but SMS consent is only recorded server-side once it is set.
    var FORMSPREE_ENDPOINT = '';

    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = document.getElementById('form-status');
    var submit = form.querySelector('button[type="submit"]');

    function val(id) {
        var el = form.querySelector('#' + id);
        return el ? el.value.trim() : '';
    }

    function consentWording() {
        var label = form.querySelector('label[for="sms-consent"]');
        return label ? label.textContent.replace(/\s+/g, ' ').trim() : '';
    }

    function setStatus(msg, kind) {
        if (!status) return;
        status.textContent = msg;
        status.className = 'form-status ' + (kind || '');
    }

    function mailtoFallback(consented) {
        var body = [
            'Name: ' + val('name'),
            'Email: ' + val('email'),
            'Phone: ' + (val('phone') || '—'),
            '',
            val('message'),
            '',
            '----------------------------------------',
            'SMS consent: ' + (consented ? 'YES — box checked' : 'NO — box not checked'),
            consented ? 'Agreed to: "' + consentWording() + '"' : '',
            'Submitted: ' + new Date().toString()
        ].filter(function (l) { return l !== ''; }).join('\n');

        window.location.href = 'mailto:jobs@studio0172.com'
            + '?subject=' + encodeURIComponent('Website enquiry from ' + val('name'))
            + '&body=' + encodeURIComponent(body);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var consented = form.querySelector('#sms-consent').checked;

        if (!FORMSPREE_ENDPOINT) {
            mailtoFallback(consented);
            return;
        }

        submit.disabled = true;
        setStatus('Sending…');

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: val('name'),
                email: val('email'),
                phone: val('phone'),
                message: val('message'),
                // Record consent explicitly either way, plus the exact wording shown,
                // so the stored submission is self-contained proof of what was agreed.
                sms_consent: consented ? 'YES' : 'NO',
                sms_consent_text: consented ? consentWording() : '',
                _subject: 'Website enquiry from ' + val('name')
            })
        }).then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            form.reset();
            setStatus('Thanks — your message has been sent. We\'ll get back to you shortly.', 'ok');
        }).catch(function () {
            setStatus('Something went wrong. Please email jobs@studio0172.com instead.', 'err');
        }).then(function () {
            submit.disabled = false;
        });
    });
})();
