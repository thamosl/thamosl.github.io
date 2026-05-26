// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Force page to start at top on refresh so GSAP loading animations don't bug out
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .logo, .profile-photo-container, .cert-card, .cert-modal-close, .connect-btn');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Quick update for main dot
    gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
    });
});

// Smooth follow for follower
gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(follower, {
        x: followerX,
        y: followerY
    });
});

// Hover states
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// 100 Daily Motivational Quotes
const dailyQuotes = [
    "The only way to do great work is to love what you do. — Steve Jobs",
    "It always seems impossible until it's done. — Nelson Mandela",
    "Code is like humor. When you have to explain it, it’s bad. — Cory House",
    "Programs must be written for people to read, and only incidentally for machines to execute. — H. Abelson",
    "First, solve the problem. Then, write the code. — John Johnson",
    "Experience is the name everyone gives to their mistakes. — Oscar Wilde",
    "In order to be irreplaceable, one must always be different. — Coco Chanel",
    "Knowledge is power. — Francis Bacon",
    "Simplicity is the soul of efficiency. — Austin Freeman",
    "Make it work, make it right, make it fast. — Kent Beck",
    "Talk is cheap. Show me the code. — Linus Torvalds",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
    "Truth can only be found in one place: the code. — Robert C. Martin",
    "A language that doesn't affect the way you think about programming is not worth knowing. — Alan Perlis",
    "The function of good software is to make the complex appear to be simple. — Grady Booch",
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "Your time is limited, don't waste it living someone else's life. — Steve Jobs",
    "The best way to predict the future is to invent it. — Alan Kay",
    "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. — A. Saint-Exupery",
    "Don't fully trust a half-written program. — Unknown",
    "Quality is a product of a conflict between programmers and testers. — Yegor Bugayenko",
    "Everybody should learn to program a computer, because it teaches you how to think. — Steve Jobs",
    "I'm not a great programmer; I'm just a good programmer with great habits. — Kent Beck",
    "Computers are good at following instructions, but not at reading your mind. — Donald Knuth",
    "You can't have great software without a great team, and most software teams behave like dysfunctional families. — Jim McCarthy",
    "Optimism is an occupational hazard of programming; feedback is the treatment. — Kent Beck",
    "If, at first, you do not succeed, call it version 1.0. — Khayri R.R. Woulfe",
    "Programming isn't about what you know; it's about what you can figure out. — Chris Pine",
    "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it. — Patrick McKenzie",
    "No matter how far down the wrong road you've gone, turn back. — Turkish Proverb",
    "The secret of getting ahead is getting started. — Mark Twain",
    "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "Everything you've ever wanted is on the other side of fear. — George Addair",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
    "Hardships often prepare ordinary people for an extraordinary destiny. — C.S. Lewis",
    "I find that the harder I work, the more luck I seem to have. — Thomas Jefferson",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
    "You don't have to be great to start, but you have to start to be great. — Zig Ziglar",
    "I have not failed. I've just found 10,000 ways that won't work. — Thomas Edison",
    "If you want to achieve greatness stop asking for permission. — Anonymous",
    "Things work out best for those who make the best of how things work out. — John Wooden",
    "To live a creative life, we must lose our fear of being wrong. — Anonymous",
    "If you are not willing to risk the usual you will have to settle for the ordinary. — Jim Rohn",
    "Trust because you are willing to accept the risk, not because it's safe or certain. — Anonymous",
    "Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. — Swami Vivekananda",
    "All our dreams can come true if we have the courage to pursue them. — Walt Disney",
    "Good things come to people who wait, but better things come to those who go out and get them. — Anonymous",
    "If you do what you always did, you will get what you always got. — Anonymous",
    "Success is walking from failure to failure with no loss of enthusiasm. — Winston Churchill",
    "Just when the caterpillar thought the world was ending, he turned into a butterfly. — Proverb",
    "Successful entrepreneurs are givers and not takers of positive energy. — Anonymous",
    "Whenever you see a successful person you only see the public glories, never the private sacrifices to reach them. — Vaibhav Shah",
    "Opportunities don't happen, you create them. — Chris Grosser",
    "Try not to become a person of success, but rather try to become a person of value. — Albert Einstein",
    "Great minds discuss ideas; average minds discuss events; small minds discuss people. — Eleanor Roosevelt",
    "I have not failed. I've just found 10,000 ways that won't work. — Thomas A. Edison",
    "If you don't value your time, neither will others. Stop giving away your time and talents--start charging for it. — Kim Garst",
    "A successful man is one who can lay a firm foundation with the bricks others have thrown at him. — David Brinkley",
    "No one can make you feel inferior without your consent. — Eleanor Roosevelt",
    "The whole secret of a successful life is to find out what is one's destiny to do, and then do it. — Henry Ford",
    "If you're going through hell keep going. — Winston Churchill",
    "The ones who are crazy enough to think they can change the world, are the ones who do. — Anonymous",
    "Don't raise your voice, improve your argument. — Anonymous",
    "What seems to us as bitter trials are often blessings in disguise. — Oscar Wilde",
    "The meaning of life is to find your gift. The purpose of life is to give it away. — Anonymous",
    "The distance between insanity and genius is measured only by success. — Bruce Fefe",
    "When you stop chasing the wrong things, you give the right things a chance to catch you. — Lolly Daskal",
    "I believe that the only courage anybody ever needs is the courage to follow your own dreams. — Oprah Winfrey",
    "No masterpiece was ever created by a lazy artist. — Anonymous",
    "Happiness is a butterfly, which when pursued, is always just beyond your grasp, but which, if you will sit down quietly, may alight upon you. — Nathaniel Hawthorne",
    "If you can't explain it simply, you don't understand it well enough. — Albert Einstein",
    "Blessed are those who can give without remembering and take without forgetting. — Anonymous",
    "Do one thing every day that scares you. — Anonymous",
    "What's the point of being alive if you don't at least try to do something remarkable. — Anonymous",
    "Life is not about finding yourself. Life is about creating yourself. — Lolly Daskal",
    "Nothing in the world is more common than unsuccessful people with talent. — Anonymous",
    "Knowledge is being aware of what you can do. Wisdom is knowing when not to do it. — Anonymous",
    "Your problem isn't the problem. Your reaction is the problem. — Anonymous",
    "You can do anything, but not everything. — Anonymous",
    "Innovation distinguishes between a leader and a follower. — Steve Jobs",
    "There are two kinds of people in this world: those who want to get things done and those who don't want to make mistakes. — John Maxwell",
    "Thinking should become your capital asset, no matter whatever ups and downs you come across in your life. — A.P.J. Abdul Kalam",
    "I find that the harder I work, the more luck I seem to have. — Thomas Jefferson",
    "The starting point of all achievement is desire. — Napoleon Hill",
    "Success is the sum of small efforts, repeated day-in and day-out. — Robert Collier",
    "If you want to achieve excellence, you can get there today. As of this second, quit doing less-than-excellent work. — Thomas J. Watson",
    "All progress takes place outside the comfort zone. — Michael John Bobak",
    "You may only succeed if you desire succeeding; you may only fail if you do not mind failing. — Philippos",
    "Courage is resistance to fear, mastery of fear--not absence of fear. — Mark Twain",
    "Only put off until tomorrow what you are willing to die having left undone. — Pablo Picasso",
    "People often say that motivation doesn't last. Well, neither does bathing--that's why we recommend it daily. — Zig Ziglar",
    "We become what we think about most of the time, and that's the strangest secret. — Earl Nightingale",
    "The only place where success comes before work is in the dictionary. — Vidal Sassoon",
    "The best reason to start an organization is to make meaning; to create a product or service to make the world a better place. — Guy Kawasaki",
    "I find that when you have a real interest in life and a curious life, that sleep is not the most important thing. — Martha Stewart",
    "It's not what you look at that matters, it's what you see. — Anonymous",
    "The road to success and the road to failure are almost exactly the same. — Colin R. Davis",
    "A smooth sea never made a skilled sailor. — Franklin D. Roosevelt",
    "The future depends on what you do today. — Mahatma Gandhi"
];

