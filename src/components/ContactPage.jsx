import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    document.title = "Contact"
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen mt-20 bg-[#FFFAF0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-[#3E2F1C] hover:text-[#F4A261] transition-colors duration-200 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#3E2F1C] mb-4">
            Get in Touch
          </h1>
          <p className="text-[#9A8C7A] max-w-md mx-auto">
            Have questions about our lost and found service? Reach out to our team and we'll get back to you soon.
          </p>
        </div>

        <div className="bg-[#F0EAD6] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="p-6 sm:p-8">
            {submitSuccess && (
              <div className="mb-6 p-4 bg-[#2A9D8F] text-white rounded-md animate-fade-in">
                Thank you for your message! We'll get back to you shortly.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-[#3E2F1C] font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-[#3E2F1C] font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="you@example.com"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-[#3E2F1C] font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Tell us about your lost item or ask a question..."
                ></textarea>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-md font-medium text-white ${isSubmitting ? 'bg-[#F4A261]/70' : 'bg-[#F4A261] hover:bg-[#E76F51]'} transition-all duration-300 transform hover:scale-105 mb-4 sm:mb-0 w-full sm:w-auto`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
                
                <div className="text-center sm:text-right">
                  <p className="text-[#9A8C7A] mb-1">Prefer other methods?</p>
                  <div className="flex space-x-4 justify-center sm:justify-end">
                    <a href="mailto:help@lostandfound.com" className="text-[#3E2F1C] hover:text-[#F4A261] transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                    <a href="tel:+1234567890" className="text-[#3E2F1C] hover:text-[#F4A261] transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F0EAD6] p-6 rounded-lg hover:bg-[#F4A261] group transition-all duration-300">
            <div className="w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-[#2A9D8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#3E2F1C] mb-2 group-hover:text-white">Email Us</h3>
            <p className="text-[#9A8C7A] group-hover:text-white/80">help@lostandfound.com</p>
          </div>
          
          <div className="bg-[#F0EAD6] p-6 rounded-lg hover:bg-[#2A9D8F] group transition-all duration-300">
            <div className="w-12 h-12 bg-[#F4A261] rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-[#F4A261]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#3E2F1C] mb-2 group-hover:text-white">Live Chat</h3>
            <p className="text-[#9A8C7A] group-hover:text-white/80">Available 9AM-5PM EST</p>
          </div>
          
          <div className="bg-[#F0EAD6] p-6 rounded-lg hover:bg-[#E76F51] group transition-all duration-300">
            <div className="w-12 h-12 bg-[#2A9D8F] rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:text-[#2A9D8F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#3E2F1C] mb-2 group-hover:text-white">Call Us</h3>
            <p className="text-[#9A8C7A] group-hover:text-white/80">+1 (234) 567-8900</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;