<body style="text-align: justify; font-family: 'trebuchet ms';">
    <header style="margin-bottom: 10px;">
        <img src="http://localhost/public/rsc/img/company-logo.png" alt="Company Logo" width="200px">
    </header>

    <section>
        <div style="margin-bottom: 10px;">
            Um novo ticket de prioridade <?= $this->e($prioridade)?> foi aberto, detalhes:
        </div>
        <div style="margin-bottom: 10px; font-size: 14px;">
            Id: <br /> <?= $this->e($id) ?>
        </div>
        <div style="margin-bottom: 10px; font-size: 14px;">
            Solicitante: <br /> <?= $this->e($solicitante) ?>
        </div>
        <div style="margin-bottom: 10px; font-size: 14px;">
            Detalhes: <br /> <?= $this->e($detalhes) ?>
        </div>
    </section>
</body>
