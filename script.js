// Data
const NAV = [
    { label: '병원 소개', subs: ['클리닉 철학', '의료진 소개', '첨단 장비 안내', '오시는 길', '내부 갤러리'] },
    { label: '리프팅 센터', subs: ['울쎄라', '써마지 FLX', '슈링크 유니버스', '볼뉴머 리프팅', '실 리프팅'] },
    { label: '스킨부스터', subs: ['쥬베룩 볼륨', '리쥬란 힐러', '엑소좀 케어', '릴리이드', '필로가 135'] },
    { label: '색소 & 화이트닝', subs: ['피코 토닝', '듀얼 토닝', '기미 잡티 해결', '클라리티 II', '화이트닝 케어'] },
    { label: '여드름 & 모공', subs: ['여드름 스케일링', '포텐자', '피코 프락셀', '골드 PTT', '흉터 모공 치료'] },
    { label: '쁘띠 센터', subs: ['보톡스', '필러 교정', '인모드 리프팅', '윤곽 주사', '바디 조각술'] },
    { label: '시그니처 케어', subs: ['웨딩 프로그램', '하이드라페이셜', '남성 전용 관리', '안티에이징'] },
    { label: '커뮤니티', subs: ['공지사항', '이달의 이벤트', '리얼 후기', '전후 사진', '온라인 상담'] },
];

const SLIDES = [
    { label: 'The Art of Tranquility', title1: '머무는 모든 순간이 치유가 되는,', title2: '오직 당신만을 위한 안식처', desc: '복잡한 도심 속에서 마주하는 평온한 공간,\n차원이 다른 프리미엄 메디컬 케어를 경험하세요.', img: 'img/hero_b01.jpg' },
    { label: 'The Science of Beauty', title1: '가장 당신다운 당신을 만들어가는', title2: '에테르의 과학', desc: '최첨단 의료 기술과 세심한 케어로\n피부 본연의 아름다움을 깨워드립니다.', img: 'img/hero_b02.jpg' },
    { label: 'A Space for Your Soul', title1: '진정한 휴식이 시작되는 곳,', title2: '에테르에서 나를 찾으세요', desc: '온전히 나만을 위한 시간,\n프리미엄 클리닉 에테르가 함께합니다.', img: 'img/hero_b03.jpg' },
];

const SPACES = [
    { img: 'img/s021.png' },
    { img: 'img/s022.png' },
    { img: 'img/s023.png' },
    { img: 'img/s024.png' }
];

const EQUIP = [
    { name: '울쎄라 리프팅', img: 'img/s04_equipment01.png' },
    { name: '써마지 FLX', img: 'img/s04_equipment02.png' },
    { name: '소프웨이브', img: 'img/s04_equipment03.png' },
    { name: '울쎄라피 프라임', img: 'img/s04_equipment04.png' }
];


