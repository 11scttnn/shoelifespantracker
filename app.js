        // Load saved history from localStorage
        let shoeHistory = JSON.parse(localStorage.getItem('shoeHistory')) || [];

        function markAsBroken() {
            const purchaseDate = new Date(document.getElementById('purchase-date').value);
            const brokenDate = new Date();
            
            if (!document.getElementById('purchase-date').value) {
                alert('Please select a purchase date first!');
                return;
            }

            const timeDiff = brokenDate.getTime() - purchaseDate.getTime();
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `🥾 These shoes lasted you ${dayDiff} days!`;
            
            // Add to history
            const historyEntry = {
                purchaseDate: purchaseDate.toISOString(),
                brokenDate: brokenDate.toISOString(),
                days: dayDiff
            };
            
            shoeHistory.push(historyEntry);
            localStorage.setItem('shoeHistory', JSON.stringify(shoeHistory));
            
            updateHistoryDisplay();
            document.getElementById('purchase-date').value = '';
        }

        function updateHistoryDisplay() {
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';
            
            shoeHistory.slice().reverse().forEach(entry => {
                const listItem = document.createElement('li');
                const purchaseDate = new Date(entry.purchaseDate);
                const brokenDate = new Date(entry.brokenDate);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                
                listItem.innerHTML = `
                    🕒 Purchased: ${purchaseDate.toLocaleDateString(undefined, options)}<br>
                    💔 Broken: ${brokenDate.toLocaleDateString(undefined, options)}<br>
                    ⏳ Duration: ${entry.days} days
                    <hr>
                `;
                historyList.appendChild(listItem);
            });
        }

        // Load history when page loads
        updateHistoryDisplay();