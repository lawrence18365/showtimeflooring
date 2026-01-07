// Flooring Calculator Logic

document.addEventListener('DOMContentLoaded', () => {
    const calcContainer = document.querySelector('.calculator-wrapper');
    if (!calcContainer) return;

    // Inject Calculator UI
    calcContainer.innerHTML = `
        <div class="calc-tabs">
            <button class="calc-tab active" data-mode="guests">By Guest Count</button>
            <button class="calc-tab" data-mode="dimensions">By Dimensions</button>
        </div>
        
        <div class="calc-content">
            <!-- Guest Mode -->
            <div id="mode-guests" class="calc-mode active">
                <div class="form-group">
                    <label for="guest-count">Number of Guests</label>
                    <input type="number" id="guest-count" placeholder="e.g. 150" min="10">
                </div>
                <div class="form-group">
                    <label for="event-type">Event Type</label>
                    <select id="event-type">
                        <option value="cocktail">Cocktail (Standing)</option>
                        <option value="seated">Seated Dinner</option>
                        <option value="dance">Dance Floor Only</option>
                    </select>
                </div>
            </div>

            <!-- Dimensions Mode -->
            <div id="mode-dimensions" class="calc-mode">
                <div class="form-row">
                    <div class="form-group">
                        <label for="length">Length (m)</label>
                        <input type="number" id="length" placeholder="10" min="1">
                    </div>
                    <div class="form-group">
                        <label for="width">Width (m)</label>
                        <input type="number" id="width" placeholder="10" min="1">
                    </div>
                </div>
            </div>

            <button id="calculate-btn" class="btn btn-primary full-width">Calculate Size</button>

            <!-- Result -->
            <div id="calc-result" class="calc-result hidden">
                <h3>Estimated Size</h3>
                <div class="result-value"><span id="total-sqm">0</span> m²</div>
                <p class="result-note">Based on <span id="result-type">standard</span> requirements.</p>
                <a href="#contact" class="btn btn-secondary small-btn">Get Quote for this Size</a>
            </div>
        </div>
    `;

    // Elements
    const tabs = document.querySelectorAll('.calc-tab');
    const modes = document.querySelectorAll('.calc-mode');
    const btn = document.getElementById('calculate-btn');
    const resultBox = document.getElementById('calc-result');
    const totalSqmSpan = document.getElementById('total-sqm');
    const resultTypeSpan = document.getElementById('result-type');

    let currentMode = 'guests';

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            modes.forEach(m => m.classList.remove('active'));

            tab.classList.add('active');
            currentMode = tab.dataset.mode;
            document.getElementById(`mode-${currentMode}`).classList.add('active');
            resultBox.classList.add('hidden');
        });
    });

    // Calculation Logic
    btn.addEventListener('click', () => {
        let sqm = 0;
        let note = '';

        if (currentMode === 'guests') {
            const guests = parseInt(document.getElementById('guest-count').value) || 0;
            const type = document.getElementById('event-type').value;

            if (guests <= 0) {
                alert('Please enter a valid number of guests');
                return;
            }

            // Factors: Space per person in sqm
            // Cocktail: ~0.75sqm, Seated: ~1.2sqm, Dance: ~0.3-0.4sqm (usually 30-40% of guests dancing at once)
            switch (type) {
                case 'cocktail':
                    sqm = guests * 0.8;
                    note = 'Standing/Cocktail Setup';
                    break;
                case 'seated':
                    sqm = guests * 1.2;
                    note = 'Seated Dinner (Round Tables)';
                    break;
                case 'dance':
                    // Rule of thumb: 1/3 of guests dancing. 1sqm per 2 dancers (tight) or 3 dancers.
                    // Or simple: 4.5sqm per 9-10 guests total. -> ~0.4 per guest total
                    sqm = guests * 0.4;
                    note = 'Dance Floor Area Only';
                    break;
            }
        } else {
            const l = parseFloat(document.getElementById('length').value) || 0;
            const w = parseFloat(document.getElementById('width').value) || 0;

            if (l <= 0 || w <= 0) {
                alert('Please enter valid dimensions');
                return;
            }
            sqm = l * w;
            note = 'Custom Dimensions';
        }

        // Round up to nearest whole number
        sqm = Math.ceil(sqm);

        totalSqmSpan.innerText = sqm;
        resultTypeSpan.innerText = note;
        resultBox.classList.remove('hidden');

        // simple animation
        resultBox.style.opacity = '0';
        resultBox.style.transform = 'translateY(10px)';
        setTimeout(() => {
            resultBox.style.transition = 'all 0.5s ease';
            resultBox.style.opacity = '1';
            resultBox.style.transform = 'translateY(0)';
        }, 50);
    });

});
