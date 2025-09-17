
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserNav } from '@/components/UserNav';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, ChevronRight, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    const names = name.split(' ');
    return names[0][0].toUpperCase();
  };

  const navLinks = [
    { to: "/pricing", text: "Pricing" },
    { to: "/contact", text: "Contact" },
    { to: "/about", text: "About" },
  ];

  // Check if user is admin
  const isAdmin = user?.email === 'jatinagrawal041@gmail.com';

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <img src="https://horizons-cdn.hostinger.com/22dd6545-a1fa-4e83-a53d-f36be02507f2/59e5ef0d869fe05e9a68272b49cd6b6c.png" alt="QuizEra AI Logo" className="h-16" />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="text-white/80 hover:text-white transition-colors text-lg">
                {link.text}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
               <div className="flex items-center space-x-4">
                 <Link to="/dashboard">
                   <Button variant="ghost" className="text-white hover:bg-white/20 text-lg">
                     Dashboard
                   </Button>
                 </Link>
                 {isAdmin && (
                   <Link to="/admin">
                     <Button variant="ghost" className="text-white hover:bg-white/20 text-lg">
                       Admin Panel
                     </Button>
                   </Link>
                 )}
                 <UserNav />
               </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/signup">
                  <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg">
                    Try for Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-white/20">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black z-40 flex flex-col"
          >
            <div className="container mx-auto px-4 py-2 flex items-center justify-between border-b border-white/10">
               <Link to="/" className="flex items-center" onClick={toggleMenu}>
                 <img src="https://horizons-cdn.hostinger.com/22dd6545-a1fa-4e83-a53d-f36be02507f2/59e5ef0d869fe05e9a68272b49cd6b6c.png" alt="QuizEra AI Logo" className="h-16" />
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-white/20">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex-grow flex flex-col justify-between px-6 py-8">
              {user ? (
                <>
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <Avatar className="h-16 w-16 bg-violet-600 text-white text-2xl">
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xl font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link to="/dashboard" onClick={toggleMenu} className="flex justify-between items-center text-2xl text-white/80 hover:text-white transition-colors py-4"><span>Dashboard</span><ChevronRight className="w-6 h-6 text-white/50" /></Link>
                      <Link to="/settings" onClick={toggleMenu} className="flex justify-between items-center text-2xl text-white/80 hover:text-white transition-colors py-4"><span>Settings</span><ChevronRight className="w-6 h-6 text-white/50" /></Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={toggleMenu} className="flex justify-between items-center text-2xl text-white/80 hover:text-white transition-colors py-4"><span>Admin Panel</span><ChevronRight className="w-6 h-6 text-white/50" /></Link>
                      )}
                      <div className="flex justify-between items-center text-2xl text-white/80 py-4">
                        <span>Theme</span>
                        <ThemeToggle />
                      </div>
                      {navLinks.map((link) => (
                        <Link key={link.to} to={link.to} onClick={toggleMenu} className="flex justify-between items-center text-2xl text-white/80 hover:text-white transition-colors py-4"><span>{link.text}</span><ChevronRight className="w-6 h-6 text-white/50" /></Link>
                      ))}
                    </div>
                  </div>
                  <div className="pb-4">
                    <Button onClick={handleLogout} variant="ghost" className="w-full text-red-400 text-lg hover:bg-red-500/10 justify-start px-0 py-4">
                      <LogOut className="mr-4 h-6 w-6" />
                      Log out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center text-2xl text-white/80 py-4">
                      <span>Theme</span>
                      <ThemeToggle />
                    </div>
                    {navLinks.map((link, index) => (
                      <motion.div key={link.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}>
                        <Link to={link.to} onClick={toggleMenu} className="flex justify-between items-center text-2xl text-white/80 hover:text-white transition-colors py-4"><span>{link.text}</span><ChevronRight className="w-6 h-6 text-white/50" /></Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="pb-4">
                      <div className="flex items-center justify-center">
                         <Link to="/signup" onClick={toggleMenu} className="w-full">
                           <Button className="w-full bg-white text-black hover:bg-white/90 text-lg px-6 py-3">Try for Free</Button>
                         </Link>
                      </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
