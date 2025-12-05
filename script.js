const names = ['Ashish', 'Ayush', 'Rohit', 'Shanvi', 'Hanshika', 'Radhika', 'Nhishant', 'Yatin'];
let availableNames = [...names];
let selectedNames = [];
let spinsRemaining = 8;
let isSpinning = false;

const nameDisplay = document.getElementById('nameDisplay');
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const spinCount = document.getElementById('spinCount');

function updateUI() {
    spinCount.textContent = spinsRemaining;
    
    if (spinsRemaining === 0) {
        spinBtn.disabled = true;
        spinBtn.textContent = '✅ Complete!';
    }
}

function getRandomName() {
    if (availableNames.length === 0) {
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const selectedName = availableNames[randomIndex];
    availableNames.splice(randomIndex, 1);
    selectedNames.push(selectedName);
    spinsRemaining--;
    
    return selectedName;
}

function spin() {
    if (isSpinning || spinsRemaining === 0) return;
    
    isSpinning = true;
    spinBtn.disabled = true;
    
    // Reset opacity for new spin
    nameDisplay.style.opacity = '1';
    
    // Spinning animation
    nameDisplay.classList.add('spinning');
    
    // Show random names during spin
    let spinCount = 0;
    const spinInterval = setInterval(() => {
        const randomTempName = names[Math.floor(Math.random() * names.length)];
        nameDisplay.textContent = randomTempName;
        spinCount++;
        
        if (spinCount > 15) {
            clearInterval(spinInterval);
            
            // Get final name
            const finalName = getRandomName();
            
            // Remove spinning class and add final animation
            nameDisplay.classList.remove('spinning');
            nameDisplay.classList.add('final');
            nameDisplay.textContent = finalName || 'All Done!';
            
            setTimeout(() => {
                nameDisplay.classList.remove('final');
            }, 500);
            
            // Hide name after 3 seconds
            setTimeout(() => {
                nameDisplay.textContent = '???';
                nameDisplay.style.opacity = '0.3';
            }, 3000);
            
            updateUI();
            isSpinning = false;
            
            if (spinsRemaining > 0) {
                spinBtn.disabled = false;
            }
        }
    }, 100);
}

function reset() {
    availableNames = [...names];
    selectedNames = [];
    spinsRemaining = 8;
    isSpinning = false;
    
    nameDisplay.textContent = 'Ready to Spin!';
    nameDisplay.classList.remove('spinning', 'final');
    nameDisplay.style.opacity = '1';
    
    spinBtn.disabled = false;
    spinBtn.textContent = '🎲 Spin';
    
    updateUI();
}

// Event listeners
spinBtn.addEventListener('click', spin);
resetBtn.addEventListener('click', reset);

// Initialize
updateUI();

