document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATA ---
    const visitorUpdatesData = [
        { id: 'v1', icon: 'ph-bell-ringing', title: 'Pre-Approved Entry', description: 'Your guest, Aarav Garg, is pre-approved for tomorrow.', time: '15m ago' },
        { id: 'v2', icon: 'ph-package', title: 'Package Arrived', description: 'A package from Amazon has arrived for you at the gate.', time: '1h ago' },
        { id: 'v3', icon: 'ph-car', title: 'Cab Arrived', description: 'Your Uber is waiting at the main entrance.', time: '3h ago' },
    ];
    const communityPostsData = [
        { 
            id: 'p1', avatar: 'https://i.pravatar.cc/150?img=1', name: 'Rohit', handle: '@rohit', time: '2h ago', content: 'Has anyone seen a lost golden retriever puppy near Block C? Responds to the name "Buddy". He is very friendly.', image: null, likes: 12, comments: 5,
            commentsData: [
                { avatar: 'https://i.pravatar.cc/150?img=5', name: 'Neha', text: 'I think I saw a puppy near the park entrance an hour ago!' },
                { avatar: 'https://i.pravatar.cc/150?img=6', name: 'Karan', text: 'Hope you find him soon! Will keep an eye out.' },
            ]
        },
        { 
            id: 'p2', avatar: 'https://i.pravatar.cc/150?img=2', name: 'Vijay', handle: '@vijay', time: '5h ago', content: 'Reminder: Free yoga session in the community park this Sunday at 7 AM. All are welcome, bring your own mats!', image: null, likes: 45, comments: 18,
            commentsData: [
                { avatar: 'https://i.pravatar.cc/150?img=7', name: 'Sunita', text: 'Looking forward to it! I will be there.' },
                { avatar: 'https://i.pravatar.cc/150?img=8', name: 'Amit', text: 'Great initiative, Vijay!' },
            ]
        },
        { 
            id: 'p3', avatar: 'https://i.pravatar.cc/150?img=4', name: 'Anjali', handle: '@anjali', time: '1d ago', content: 'The community garden is looking beautiful this season! Thanks to everyone who helped out.', image: null, likes: 82, comments: 25,
            commentsData: [
                { avatar: 'https://i.pravatar.cc/150?img=9', name: 'Mr. Verma', text: 'It truly is a wonderful addition to our community. Well done team.' },
            ]
        },
    ];
    const paymentsData = [
        { id: 'pay1', title: 'Monthly Maintenance', amount: -2500, date: '2023-11-05', status: 'Paid', icon: 'ph-shield-check', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-500 dark:text-green-400' },
        { id: 'pay2', title: 'Electricity Bill', amount: -1250, date: 'Due in 3 days', status: 'Due', icon: 'ph-lightning', iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', iconColor: 'text-yellow-500 dark:text-yellow-400' },
        { id: 'pay3', title: 'Clubhouse Booking', amount: -500, date: '2023-11-12', status: 'Paid', icon: 'ph-game-controller', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-500 dark:text-green-400' },
        { id: 'pay4', title: 'Water Bill', amount: -550, date: 'Overdue by 5 days', status: 'Overdue', icon: 'ph-drop', iconBg: 'bg-red-100 dark:bg-red-900/50', iconColor: 'text-red-500 dark:text-red-400' },
        { id: 'pay5', title: 'Gas Bill', amount: -800, date: '2023-10-20', status: 'Paid', icon: 'ph-fire', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-500 dark:text-green-400' },
    ];
    const securityLogData = [
        { id: 'log1', title: 'Guest Entry: Aarav Garg', time: '10:32 AM', icon: 'ph-user', iconBg: 'bg-blue-100 dark:bg-blue-900/50', iconColor: 'text-blue-500 dark:text-blue-400' },
        { id: 'log2', title: 'Delivery: Amazon', time: '9:15 AM', icon: 'ph-package', iconBg: 'bg-orange-100 dark:bg-orange-900/50', iconColor: 'text-orange-500 dark:text-orange-400' },
        { id: 'log3', title: 'Gate Opened via App', time: '8:00 AM', icon: 'ph-mobile', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-500 dark:text-green-400' },
        { id: 'log4', title: 'SOS Alert Triggered', time: 'Yesterday', icon: 'ph-siren', iconBg: 'bg-red-100 dark:bg-red-900/50', iconColor: 'text-red-500 dark:text-red-400' },
        { id: 'log5', title: 'Password Changed', time: '2 days ago', icon: 'ph-key', iconBg: 'bg-yellow-100 dark:bg-yellow-900/50', iconColor: 'text-yellow-500 dark:text-yellow-400' },
    ];
    const connectedDevicesData = [
        { id: 'dev1', name: 'Chrome on Windows', location: 'Delhi, IN (Current)', icon: 'ph-desktop', iconBg: 'bg-green-100 dark:bg-green-900/50', iconColor: 'text-green-500 dark:text-green-400', isCurrent: true },
        { id: 'dev2', name: 'iPhone 14 Pro', location: 'Mumbai, IN', icon: 'ph-device-mobile', iconBg: 'bg-gray-100 dark:bg-gray-600', iconColor: 'text-gray-500 dark:text-gray-400', isCurrent: false },
        { id: 'dev3', name: 'Safari on MacBook', location: 'Bangalore, IN', icon: 'ph-laptop', iconBg: 'bg-gray-100 dark:bg-gray-600', iconColor: 'text-gray-500 dark:text-gray-400', isCurrent: false },
    ];
    const marketplaceData = [
        { id: 'm1', title: 'Used Bicycle', price: 3000, category: 'vehicle', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop', seller: 'Rohan S.', avatar: 'https://i.pravatar.cc/150?img=11', location: 'Block A' },
        { id: 'm2', title: 'Study Table', price: 1500, category: 'furniture', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1887&auto=format&fit=crop', seller: 'Priya K.', avatar: 'https://i.pravatar.cc/150?img=5', location: 'Block C' },
        { id: 'm3', title: 'Gaming Headphones', price: 4999, category: 'electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', seller: 'Amit G.', avatar: 'https://i.pravatar.cc/150?img=8', location: 'Block B' },
        { id: 'm4', title: 'Vintage Leather Jacket', price: 8500, category: 'fashion', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1995&auto=format&fit=crop', seller: 'Sneha M.', avatar: 'https://i.pravatar.cc/150?img=32', location: 'Block D' },
        { id: 'm5', title: 'Bestseller Novel Set', price: 999, category: 'books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop', seller: 'Karan V.', avatar: 'https://i.pravatar.cc/150?img=12', location: 'Block A' },
        { id: 'm6', title: 'Modern Art Vase', price: 750, category: 'decor', image: 'modern art vase.png', seller: 'Anjali R.', avatar: 'https://i.pravatar.cc/150?img=35', location: 'Block C' },
        { id: 'm7', title: 'Homemade Chocolate Cake', price: 500, category: 'food', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1987&auto=format&fit=crop', seller: 'Sunita P.', avatar: 'https://i.pravatar.cc/150?img=45', location: 'Block B' },
        { id: 'm8', title: 'Used Electric Scooter', price: 45000, category: 'vehicle', image: 'EV scooty.png', seller: 'Vikram N.', avatar: 'https://i.pravatar.cc/150?img=14', location: 'Block D' },
    ];

    // --- DOM ELEMENTS ---
    const dom = {
        appContainer: document.getElementById('app-container'),
        mainScrollArea: document.getElementById('main-scroll-area'),
        visitorContent: document.getElementById('visitor-updates-content'),
        communityContent: document.getElementById('community-posts-content'),
        tabVisitor: document.getElementById('tab-visitor'),
        tabCommunity: document.getElementById('tab-community'),
        searchBar: document.getElementById('search-bar'),
        quickActionItems: document.querySelectorAll('.quick-action-item'),
        modalCloseBtns: document.querySelectorAll('.modal-close-btn'),
        detailView: document.getElementById('detail-view'),
        detailTitle: document.getElementById('detail-title'),
        detailContent: document.getElementById('detail-content'),
        detailBackBtn: document.getElementById('detail-back-btn'),
        darkModeToggle: document.getElementById('dark-mode-toggle'),
        darkModeIcon: document.querySelector('#dark-mode-toggle i'),
        profileDrawerBtn: document.getElementById('profile-drawer-btn'),
        profileDrawer: document.getElementById('profile-drawer'),
        profileDrawerCloseBtn: document.getElementById('profile-drawer-close-btn'),
        drawerOverlay: document.getElementById('drawer-overlay'),
        pullToRefreshIndicator: document.getElementById('pull-to-refresh-indicator'),
        pullToRefreshIcon: document.querySelector('#pull-to-refresh-indicator i'),
        paymentsPage: document.getElementById('payments-page'),
        securityPage: document.getElementById('security-page'),
        marketplacePage: document.getElementById('marketplace-page'),
        paymentsContent: document.getElementById('payments-content'),
        marketplaceContent: document.getElementById('marketplace-content'),
        paymentFilterBtns: document.querySelectorAll('.payment-filter-btn'),
        securityContent: document.getElementById('security-content'),
        connectedDevicesContent: document.getElementById('connected-devices-content'),
        navLinks: document.querySelectorAll('.nav-link'),
        confirmSosBtn: document.getElementById('confirm-sos-btn'),
        clubhouseModal: document.getElementById('clubhouse-modal'),
        deliveryModal: document.getElementById('delivery-modal'),
        addListingFab: document.getElementById('add-listing-fab'),
    };

    // --- STATE ---
    let state = {
        activeTab: 'visitor',
        currentPage: 'home',
        touchStartY: 0,
        isRefreshing: false,
    };

    // --- RENDER FUNCTIONS ---
    const renderSkeletons = (container, count = 3) => {
        let skeletons = '';
        for (let i = 0; i < count; i++) {
            skeletons += `
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 skeleton"></div>
                    <div class="flex-1 space-y-2">
                        <div class="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded skeleton"></div>
                        <div class="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded skeleton"></div>
                    </div>
                </div>
            `;
        }
        container.innerHTML = skeletons;
    };

    const renderVisitorUpdates = (filter = '') => {
        const data = visitorUpdatesData.filter(item => item.title.toLowerCase().includes(filter) || item.description.toLowerCase().includes(filter));
        dom.visitorContent.innerHTML = data.length ? `<div class="relative pl-8 before:absolute before:top-0 before:left-3 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">${data.map(item => `
            <div class="relative mb-8 cursor-pointer group" data-id="${item.id}" data-type="visitor">
                <div class="absolute -left-1.5 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white ring-8 ring-white dark:ring-gray-800">
                    <i class="ph ${item.icon} text-lg"></i>
                </div>
                <div class="ml-10 rounded-xl bg-white p-4 shadow-md transition-all group-hover:-translate-y-1 group-hover:shadow-lg dark:bg-gray-700">
                    <div class="flex items-center justify-between">
                        <h4 class="font-bold text-gray-800 dark:text-gray-200">${item.title}</h4>
                        <span class="text-xs text-gray-500 dark:text-gray-400">${item.time}</span>
                    </div>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">${item.description}</p>
                    <div class="mt-3 flex justify-end">
                        <button class="text-xs font-semibold text-blue-500 hover:underline dark:text-blue-400">View Details</button>
                    </div>
                </div>
            </div>`).join('')}</div>` : `<p class="text-center text-gray-500 dark:text-gray-400">No updates found.</p>`;
    };

    const renderCommunityPosts = (filter = '') => {
        const data = communityPostsData.filter(item => item.name.toLowerCase().includes(filter) || item.content.toLowerCase().includes(filter));
        dom.communityContent.innerHTML = data.length ? data.map(post => {
            const imageHTML = post.image ? `<div class="mt-3 -mx-4"><img src="${post.image}" alt="Post image" class="w-full h-auto"></div>` : '';
            const commentsHTML = post.commentsData.map(comment => `
                <div class="flex items-start space-x-2.5">
                    <img src="${comment.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                    <div class="flex-1 bg-gray-100 dark:bg-gray-600 rounded-xl p-2.5">
                        <p class="font-semibold text-sm text-gray-800 dark:text-gray-200">${comment.name}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${comment.text}</p>
                    </div>
                </div>
            `).join('');

            return `
            <div class="bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden" data-id="${post.id}" data-type="post">
                <div class="p-4">
                    <div class="flex items-start space-x-3">
                        <img src="${post.avatar}" alt="avatar" class="w-10 h-10 rounded-full cursor-pointer">
                        <div class="flex-1">
                            <div class="flex items-baseline space-x-2">
                                <h5 class="font-bold text-gray-800 dark:text-gray-200">${post.name}</h5>
                                <span class="text-sm text-gray-500 dark:text-gray-400">${post.handle} &middot; ${post.time}</span>
                            </div>
                            <p class="mt-1 text-gray-700 dark:text-gray-300">${post.content}</p>
                        </div>
                    </div>
                </div>
                ${imageHTML}
                <div class="px-4 py-2 border-t border-gray-100 dark:border-gray-700/50 flex justify-around text-gray-500 dark:text-gray-400">
                    <button class="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer"><i class="ph ph-heart text-lg"></i><span class="text-sm">${post.likes}</span></button>
                    <button class="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer" data-action="toggle-comments"><i class="ph ph-chat-circle-dots text-lg"></i><span class="text-sm">${post.comments}</span></button>
                    <button class="flex items-center space-x-1 hover:text-green-500 transition-colors cursor-pointer"><i class="ph ph-share-network text-lg"></i><span class="text-sm">Share</span></button>
                </div>
                <div class="comments-section hidden p-4 border-t border-gray-100 dark:border-gray-700/50 space-y-4">
                    ${commentsHTML}
                </div>
            </div>
            `;
        }).join('') : `<p class="text-center text-gray-500 dark:text-gray-400">No posts found.</p>`;
    };

    const renderPayments = (filter = 'all') => {
        const filteredData = paymentsData.filter(p => {
            if (filter === 'all') return true;
            if (filter === 'due') return p.status === 'Due' || p.status === 'Overdue';
            if (filter === 'paid') return p.status === 'Paid';
        });

        dom.paymentsContent.innerHTML = filteredData.map(p => {
            const statusClasses = {
                'Paid': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
                'Due': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
                'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            };
            const amountColor = p.status === 'Paid' ? 'text-gray-500 dark:text-gray-400' : 'text-red-500 dark:text-red-400';

            return `
            <div class="bg-white dark:bg-gray-700 p-4 rounded-xl flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div class="${p.iconBg} p-3 rounded-full"><i class="ph ${p.icon} text-xl ${p.iconColor}"></i></div>
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800 dark:text-gray-200">${p.title}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${p.date}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold ${amountColor}">₹${Math.abs(p.amount).toLocaleString()}</p>
                    <span class="text-xs font-medium ${statusClasses[p.status]} px-2 py-1 rounded-full">${p.status}</span>
                </div>
            </div>
        `}).join('');
    };

    const renderSecurityLogs = () => {
        dom.securityContent.innerHTML = securityLogData.map(log => `
            <div class="bg-white dark:bg-gray-700 p-4 rounded-xl flex items-center space-x-4 shadow-sm">
                <div class="${log.iconBg} p-3 rounded-full"><i class="ph ${log.icon} text-xl ${log.iconColor}"></i></div>
                <div class="flex-1">
                    <p class="font-semibold text-gray-800 dark:text-gray-200">${log.title}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${log.time}</p>
                </div>
                <i class="ph ph-caret-right text-gray-400"></i>
            </div>
        `).join('');
    };

    const renderConnectedDevices = () => {
        dom.connectedDevicesContent.innerHTML = connectedDevicesData.map(device => `
            <div class="bg-white dark:bg-gray-700 p-4 rounded-xl flex items-center space-x-4 shadow-sm">
                <div class="${device.iconBg} p-3 rounded-full"><i class="ph ${device.icon} text-xl ${device.iconColor}"></i></div>
                <div class="flex-1">
                    <p class="font-semibold text-gray-800 dark:text-gray-200">${device.name}</p>
                    <p class="text-xs ${device.isCurrent ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}">${device.location}</p>
                </div>
                ${!device.isCurrent ? `
                    <button class="text-xs font-semibold text-red-500 hover:underline dark:text-red-400">
                        Log Out
                    </button>
                ` : ''}
            </div>
        `).join('');
    };

    const renderMarketplace = (category = 'all') => {
        const filteredData = marketplaceData.filter(item => category === 'all' || item.category === category);

        dom.marketplaceContent.innerHTML = filteredData.map(item => `
            <div class="marketplace-item bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden group cursor-pointer" data-category="${item.category}">
                <div class="relative">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105">
                    <button class="favorite-btn absolute top-2 right-2 bg-black/30 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <i class="ph ph-heart text-lg"></i>
                        <i class="ph-fill ph-heart text-lg text-red-500 hidden"></i>
                    </button>
                </div>
                <div class="p-3">
                    <h4 class="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">${item.title}</h4>
                    <p class="text-lg font-bold text-blue-500 dark:text-blue-400">₹${item.price.toLocaleString()}</p>
                    <div class="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <img src="${item.avatar}" class="w-5 h-5 rounded-full mr-1.5">
                        <span>${item.seller} &middot; ${item.location}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Highlight active category
        document.querySelectorAll('.marketplace-category').forEach(cat => {
            const iconContainer = cat.querySelector('div');
            iconContainer.classList.toggle('ring-2', cat.dataset.category === category);
            iconContainer.classList.toggle('ring-blue-500', cat.dataset.category === category);
        });
    };

    // --- CORE LOGIC ---
    const loadContent = (isRefresh = false) => {
        if (state.isRefreshing) return;
        state.isRefreshing = true;
        if (isRefresh) dom.pullToRefreshIcon.classList.add('animate-spin');
        
        renderSkeletons(dom.visitorContent);
        renderSkeletons(dom.communityContent);

        setTimeout(() => {
            handleSearch(); // This will re-render with actual data
            if (isRefresh) {
                dom.pullToRefreshIndicator.style.transform = 'translateY(-100%)';
                dom.pullToRefreshIcon.classList.remove('animate-spin');
            }
            state.isRefreshing = false;
        }, 1500);
    };

    const switchTab = (tab) => {
        state.activeTab = tab;
        dom.tabVisitor.classList.toggle('tab-active', tab === 'visitor');
        dom.tabCommunity.classList.toggle('tab-active', tab === 'community');
        dom.visitorContent.classList.toggle('hidden', tab !== 'visitor');
        dom.communityContent.classList.toggle('hidden', tab !== 'community');
        handleSearch();
    };

    const handleSearch = () => {
        const searchTerm = dom.searchBar.value.toLowerCase();
        if (state.activeTab === 'visitor') renderVisitorUpdates(searchTerm);
        else renderCommunityPosts(searchTerm);
    };

    const openModal = (modalId) => document.getElementById(modalId)?.classList.remove('hidden');
    const closeModal = (modalId) => document.getElementById(modalId)?.classList.add('hidden');

    const openDetailView = (e) => {
        const card = e.target.closest('[data-id]');
        if (!card) return;
        const { id, type } = card.dataset;
        let item = type === 'visitor' ? visitorUpdatesData.find(v => v.id === id) : communityPostsData.find(p => p.id === id);
        if (item) {
            dom.detailTitle.textContent = type === 'visitor' ? "Visitor Update" : "Community Post";
            dom.detailContent.innerHTML = type === 'visitor' ? `<h3 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">${item.title}</h3><p class="text-gray-600 dark:text-gray-400">${item.description}</p>` : `<p class="text-lg text-gray-700 dark:text-gray-300">${item.content}</p>`;
            dom.detailView.classList.add('show');
        }
    };

    // --- PAGE NAVIGATION ---
    const navigateTo = (page) => {
        if (state.currentPage === page) return;

        // Hide all pages
        dom.mainScrollArea.classList.add('hidden');
        dom.paymentsPage.classList.add('hidden');
        dom.securityPage.classList.add('hidden');
        dom.marketplacePage.classList.add('hidden');

        // Deactivate all nav links
        dom.navLinks.forEach(link => link.classList.remove('nav-active'));

        // Show selected page and activate link
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.remove('hidden');
            // Reset scroll position
            pageElement.scrollTop = 0;
        }
        document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add('nav-active');
        
        state.currentPage = page;

        // Special handling for payments page
        if (page === 'payments') {
            renderPayments('all');
            document.querySelector('.payment-filter-btn[data-filter="all"]').classList.add('bg-blue-500', 'text-white', 'dark:bg-blue-500');
        }
        // Special handling for security page
        if (page === 'security') {
            renderSecurityLogs();
            renderConnectedDevices();
            const scoreCircle = document.getElementById('security-score-circle');
            if(scoreCircle) scoreCircle.classList.add('security-score-circle');
        }
        // Special handling for marketplace page
        if (page === 'marketplace') {
            renderMarketplace('all');
        }

        // Toggle FAB visibility
        dom.addListingFab.classList.toggle('hidden', page !== 'marketplace');
    };

    // --- DARK MODE ---
    const initDarkMode = () => {
        const isDark = localStorage.getItem('darkMode') === 'true' || (localStorage.getItem('darkMode') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', isDark);
        dom.darkModeIcon.className = isDark ? 'ph-fill ph-sun text-2xl' : 'ph ph-moon text-2xl';
    };
    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);
        dom.darkModeIcon.className = isDark ? 'ph-fill ph-sun text-2xl' : 'ph ph-moon text-2xl';
    };

    // --- PROFILE DRAWER ---
    const openDrawer = () => {
        dom.drawerOverlay.classList.remove('hidden');
        dom.profileDrawer.classList.add('show');
    };
    const closeDrawer = () => {
        dom.drawerOverlay.classList.add('hidden');
        dom.profileDrawer.classList.remove('show');
    };

    // --- PULL TO REFRESH ---
    const handleTouchStart = (e) => {
        if (dom.mainScrollArea.scrollTop === 0) state.touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
        if (state.touchStartY === 0 || state.isRefreshing) return;
        const pullDistance = e.touches[0].clientY - state.touchStartY;
        if (pullDistance > 0) {
            e.preventDefault();
            const pullRatio = Math.min(pullDistance / 150, 1);
            dom.pullToRefreshIndicator.style.opacity = pullRatio;
            dom.pullToRefreshIndicator.style.transform = `translateY(${pullDistance / 2.5}px)`;
            dom.pullToRefreshIcon.style.transform = `rotate(${pullDistance}deg)`;
        }
    };
    const handleTouchEnd = (e) => {
        if (state.touchStartY === 0 || state.isRefreshing) return;
        const pullDistance = e.changedTouches[0].clientY - state.touchStartY;
        if (pullDistance > 100) {
            loadContent(true);
        } else {
            dom.pullToRefreshIndicator.style.transform = 'translateY(-100%)';
            dom.pullToRefreshIndicator.style.opacity = 0;
        }
        state.touchStartY = 0;
    };

    // --- EVENT LISTENERS ---
    const addEventListeners = () => {
        dom.tabVisitor.addEventListener('click', () => switchTab('visitor'));
        dom.tabCommunity.addEventListener('click', () => switchTab('community'));
        dom.searchBar.addEventListener('input', handleSearch);
        dom.quickActionItems.forEach(item => item.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            if (action) openModal(`${action}-modal`);
        }));

        dom.modalCloseBtns.forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.modal)));
        document.querySelectorAll('[id$="-modal"]').forEach(modal => modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal.id);
        }));
        dom.visitorContent.addEventListener('click', openDetailView);
        
        // Combined event listener for community content
        dom.communityContent.addEventListener('click', (e) => {
            const card = e.target.closest('[data-id][data-type="post"]');
            const toggleBtn = e.target.closest('[data-action="toggle-comments"]');

            if (toggleBtn) {
                const postCard = toggleBtn.closest('.bg-white');
                const commentsSection = postCard.querySelector('.comments-section');
                commentsSection.classList.toggle('hidden');
            } else if (card) {
                openDetailView(e);
            }
        });

        dom.detailBackBtn.addEventListener('click', () => dom.detailView.classList.remove('show'));
        dom.darkModeToggle.addEventListener('click', toggleDarkMode);
        dom.profileDrawerBtn.addEventListener('click', openDrawer);
        dom.profileDrawerCloseBtn.addEventListener('click', closeDrawer);
        dom.drawerOverlay.addEventListener('click', closeDrawer);
        dom.appContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
        dom.appContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        dom.appContainer.addEventListener('touchend', handleTouchEnd);
        dom.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.dataset.page);
            });
        });
        dom.confirmSosBtn.addEventListener('click', () => {
            const sosConfirmation = document.getElementById('sos-confirmation-content');
            const sosSent = document.getElementById('sos-sent-content');
            sosConfirmation.classList.add('hidden');
            sosSent.classList.remove('hidden');
        });
        // Reset SOS modal when closed
        document.getElementById('sos-modal').addEventListener('click', (e) => {
            if (e.target.id === 'sos-modal' || e.target.closest('.modal-close-btn')) {
                setTimeout(() => {
                    document.getElementById('sos-confirmation-content').classList.remove('hidden');
                    document.getElementById('sos-sent-content').classList.add('hidden');
                }, 300); // Delay to allow closing animation
            }
        });
        // Clubhouse booking logic
        dom.clubhouseModal.addEventListener('click', (e) => {
            if (e.target.closest('.book-amenity-btn')) {
                document.getElementById('clubhouse-booking-content').classList.add('hidden');
                document.getElementById('clubhouse-booked-content').classList.remove('hidden');
            }
            // Reset Clubhouse modal when closed
            if (e.target.id === 'clubhouse-modal' || e.target.closest('.modal-close-btn')) {
                setTimeout(() => {
                    document.getElementById('clubhouse-booking-content').classList.remove('hidden');
                    document.getElementById('clubhouse-booked-content').classList.add('hidden');
                }, 300); // Delay to allow closing animation
            }
        });
        // Delivery approval logic
        document.getElementById('delivery-form').addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('delivery-form-content').classList.add('hidden');
            document.getElementById('delivery-approved-content').classList.remove('hidden');
        });
        // Reset Delivery modal when closed
        dom.deliveryModal.addEventListener('click', (e) => {
            if (e.target.id === 'delivery-modal' || e.target.closest('.modal-close-btn')) {
                setTimeout(() => {
                    document.getElementById('delivery-form-content').classList.remove('hidden');
                    document.getElementById('delivery-approved-content').classList.add('hidden');
                    document.getElementById('delivery-form').reset();
                }, 300); // Delay to allow closing animation
            }
        });

        // Payment filter buttons
        dom.paymentFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dom.paymentFilterBtns.forEach(b => b.classList.remove('bg-blue-500', 'text-white', 'dark:bg-blue-500'));
                btn.classList.add('bg-blue-500', 'text-white', 'dark:bg-blue-500');
                renderPayments(btn.dataset.filter);
            });
        });


        // Marketplace category filtering
        document.querySelectorAll('.marketplace-category').forEach(categoryEl => {
            categoryEl.addEventListener('click', () => renderMarketplace(categoryEl.dataset.category));
        });

        // Set initial active category to 'all' on marketplace page load
        const marketplaceNavLink = document.querySelector('.nav-link[data-page="marketplace"]');
        if (marketplaceNavLink) {
            marketplaceNavLink.addEventListener('click', () => renderMarketplace('all'));
        }

        // Marketplace favorite button
        dom.marketplaceContent.addEventListener('click', (e) => {
            const favBtn = e.target.closest('.favorite-btn');
            if (favBtn) {
                favBtn.classList.toggle('favorited');
                favBtn.querySelector('.ph-heart').classList.toggle('hidden');
                favBtn.querySelector('.ph-fill.ph-heart').classList.toggle('hidden');
            }
        });
    };

    // --- INITIALIZATION ---
    initDarkMode();
    addEventListeners();
    loadContent();
});