document.addEventListener('DOMContentLoaded', () => {
    const app = {
        // Configuration
        config: {
            fixedFromValues: [
                0.0, 0.1, 201.0, 401.0, 601.0, 801.0, 1001.0, 1201.0, 1401.0, 1601.0, 1801.0, 2001.0, 2201.0,
                2401.0, 2601.0, 2801.0, 3001.0, 3201.0, 3401.0, 3601.0, 3801.0, 4001.0, 4201.0, 4401.0, 4601.0,
                4801.0, 5001.0, 5201.0, 5401.0, 5601.0, 5801.0, 6001.0, 6201.0, 6401.0, 6601.0, 6801.0, 7001.0,
                7201.0, 7401.0, 7601.0, 7801.0, 8001.0, 8201.0, 8401.0, 8601.0, 8801.0, 9001.0, 9201.0, 9401.0,
                9601.0, 9801.0, 10001.0, 10201.0, 10401.0, 10601.0, 10801.0, 11001.0, 11201.0, 11401.0, 11601.0,
                11801.0, 12001.0, 12201.0, 12401.0, 12601.0, 12801.0, 13001.0, 13201.0, 13401.0, 13601.0, 13801.0,
                14001.0, 14201.0, 14401.0, 14601.0, 14801.0, 15001.0, 15201.0, 15401.0, 15601.0, 15801.0, 16001.0,
                16201.0, 16401.0, 16601.0, 16801.0, 17001.0, 17201.0, 17401.0, 17601.0, 17801.0, 18001.0, 18201.0,
                18401.0, 18601.0, 18801.0, 19001.0, 19201.0, 19401.0, 19601.0, 19801.0
            ],
            minInstalment: 2,
            maxInstalment: 24,
        },

        // DOM Elements
        elements: {
            instalmentsMode: document.getElementById('instalments-mode'),
            percentageMode: document.getElementById('percentage-mode'),
            limitInput: document.getElementById('limit'),
            instalmentsOptions: document.getElementById('instalments-options'),
            percentageOptions: document.getElementById('percentage-options'),
            fastPastePanel: document.getElementById('fast-paste-panel'),
            mainDataPanel: document.getElementById('main-data-panel'),
            percentageByInstalmentPanel: document.getElementById('percentage-by-instalment-panel'),
            nacionalType: document.getElementById('nacional-type'),
            internacionalType: document.getElementById('internacional-type'),
            licenseFeeGroup: document.getElementById('license-fee-group'),
            licenseFeeInput: document.getElementById('license-fee'),
            onlyNonZeroCheckbox: document.getElementById('filter-nonzero'),
            filterCheckboxContainer: document.querySelector('.filter-checkbox'),
            pasteArea: document.getElementById('paste-area'),
            loadTableButton: document.getElementById('load-table-button'),
            clearPasteButton: document.getElementById('clear-paste-button'),
            mainDataTableBody: document.querySelector("#data-table tbody"),
            percentageTableBody: document.querySelector("#percentage-table tbody"),
            simbaOutput: document.getElementById('simba-output'),
            copyButton: document.querySelector('.copy-button'),
            
        },

        // Initialize the application
        init() {
            this.renderMainDataTable();
            this.renderPercentageTable();
            this.bindEvents();
            this.generateSimbaRules();
        },

        // Bind all event listeners
        bindEvents() {
            this.elements.instalmentsMode.addEventListener('change', this.handleModeChange.bind(this));
            this.elements.percentageMode.addEventListener('change', this.handleModeChange.bind(this));
            this.elements.limitInput.addEventListener('input', this.handleLimitChange.bind(this));
            this.elements.nacionalType.addEventListener('change', this.handleCountryChange.bind(this));
            this.elements.internacionalType.addEventListener('change', this.handleCountryChange.bind(this));
            this.elements.licenseFeeInput.addEventListener('input', this.generateSimbaRules.bind(this));
            this.elements.pasteArea.addEventListener('paste', this.handlePaste.bind(this));
            this.elements.loadTableButton.addEventListener('click', this.loadTableFromPaste.bind(this));
            this.elements.clearPasteButton.addEventListener('click', this.clearPasteArea.bind(this));
            this.elements.copyButton.addEventListener('click', this.copyToClipboard.bind(this));
            if (this.elements.onlyNonZeroCheckbox) {
                this.elements.onlyNonZeroCheckbox.addEventListener('change', this.generateSimbaRules.bind(this));
            }
            
            // Event delegation for tables
            this.elements.mainDataTableBody.addEventListener('input', this.generateSimbaRules.bind(this));
            this.elements.percentageTableBody.addEventListener('input', this.generateSimbaRules.bind(this));
        },

        // Render the main data table for instalments
        renderMainDataTable() {
            const limit = parseFloat(this.elements.limitInput.value) || 9000;
            this.elements.mainDataTableBody.innerHTML = '';

            const visibleFromValues = this.config.fixedFromValues.filter(v => v <= limit);

            visibleFromValues.forEach((fromValue, index) => {
                const row = document.createElement('tr');
                const isFirstRow = index === 0;
                row.innerHTML = `
                    <td><input type="number" value="${fromValue.toFixed(1)}" readonly></td>
                    <td><input type="number" class="fee-input" placeholder="0.00" step="0.01" ${isFirstRow ? 'value="0.00" readonly' : ''}></td>
                `;
                this.elements.mainDataTableBody.appendChild(row);
            });
        },

        // Render the percentage table
        renderPercentageTable() {
            for (let i = this.config.minInstalment; i <= this.config.maxInstalment; i++) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${i}</td>
                    <td><input type="number" class="percentage-input" data-inst="${i}" placeholder="0.00" step="0.01"></td>
                `;
                this.elements.percentageTableBody.appendChild(row);
            }
        },

        handleLimitChange() {
            this.renderMainDataTable();
            this.generateSimbaRules();
        },

        handleModeChange() {
            const isInstalments = this.elements.instalmentsMode.checked;
            this.elements.instalmentsOptions.style.display = isInstalments ? 'block' : 'none';
            this.elements.percentageOptions.style.display = isInstalments ? 'none' : 'block';
            this.elements.fastPastePanel.style.display = isInstalments ? 'block' : 'none';
            this.elements.mainDataPanel.style.display = isInstalments ? 'block' : 'none';
            this.elements.percentageByInstalmentPanel.style.display = isInstalments ? 'none' : 'block';
            // When in percentage mode, hide the "Mostrar solo cuotas con valor" option
            if (!isInstalments) {
                if (this.elements.filterCheckboxContainer) {
                    this.elements.filterCheckboxContainer.style.display = 'none';
                }
                if (this.elements.onlyNonZeroCheckbox) {
                    this.elements.onlyNonZeroCheckbox.checked = true; // default: show only with value
                    this.elements.onlyNonZeroCheckbox.disabled = true; // prevent changing while hidden
                }
            } else {
                if (this.elements.filterCheckboxContainer) {
                    this.elements.filterCheckboxContainer.style.display = 'block';
                }
                if (this.elements.onlyNonZeroCheckbox) {
                    this.elements.onlyNonZeroCheckbox.disabled = false;
                }
            }

            this.handleCountryChange();
        },

        handleCountryChange() {
            const isInternacional = this.elements.internacionalType.checked;
            this.elements.licenseFeeGroup.style.display = isInternacional ? 'block' : 'none';
            this.generateSimbaRules();
        },

        handlePaste(event) {
            event.preventDefault();
            const pastedText = (event.clipboardData || window.clipboardData).getData('text');
            this.elements.pasteArea.value = pastedText;
        },

        loadTableFromPaste() {
            const pastedText = this.elements.pasteArea.value;
            const lines = pastedText.trim().split(/\r?\n/).filter(line => line.trim() !== '');
            const feeInputs = this.elements.mainDataTableBody.querySelectorAll('.fee-input:not([readonly])');
            
            lines.forEach((line, index) => {
                if (index < feeInputs.length) {
                    const value = parseFloat(line.trim().replace(',', '.'));
                    if (!isNaN(value)) feeInputs[index].value = value.toFixed(2);
                }
            });
            
            
            this.generateSimbaRules();
        },

        clearPasteArea() {
            this.elements.pasteArea.value = '';
        },

        // Main function to generate Simba rules
        generateSimbaRules() {
            const isInstalments = this.elements.instalmentsMode.checked;
            const header = "instalment_count;from;fixed;percentage;on_payments_servicing_fee_percentage;license_servicing_fee_percentage";
            const lines = isInstalments
                ? this.generateInstalmentRules()
                : this.generatePercentageRules();
            
            this.elements.simbaOutput.value = [header, ...lines].join('\n');
        },

        // Generate rules for instalment mode
        generateInstalmentRules() {
            const lines = [];
            const userData = [];
            this.elements.mainDataTableBody.querySelectorAll("tr").forEach(row => {
                const fromValue = parseFloat(row.cells[0].querySelector('input').value);
                const feeInput = row.cells[1].querySelector('input');
                const feeValue = parseFloat(feeInput.value);
                if (!isNaN(feeValue) && feeInput.value.trim() !== '') {
                    userData.push({ from: fromValue, fee: feeValue });
                }
            });
            const showOnlyWithValue = this.elements.onlyNonZeroCheckbox && this.elements.onlyNonZeroCheckbox.checked;

            for (let inst = this.config.minInstalment; inst <= this.config.maxInstalment; inst++) {
                const instalmentRows = userData.map(dataRow => ({
                    from: dataRow.from,
                    fee: dataRow.fee,
                    line: `${inst};${dataRow.from.toFixed(1)};${(dataRow.fee * inst).toFixed(1)};0.0;0.0;0.00`
                })).sort((a, b) => a.from - b.from);

                const hasNonZero = instalmentRows.some(r => r.fee !== 0);
                if (showOnlyWithValue && !hasNonZero) {
                    continue; // skip this instalment entirely when filtering non-zero
                }

                if (!instalmentRows.some(row => row.from === 0.0)) {
                    lines.push(`${inst};0.0;0.0;0.0;0.0;0.00`);
                }
                instalmentRows.forEach(row => lines.push(row.line));
            }
            return lines;
        },

        // Generate rules for percentage mode
        generatePercentageRules() {
            const lines = [];
            const isInternacional = this.elements.internacionalType.checked;
            const licenseFee = parseFloat(this.elements.licenseFeeInput.value) || 0;
            const percentageMap = {};
            this.elements.percentageTableBody.querySelectorAll('.percentage-input').forEach(input => {
                const value = parseFloat(input.value);
                if (!isNaN(value) && input.value.trim() !== '') {
                    percentageMap[input.dataset.inst] = value;
                }
            });

            for (let inst = this.config.minInstalment; inst <= this.config.maxInstalment; inst++) {
                const percentageForInst = percentageMap[inst] || 0.0;
                const showOnlyWithValue = this.elements.onlyNonZeroCheckbox && this.elements.onlyNonZeroCheckbox.checked;

                if (showOnlyWithValue && percentageForInst === 0) {
                    continue; // skip this instalment entirely when filtering non-zero
                }

                lines.push(`${inst};0.0;0.0;0.00;0.0;0.0`);

                const dataLineLicenseFee = isInternacional ? licenseFee : 0;
                const formattedPercentage = percentageForInst === 0 ? '0.00' : percentageForInst.toFixed(2);

                lines.push(`${inst};0.1;0.0;${formattedPercentage};0.0;${dataLineLicenseFee}`);
            }
            return lines;
        },

        copyToClipboard() {
            this.elements.simbaOutput.select();
            try {
                document.execCommand('copy');
                
            } catch (err) {
                
            }
        },

        
    };

    app.init();
});
