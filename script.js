const MintCore = {
    tasks: JSON.parse(localStorage.getItem('mint_db')) || [],
    filter: 'all',

    init() {
        this.cache();
        this.bind();
        this.render();
        document.getElementById('system-date').innerText = new Date().toDateString().toUpperCase();
        this.parallax();

        if ("Notification" in window) {
            Notification.requestPermission();
        }

        setInterval(() => this.checkOverdue(), 30000);
        const savedTheme = localStorage.getItem('mint_theme');
        if (savedTheme) {
            document.documentElement.style.setProperty('--bright-mint', savedTheme);
        }
    },

    cache() {
        this.list = document.getElementById('task-list');
        this.input = document.getElementById('task-name');
        this.cat = document.getElementById('task-cat');
        this.bar = document.getElementById('progress-bar');
        this.perc = document.getElementById('percent-val');
        this.bell = document.getElementById('floating-bell');
        this.notifPopup = document.getElementById('notif-popup');
    },

    bind() {
        document.getElementById('add-task').onclick = () => this.addTask();
        this.input.onkeydown = (e) => { if (e.key === 'Enter') this.addTask(); };
        
        document.getElementById('date-trigger').onclick = () => {
            document.getElementById('task-due').showPicker(); 
        };

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filter = btn.dataset.filter;
                this.render();
            };
        });

        document.getElementById('search-input').oninput = (e) => {
            this.render(e.target.value.toLowerCase());
        };

        this.bell.onclick = () => {
            const overdueTasks = this.tasks.filter(t => {
                return t.due && !t.done && new Date(t.due) < new Date();
            });

            if (overdueTasks.length > 0) {
                this.sendSystemNotification(`You have ${overdueTasks.length} pending objectives.`);
            } else {
                this.sendSystemNotification("All systems clear. No overdue objectives.");
            }

            this.bell.classList.remove('bell-active');
        };

        document.querySelector('.nav-bottom').onclick = () => {
            document.getElementById('settings-menu').classList.add('open');
        };
        
        const settingsModal = document.getElementById('settings-menu');
        settingsModal.onclick = (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('open');
            }
        };
        document.querySelectorAll('.color-dot').forEach(dot => {
            dot.onclick = () => {
                const color = dot.dataset.color;
                document.documentElement.style.setProperty('--bright-mint', color);
                document.documentElement.style.setProperty('--mint-glow', color + '66'); // 66 adds transparency
                
                document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                localStorage.setItem('mint_theme', color);
            };
        });

        document.getElementById('clear-data').onclick = () => {
            if(confirm("Are you sure? This will wipe the database.")) {
                this.tasks = [];
                this.save();
                location.reload(); 
            }
        };
    },

    addTask() {
        const val = this.input.value.trim();
        const dueVal = document.getElementById('task-due').value;
        if (!val) return;
    
        this.tasks.push({
            id: Date.now(),
            text: val,
            category: this.cat.value,
            done: false,
            urgent: this.cat.value === 'Urgent',
            created: new Date().toISOString(),
            due: dueVal || null,
            notified: false // Tracking for system popup
        });
    
        this.input.value = '';
        document.getElementById('task-due').value = ''; 
        this.save();
    },

    sendSystemNotification(taskText) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        } else {
            new Notification("Planner CORE | SYSTEM", {
                body: taskText,
                icon: "https://cdn-icons-png.flaticon.com/512/1827/1827347.png"
            });
        }
    },

    checkOverdue() {
        const now = new Date();
        let overdueCount = 0;

        this.tasks.forEach(t => {
            if (t.due && !t.done) {
                const dueDate = new Date(t.due);
                if (dueDate < now) {
                    overdueCount++;
                    // Trigger System Popup only once
                    if (!t.notified) {
                        this.sendSystemNotification(t.text);
                        t.notified = true;
                        localStorage.setItem('mint_db', JSON.stringify(this.tasks));
                    }
                }
            }
        });

        if (overdueCount > 0) {
            this.bell.classList.add('bell-active');
            this.notifPopup.innerText = `${overdueCount} OVERDUE`;
        } else {
            this.bell.classList.remove('bell-active');
        }
    },

    toggle(id) {
        const t = this.tasks.find(x => x.id === id);
        if (t) t.done = !t.done;
        this.save();
    },

    remove(id) {
        this.tasks = this.tasks.filter(x => x.id !== id);
        this.save();
    },

    save() {
        localStorage.setItem('mint_db', JSON.stringify(this.tasks));
        this.render();
    },
        
    render(search = '') {
        this.list.innerHTML = '';
        const sorted = [...this.tasks].sort((a, b) => {
            if (a.urgent && !b.urgent) return -1;
            if (!a.urgent && b.urgent) return 1;
            return b.id - a.id;
        });

        const filtered = sorted.filter(t => {
            const mF = this.filter === 'all' || t.category === this.filter;
            const mS = t.text.toLowerCase().includes(search);
            return mF && mS;
        });

        if (filtered.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-state';
            emptyMsg.innerHTML = `
                <i data-lucide="clipboard-list" style="width:40px; height:40px; margin-bottom:15px; opacity:0.3;"></i>
                <p style="color:rgba(255,255,255,0.3); font-size:0.9rem; text-align:center;">
                    No objectives under <span style="color:var(--bright-mint); font-weight:bold;">${this.filter.toUpperCase()}</span> yet.<br>
                    Add one to begin.
                </p>
            `;
            this.list.appendChild(emptyMsg);
            lucide.createIcons();
        }

        filtered.forEach(t => {
            const li = document.createElement('li');
            const dueDateLabel = t.due ? `<span class="task-date-tag">DUE: ${new Date(t.due).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}</span>` : '';
            const createdLabel = `<span style="font-size:8px; color:#bdbbbb;">SET: ${new Date(t.created).toLocaleDateString()}</span>`;
            
            li.className = `task-card ${t.done ? 'done' : ''} ${t.urgent ? 'urgent' : ''}`;
            li.innerHTML = `
                <div class="task-info">
                    <div style="display:flex; align-items:center;">
                        <p style="font-weight:500;">${t.text}</p>
                        ${dueDateLabel}
                    </div>
                    <div style="display:flex; gap:10px; margin-top:4px; align-items:center;">
                        <span style="font-size:10px; color:var(--bright-mint); font-weight:800; letter-spacing:1px;">${t.category.toUpperCase()}</span>
                        ${createdLabel}
                    </div>
                </div>
                <div style="display:flex; gap:25px; align-items:center;">
                    <i data-lucide="${t.done ? 'check-circle' : 'circle'}" onclick="MintCore.toggle(${t.id})" style="color:var(--bright-mint); cursor:pointer; width:18px;"></i>
                    <i data-lucide="x" onclick="MintCore.remove(${t.id})" style="color:#ff4b2b; cursor:pointer; width:16px; opacity:0.4;"></i>
                </div>
            `;
            this.list.appendChild(li);
        });

        lucide.createIcons();
        this.updateStats();
        this.checkOverdue();
    },

    updateStats() {
        const total = this.tasks.length;
        const done = this.tasks.filter(x => x.done).length;
        const p = total ? Math.round((done / total) * 100) : 0;
        this.bar.style.width = p + '%';
        this.perc.innerText = p + '%';
    },

    parallax() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 80;
            const y = (e.clientY - window.innerHeight / 2) / 80;
            document.getElementById('orb-1').style.transform = `translate(${x}px, ${y}px)`;
            document.getElementById('orb-2').style.transform = `translate(${-x}px, ${-y}px)`;
        });
    }
};

MintCore.init();