function setDailyQuote() {
    // Calculates how many full UTC days have passed since 1970
    // This perfectly changes exactly once every 24 hours
    const daySinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const quoteIndex = daySinceEpoch % dailyQuotes.length;
    document.getElementById('quoteText').innerText = dailyQuotes[quoteIndex];
}
setDailyQuote();

// Loading Animation
const tlLoader = gsap.timeline();

tlLoader.to('.progress', {
    width: '100%',
    duration: 1.5,
    ease: 'power3.inOut'
})
.to('.loading-screen', {
    yPercent: -100,
    duration: 1,
    ease: 'power4.inOut',
    delay: 0.2
})
.from('.navbar', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
}, "-=0.5")
.from('.subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, "-=0.5")
.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.2
}, "-=0.6")
.from('.hero-description', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, "-=0.4")
.from('.daily-quote', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
}, "-=0.6");

// Navbar Blur on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Animations
// About Section
gsap.from('.about .section-title', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.about-text p', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Removed scroll animation for skill-tags to guarantee immediate visibility

gsap.from('.profile-photo-container', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 60%',
    },
    x: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

// Resume Section
gsap.from('.resume .section-title', {
    scrollTrigger: {
        trigger: '.resume',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.column-title', {
    scrollTrigger: {
        trigger: '.resume-grid',
        start: 'top 80%',
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.resume-grid',
        start: 'top 75%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Certifications Section
gsap.from('.certifications .section-title', {
    scrollTrigger: {
        trigger: '.certifications',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Removed GSAP scroll stagger layout for cert-cards to guarantee zero load misalignments

// Projects Section
gsap.from('.projects .section-title', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Removed GSAP stagger animation for .project-card to prevent offset glitches.

// Contact Section
gsap.from('.contact-card', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
    },
    y: 50,
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});


// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Certificate Modal Logic
const certModal = document.getElementById('certModal');
const certModalClose = document.getElementById('certModalClose');
const modalTitle = document.getElementById('modalCertTitle');
const modalOrg = document.getElementById('modalCertOrg');
const modalImg = document.getElementById('modalCertImage');
const modalPlaceholderIcon = document.getElementById('modalPlaceholderIcon');
const modalPlaceholderText = document.getElementById('modalPlaceholderText');

window.openCertModal = function(title, org, imgSrc) {
    modalTitle.innerText = title;
    modalOrg.innerText = org;
    
    if (imgSrc && imgSrc !== '') {
        modalImg.src = 'Images/' + imgSrc;
        modalImg.style.display = 'block';
        modalPlaceholderIcon.style.display = 'none';
        modalPlaceholderText.style.display = 'none';
    } else {
        modalImg.style.display = 'none';
        modalPlaceholderIcon.style.display = 'block';
        modalPlaceholderText.style.display = 'block';
    }

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling in background
    
    // Animate content entrance
    gsap.fromTo('.cert-modal-content', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
    );
};

certModalClose.addEventListener('click', () => {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking on overlay background
document.querySelector('.cert-modal-overlay').addEventListener('click', () => {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Connect Modal Logic
const connectModal = document.getElementById('connectModal');

window.openConnectModal = function() {
    connectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    gsap.fromTo(connectModal.querySelector('.cert-modal-content'), 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
    );
};

window.closeConnectModal = function() {
    connectModal.classList.remove('active');
    document.body.style.overflow = '';
};
