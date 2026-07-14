(function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            var open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }

    // navigator.clipboard needs a secure context, so fall back to execCommand
    // for pages opened straight from disk.
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            var ok = false;
            try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
            document.body.removeChild(ta);
            ok ? resolve() : reject(new Error('copy failed'));
        });
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
        var label = btn.querySelector('.copy-label');
        btn.addEventListener('click', function () {
            copyText(btn.getAttribute('data-copy')).then(function () {
                btn.classList.add('copied');
                if (label) label.textContent = 'Copied';
                setTimeout(function () {
                    btn.classList.remove('copied');
                    if (label) label.textContent = 'Copy';
                }, 2000);
            }).catch(function () {
                if (label) label.textContent = 'Press ⌘C';
                setTimeout(function () {
                    if (label) label.textContent = 'Copy';
                }, 2000);
            });
        });
    });
})();
