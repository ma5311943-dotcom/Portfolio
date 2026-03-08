// ===== Imports =====
import weather from '../assets/weather.webp'
import twitter from '../assets/twitter.jpg'
import adminDashboard from '../assets/Dashboard.png'
import instagramClone from '../assets/instagram.jpg'
import spotify from '../assets/spotify.jpg'
import eCommerce from '../assets/e-commerce.png'

// ===== Work Data =====
const frontend_projects = [
    {
        w_no: 1,
        w_name: "Weather App",
        w_img: weather,
        url: "https://resonant-liger-70374b.netlify.app"
    },
    {
        w_no: 2,
        w_name: "Twitter Clone",
        w_img: twitter,
        url: "https://deluxe-blini-c1ce54.netlify.app"
    },
    {
        w_no: 3,
        w_name: "Admin Dashboard",
        w_img: adminDashboard,
        url: "https://playful-souffle-14269e.netlify.app"
    },
    {
        w_no: 4,
        w_name: "Instagram Clone",
        w_img: instagramClone,
        url: "https://tranquil-truffle-449e6e.netlify.app"
    },
    {
        w_no: 5,
        w_name: "E-Commerce",
        w_img: eCommerce,
        url: "https://dynamic-pixie-dd893a.netlify.app"
    },
    {
        w_no: 6,
        w_name: "Spotify",
        w_img: spotify,
        url: "https://snazzy-shortbread-7fb11c.netlify.app"
    },
]

const fullstack_projects = [
    {
        w_no: 1,
        w_name: "Nexus Marketplace",
        w_title: "Modern Multi-Vendor Ecommerce Store",
        w_img: eCommerce,
        w_desc: "A comprehensive multi-vendor marketplace built with Next.js, Stripe for payments, and a robust admin dashboard for managing products and sellers.",
        w_tech: ["Next.js", "MongoDB", "Stripe", "Clerk Authentication", "Tailwind CSS"],
        url: "#",
        video: "" // Placeholder for user's project video
    },
    {
        w_no: 2,
        w_name: "Novel Nest",
        w_title: "Online Bookstore & Reading Platform",
        w_img: eCommerce, // Using eCommerce as placeholder
        w_desc: "A specialized bookstore application featuring real-time inventory tracking, user reviews, and a smooth digital reading preview experience.",
        w_tech: ["Next.js", "PostgreSQL", "Prisma", "Inngest", "Tailwind CSS"],
        url: "#",
        video: ""
    },
    {
        w_no: 3,
        w_name: "Web Testing Tool",
        w_title: "Automated QA & UI Performance Tester",
        w_img: adminDashboard,
        w_desc: "A developer tool designed to run automated smoke tests and performance benchmarks on web applications, providing detailed reporting dashboards.",
        w_tech: ["Next.js", "Puppeteer", "Redux Toolkit", "Chart.js"],
        url: "#",
        video: ""
    },
    {
        w_no: 4,
        w_name: "SocialSphere",
        w_title: "Interactive Social Media Networking Site",
        w_img: instagramClone,
        w_desc: "Dynamic social platform featuring real-time messaging, image sharing, commenting, and personalized user feeds based on interests.",
        w_tech: ["Next.js", "Firebase", "Pusher", "Framer Motion"],
        url: "#",
        video: ""
    },
    {
        w_no: 5,
        w_name: "TechTitan Store",
        w_title: "Premium Tech & Gadgets E-commerce Hub",
        w_img: eCommerce,
        w_desc: "An elite tech store focusing on high-end gadgets with advanced filtering, stock management, and a seamless checkout process.",
        w_tech: ["Next.js", "Redis", "Mongoose", "Paypal API"],
        url: "#",
        video: ""
    }
]

export { frontend_projects, fullstack_projects };


