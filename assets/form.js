(function () {
    // Recipient is set in the Formspree dashboard, not here.
    var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdnlyol';

    var form = document.getElementById('contact-form') || document.getElementById('apply-form');
    if (!form) return;

    var SUBJECT_PREFIX = form.getAttribute('data-subject') || 'Website enquiry from';

    var status = document.getElementById('form-status');
    var submit = form.querySelector('button[type="submit"]');

    function val(id) {
        var el = form.querySelector('#' + id);
        return el ? el.value.trim() : '';
    }

    // Every named field except the SMS consent choice, in page order.
    function fields() {
        var out = [];
        Array.prototype.forEach.call(form.elements, function (el) {
            if (!el.name || el.type === 'checkbox' || el.type === 'radio' || el.type === 'submit') return;
            out.push({ name: el.name, label: labelFor(el), value: el.value.trim() });
        });
        return out;
    }

    function labelFor(el) {
        var label = form.querySelector('label[for="' + el.id + '"]');
        return label ? label.firstChild.textContent.trim() : el.name;
    }

    function consentWording() {
        var text = form.querySelector('#sms-consent-text');
        return text ? text.textContent.replace(/\s+/g, ' ').trim() : '';
    }

    function setStatus(msg, kind) {
        if (!status) return;
        status.textContent = msg;
        status.className = 'form-status ' + (kind || '');
    }

    function mailtoFallback(consented) {
        var body = fields().map(function (f) {
            return f.label + ': ' + (f.value || '—');
        }).concat([
            '----------------------------------------',
            'SMS consent: ' + (consented ? 'YES — selected Yes' : 'NO — selected No'),
            consented ? 'Agreed to: "' + consentWording() + '"' : '',
            'Submitted: ' + new Date().toString()
        ]).filter(function (l) { return l !== ''; }).join('\n');

        window.location.href = 'mailto:jobs@studio0172.com'
            + '?subject=' + encodeURIComponent(SUBJECT_PREFIX + ' ' + val('name'))
            + '&body=' + encodeURIComponent(body);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var consented = form.querySelector('#sms-consent').checked;

        // Phone is optional on the contact form, but consenting to texts needs a number.
        if (consented && !val('phone')) {
            setStatus('Please add a phone number so we can text you, or choose No.', 'err');
            form.querySelector('#phone').focus();
            return;
        }

        if (!FORMSPREE_ENDPOINT) {
            mailtoFallback(consented);
            return;
        }

        submit.disabled = true;
        setStatus('Sending…');

        var payload = {};
        fields().forEach(function (f) { payload[f.name] = f.value; });
        // Record consent explicitly either way, plus the exact wording shown,
        // so the stored submission is self-contained proof of what was agreed.
        payload.sms_consent = consented ? 'YES' : 'NO';
        payload.sms_consent_text = consented ? consentWording() : '';
        payload._subject = SUBJECT_PREFIX + ' ' + val('name');

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            form.reset();
            setStatus(form.id === 'apply-form'
                ? 'Thanks — your application has been received. Our team will be in touch soon.'
                : 'Thanks — your message has been sent. We\'ll get back to you shortly.', 'ok');
        }).catch(function () {
            setStatus('Something went wrong. Please email jobs@studio0172.com instead.', 'err');
        }).then(function () {
            submit.disabled = false;
        });
    });
})();
