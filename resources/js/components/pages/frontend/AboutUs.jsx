import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const AboutMe = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
            {/* Floating Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-100 opacity-15 blur-3xl"></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Profile Image with Floating Effect */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0"
                        >
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-xl transform rotate-3"></div>
                            <img
                                src={`${import.meta.env.VITE_BACKEND_URL}/storage/profile.jpeg`}
                                alt="Shekh Manzur Elahi"
                                className="relative rounded-3xl w-full h-full object-cover border-4 border-white shadow-lg z-10"
                            />
                            <div className="absolute -bottom-4 -right-4 bg-indigo-600 p-4 rounded-full z-20 shadow-lg">
                                <FontAwesomeIcon icon={Icons.faLaptopCode} className="text-white text-xl" />
                            </div>
                        </motion.div>

                        {/* Introduction */}
                        <div className="flex-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-md">
                  FULL-STACK DEVELOPER
                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Shekh Manzur Elahi
                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg md:text-xl text-gray-600 leading-relaxed"
                            >
                                I architect and build scalable web applications with Laravel and React.
                                Specializing in ERP systems with complex business logic, database optimization,
                                and pixel-perfect interfaces.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap items-center gap-4 text-sm"
                            >
                <span className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <FontAwesomeIcon icon={Icons.faMapMarkerAlt} className="mr-2 text-indigo-500" />
                  Dhaka, Bangladesh
                </span>
                                <span className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <FontAwesomeIcon icon={Icons.faBriefcase} className="mr-2 text-indigo-500" />
                  2.5+ Years Experience
                </span>
                                <span className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <FontAwesomeIcon icon={Icons.faUniversity} className="mr-2 text-indigo-500" />
                  B.Sc in CSE (3.97/4.00)
                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap gap-3 pt-2"
                            >
                                <div className="flex gap-3">
                                    {/* GitHub Icon with Gradient */}
                                    <a
                                        target="_blank"
                                        href="https://github.com/shekhmanzurelahishadhin"
                                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            <FontAwesomeIcon icon={faGithub} className="text-xl" />
                                        </div>
                                    </a>

                                    {/* LinkedIn Icon with Gradient */}
                                    <a
                                        target="_blank"
                                        href="https://www.linkedin.com/in/shekh-monzur-elahi/"
                                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                                        </div>
                                    </a>

                                    {/* Portfolio Icon with Gradient */}
                                    <a
                                        target="_blank"
                                        href="https://shekh-manzur-elahi.onrender.com/"
                                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 hover:from-indigo-300 hover:via-indigo-400 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                            <FontAwesomeIcon icon={Icons.faGlobe} className="text-xl" />
                                        </div>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Expertise Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Technical Expertise
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        My core competencies across the full development stack
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Icons.faServer,
                            title: "Backend Engineering",
                            description: "Laravel, Yii2, MySQL, SQL Server with expertise in stored procedures, cron jobs, and complex business logic",
                            highlights: [
                                "Multi-authentication systems",
                                "Role-Based Access Control",
                                "API Development",
                                "Database Optimization"
                            ],
                            color: "from-indigo-500 to-blue-500"
                        },
                        {
                            icon: Icons.faProjectDiagram,
                            title: "ERP Systems",
                            description: "End-to-end enterprise solutions with custom modules for various industries",
                            highlights: [
                                "HRM & Payroll Systems",
                                "Inventory Management",
                                "CRM Integration",
                                "Reporting Dashboards"
                            ],
                            color: "from-purple-500 to-fuchsia-500"
                        },
                        {
                            icon: Icons.faPalette,
                            title: "Frontend Development",
                            description: "Modern, responsive interfaces with React and popular CSS frameworks",
                            highlights: [
                                "React.js Applications",
                                "Tailwind CSS",
                                "Bootstrap 5",
                                "Interactive UIs"
                            ],
                            color: "from-amber-500 to-orange-500"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500 ease-out"
                                 style={{ background: `linear-gradient(to right, ${item.color.replace('from-', '').replace(' to-', ', ')})` }}></div>
                            <div className="relative h-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                                <div className="p-8">
                                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 text-2xl text-white shadow-md`}>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <ul className="space-y-3">
                                        {item.highlights.map((highlight, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span className="text-gray-700">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Career Timeline */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Professional Journey
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-5 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-300 to-purple-300 transform -translate-x-1/2"></div>

                    {[
                        {
                            date: "2024 - Present",
                            title: "Software Engineer",
                            company: "Multibrand Infotech Ltd",
                            description: "Developing and maintaining multiple ERP solutions across industries using Laravel and Yii2",
                            icon: Icons.faBriefcase,
                            color: "bg-indigo-500"
                        },
                        {
                            date: "2023 - 2024",
                            title: "Jr Programmer",
                            company: "PeopleNTech Ltd",
                            description: "Built Laravel-based web applications with admin dashboards and role-based access",
                            icon: Icons.faUserTie,
                            color: "bg-purple-500"
                        },
                        {
                            date: "2022 - 2023",
                            title: "Web Developer (Intern)",
                            company: "Tecweb BD IT",
                            description: "Assisted in building dynamic websites for small businesses using Laravel",
                            icon: Icons.faGraduationCap,
                            color: "bg-amber-500"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}
                        >
                            <div className={`md:w-1/2 p-6 rounded-xl shadow-lg bg-white relative transition-all duration-300 hover:shadow-xl ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                                <div className={`absolute -top-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <span className="text-sm font-medium text-indigo-600">{item.date}</span>
                                <h3 className="text-lg font-bold text-gray-800 mt-1">{item.title}</h3>
                                <p className="text-gray-500 font-medium">{item.company}</p>
                                <p className="text-gray-600 mt-2">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Let's Work Together</h2>
                            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
                                Have a project in mind or want to discuss technology? I'm always open to new opportunities.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Icons.faEnvelope,
                                    title: "Email Me",
                                    value: "shadhinmonzur18@gmail.com",
                                    action: "mailto:shadhinmonzur18@gmail.com",
                                    bg: "bg-white/10 hover:bg-white/20"
                                },
                                {
                                    icon: Icons.faPhone,
                                    title: "Call Me",
                                    value: "(+88) 01973829988",
                                    action: "tel:+8801973829988",
                                    bg: "bg-white/10 hover:bg-white/20"
                                },
                                {
                                    icon: Icons.faGlobe,
                                    title: "Visit Portfolio",
                                    value: "shekh-manzur-elahi.onrender.com",
                                    action: "https://shekh-manzur-elahi.onrender.com/",
                                    bg: "bg-white hover:bg-gray-100 text-indigo-600"
                                }
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    href={item.action}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${item.bg} backdrop-blur-sm rounded-xl p-6 shadow-md transition-all duration-300 ${index === 2 ? '' : 'text-white'}`}
                                >
                                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4 mx-auto">
                                        <FontAwesomeIcon icon={item.icon} className={`text-xl ${index === 2 ? 'text-indigo-600' : 'text-white'}`} />
                                    </div>
                                    <h3 className="font-semibold text-center mb-1">{item.title}</h3>
                                    <p className={`text-center text-sm ${index === 2 ? 'text-indigo-700' : 'text-indigo-100'}`}>{item.value}</p>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutMe;