document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------
    // 1. Header & menus
    // -----------------------------------------------------
    const header = document.getElementById('main-header');
    const gnbList = document.getElementById('gnb-list');
    const megaMenu = document.getElementById('mega-menu-content');
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenuContent = document.getElementById('mobile-menu-content');

    // Header behaviors
    header.addEventListener('mouseenter', () => header.classList.add('show-mega', 'active'));
    header.addEventListener('mouseleave', () => {
        header.classList.remove('show-mega');
        if (window.scrollY <= 50) header.classList.remove('active');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('active');
        else if (!header.classList.contains('show-mega')) header.classList.remove('active');
    });

    // Mobile behaviors
    mobileBtn.addEventListener('click', () => {
        header.classList.toggle('mobile-open');
        document.body.style.overflow = header.classList.contains('mobile-open') ? 'hidden' : '';
        header.classList.add('active');
    });

    // Close mobile menu on resize to PC
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && header.classList.contains('mobile-open')) {
            header.classList.remove('mobile-open');
            document.body.style.overflow = '';
            // Remove active class if we are at the top and mega menu isn't open
            if (window.scrollY <= 50 && !header.classList.contains('show-mega')) {
                header.classList.remove('active');
            }
        }
    });

    document.querySelectorAll('.m-depth1').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.nextElementSibling;

            if (target && target.classList.contains('m-depth2')) {
                const isOpen = target.style.display === 'block';

                // Close all
                document.querySelectorAll('.m-depth2').forEach(ol => ol.style.display = 'none');
                document.querySelectorAll('.m-depth1').forEach(b => b.classList.remove('on'));

                if (!isOpen) {
                    target.style.display = 'block';
                    btn.classList.add('on');
                }
            }
        });
    });

    // -----------------------------------------------------
    // 2. Hero Slider
    // -----------------------------------------------------
    let curHero = 0;
    const heroBg = document.getElementById('hero-bg');
    const heroContent = document.getElementById('hero-content');
    const heroLabel = document.getElementById('hero-label');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroNum = document.getElementById('hero-num');
    const pagerPrev = document.getElementById('hero-pager-prev');
    const pagerNext = document.getElementById('hero-pager-next');

    let isHeroInit = true;
    let isHeroAnimating = false;

    function updateHero() {
        if (isHeroAnimating && !isHeroInit) return;
        const slide = SLIDES[curHero];

        // Background crossfade layer
        const nextBg = document.createElement('div');
        nextBg.className = 'hero-bg-layer';
        nextBg.style.backgroundImage = `url('${slide.img}')`;
        heroBg.appendChild(nextBg);

        // Force reflow
        void nextBg.offsetWidth;
        nextBg.style.opacity = 1;

        const layers = heroBg.querySelectorAll('.hero-bg-layer');
        if (layers.length > 1) {
            const oldBg = layers[0];
            setTimeout(() => {
                if (oldBg.parentNode) oldBg.parentNode.removeChild(oldBg);
            }, 1000);
        }

        const applyText = () => {
            heroLabel.textContent = slide.label;
            heroTitle.innerHTML = `<span class="hero-title-light">${slide.title1}</span><br><span class="hero-title-bold">${slide.title2}</span>`;
            heroDesc.innerHTML = slide.desc.replace(/\n/g, '<br>');
            heroNum.textContent = String(curHero + 1);
        };

        applyText();
        isHeroInit = false;
        isHeroAnimating = true;
        setTimeout(() => { isHeroAnimating = false; }, 1000);
    }

    updateHero();

    let heroTimer = setInterval(() => { curHero = (curHero + 1) % SLIDES.length; updateHero(); }, 5000);
    const resetTimer = () => {
        clearInterval(heroTimer);
        heroTimer = setInterval(() => { curHero = (curHero + 1) % SLIDES.length; updateHero(); }, 5000);
    };

    pagerPrev.addEventListener('click', () => {
        if (isHeroAnimating) return;
        curHero = (curHero - 1 + SLIDES.length) % SLIDES.length;
        updateHero();
        resetTimer();
    });

    pagerNext.addEventListener('click', () => {
        if (isHeroAnimating) return;
        curHero = (curHero + 1) % SLIDES.length;
        updateHero();
        resetTimer();
    });


    // -----------------------------------------------------
    // 3. Carousel Logic (Generic)
    // -----------------------------------------------------
    function createCarousel(data, containerId, prevBtnId, nextBtnId, curId, totId, renderFn) {
        const track = document.getElementById(containerId);
        let cur = 0;
        let vis = 3;
        const GAP = 20;

        function update() {
            if (window.innerWidth < 768) vis = containerId === 'eq-track' ? 2 : 1;
            else if (window.innerWidth < 1024) vis = 2;
            else vis = containerId === 'eq-track' ? 3.5 : 3;

            // Render 3 sets of the data for infinite illusion: prev clone, actual, next clone
            const renderSet = (d) => d.map(item => renderFn(item, vis, GAP)).join('');
            track.innerHTML = renderSet(data) + renderSet(data) + renderSet(data);

            const totEl = document.getElementById(totId);
            const curEl = document.getElementById(curId);
            if (totEl) totEl.textContent = String(data.length).padStart(2, '0');

            // Start at the real first item (which is after the first clone set)
            cur = data.length;

            updateTrans(false);
        }

        function updateTrans(animate = true) {
            track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
            track.style.transform = `translateX(calc(-${cur * (100 / vis)}% - ${cur * GAP / vis}px))`;

            const realCur = cur % data.length;
            const curEl = document.getElementById(curId);
            if (curEl) curEl.textContent = String(realCur + 1).padStart(2, '0');
        }

        document.getElementById(prevBtnId).addEventListener('click', () => {
            cur--;
            updateTrans(true);
            if (cur < data.length) {
                setTimeout(() => {
                    cur += data.length;
                    updateTrans(false);
                }, 500); // Wait for transition
            }
        });

        document.getElementById(nextBtnId).addEventListener('click', () => {
            cur++;
            updateTrans(true);
            if (cur >= data.length * 2) {
                setTimeout(() => {
                    cur -= data.length;
                    updateTrans(false);
                }, 500); // Wait for transition
            }
        });

        window.addEventListener('resize', update);
        update();
    }

    // Space Slider
    createCarousel(SPACES, 'space-track', 'sp-prev', 'sp-next', 'sp-cur', 'sp-tot', (sp, vis, gap) => `
        <div class="space-item" style="width: calc(${100 / vis}% - ${(vis - 1) * gap / vis}px)">
            <div class="img-box" style="background-image: url('${sp.img}')"></div>
        </div>
    `);

    // Precision Slider
    createCarousel(EQUIP, 'eq-track', 'eq-prev', 'eq-next', 'eq-cur', 'eq-tot', (eq, vis, gap) => `
        <div class="eq-item" style="width: calc(${100 / vis}% - ${(vis - 1) * gap / vis}px)">
            <div class="img-box">
                <img src="img/s04_box_bg.png" class="bg-layer" alt="background">
                <img src="${eq.img}" class="eq-layer" alt="${eq.name}">
            </div>
            <h4>${eq.name}</h4>
        </div>
    `);

    // Lucide Icons Render
    lucide.createIcons({
        attrs: { 'stroke-width': 1 }
    });

    // -----------------------------------------------------
    // 4. Scroll Reveal Animations (IntersectionObserver)
    // -----------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

    // Apply initial hidden state via JS (overrides all CSS specificity)
    revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only hide elements that are below the fold
        if (rect.top >= window.innerHeight) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px)';
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // Animate in
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                // Stagger children
                if (el.classList.contains('reveal-stagger')) {
                    [...el.children].forEach((child, i) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        child.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
                        requestAnimationFrame(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        });
                    });
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // Doctor section: slide-in from opposite directions
    const doctorEl = document.querySelector('.reveal-doctor');
    if (doctorEl) {
        const doctorImg = doctorEl.querySelector('.doctor-img');
        const doctorInfo = doctorEl.querySelector('.doctor-info');

        // Set initial hidden states
        if (doctorImg) {
            doctorImg.style.opacity = '0';
            doctorImg.style.transform = 'translateX(50px)';
            doctorImg.style.transition = 'opacity 0.85s ease, transform 0.85s ease';
        }
        if (doctorInfo) {
            doctorInfo.style.opacity = '0';
            doctorInfo.style.transform = 'translateX(-50px)';
            doctorInfo.style.transition = 'opacity 0.85s ease 0.15s, transform 0.85s ease 0.15s';
        }

        const doctorObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (doctorImg) { doctorImg.style.opacity = '1'; doctorImg.style.transform = 'translateX(0)'; }
                if (doctorInfo) { doctorInfo.style.opacity = '1'; doctorInfo.style.transform = 'translateX(0)'; }
                doctorObserver.unobserve(doctorEl);
            }
        }, { threshold: 0.1 });

        doctorObserver.observe(doctorEl);
    }
});
