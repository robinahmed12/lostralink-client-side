import { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      title: "How to Increase Your Chances of Finding Lost Items",
      excerpt:
        "Learn proven strategies to recover your lost belongings faster with our community-powered platform.",
      date: "June 10, 2023",
      readTime: "4 min read",
      category: "Tips",
    },
    {
      id: 2,
      title:
        "The Psychology of Lost Items: Why We Lose Things and How to Prevent It",
      excerpt:
        "Understanding the cognitive patterns that lead to misplacement can help you become more organized.",
      date: "May 28, 2023",
      readTime: "6 min read",
      category: "Psychology",
    },
    {
      id: 3,
      title: "Success Stories: Heartwarming Reunions Through Our Platform",
      excerpt:
        "Read inspiring accounts of valuable items returned to their grateful owners.",
      date: "May 15, 2023",
      readTime: "5 min read",
      category: "Stories",
    },
    {
      id: 4,
      title: "Best Practices for Reporting Found Items",
      excerpt:
        "A guide to effectively documenting and reporting found items to help reunite them with owners.",
      date: "April 30, 2023",
      readTime: "3 min read",
      category: "Guide",
    },
    {
      id: 5,
      title: "Community Spotlight: Our Top Contributors This Month",
      excerpt:
        "Meet the kind-hearted individuals who've helped return the most items this month.",
      date: "April 22, 2023",
      readTime: "4 min read",
      category: "Community",
    },
    {
      id: 6,
      title: "The Technology Behind Our Matching Algorithm",
      excerpt:
        "How we use AI and community data to connect lost items with their owners efficiently.",
      date: "April 10, 2023",
      readTime: "7 min read",
      category: "Technology",
    },
  ];

  const popularTags = [
    { name: "Lost Items", count: 24 },
    { name: "Found Items", count: 18 },
    { name: "Success Stories", count: 15 },
    { name: "Prevention Tips", count: 12 },
    { name: "Community", count: 9 },
    { name: "Technology", count: 7 },
  ];
  useEffect(() => {
    document.title = "Blog";
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Hero Section */}
      <div className="bg-[#F4A261] mt-20 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3E2F1C] mb-4">
            Lost & Found Blog
          </h1>
          <p className="text-xl text-[#3E2F1C] max-w-2xl mx-auto">
            Tips, stories, and insights to help you recover lost items and
            contribute to our community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles Section */}
          <div className="lg:w-2/3">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-[#F0EAD6] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#2A9D8F] text-white rounded-full mb-3">
                      {article.category}
                    </span>
                    <h2 className="text-xl font-bold text-[#3E2F1C] mb-2 hover:text-[#F4A261] transition-colors">
                      <Link to={`/blog/${article.id}`}>{article.title}</Link>
                    </h2>
                    <p className="text-[#9A8C7A] mb-4">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-[#9A8C7A]">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="join">
                <button className="join-item btn bg-[#F4A261] text-[#3E2F1C] border-none hover:bg-[#E76F51]">
                  «
                </button>
                <button className="join-item btn bg-[#F4A261] text-[#3E2F1C] border-none hover:bg-[#E76F51]">
                  1
                </button>
                <button className="join-item btn bg-[#2A9D8F] text-white border-none">
                  2
                </button>
                <button className="join-item btn bg-[#F4A261] text-[#3E2F1C] border-none hover:bg-[#E76F51]">
                  3
                </button>
                <button className="join-item btn bg-[#F4A261] text-[#3E2F1C] border-none hover:bg-[#E76F51]">
                  »
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Search */}
            <div className="bg-[#F0EAD6] p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-bold text-[#3E2F1C] mb-4">
                Search Articles
              </h3>
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered join-item w-full bg-white text-[#3E2F1C]"
                />
                <button className="btn join-item bg-[#F4A261] text-[#3E2F1C] border-none hover:bg-[#E76F51]">
                  Search
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#F0EAD6] p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-bold text-[#3E2F1C] mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="flex justify-between items-center text-[#3E2F1C] hover:text-[#2A9D8F] transition-colors"
                  >
                    <span>Tips & Guides</span>
                    <span className="bg-[#F4A261] text-[#3E2F1C] px-2 py-1 rounded-full text-xs">
                      12
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex justify-between items-center text-[#3E2F1C] hover:text-[#2A9D8F] transition-colors"
                  >
                    <span>Success Stories</span>
                    <span className="bg-[#F4A261] text-[#3E2F1C] px-2 py-1 rounded-full text-xs">
                      8
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex justify-between items-center text-[#3E2F1C] hover:text-[#2A9D8F] transition-colors"
                  >
                    <span>Community</span>
                    <span className="bg-[#F4A261] text-[#3E2F1C] px-2 py-1 rounded-full text-xs">
                      5
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex justify-between items-center text-[#3E2F1C] hover:text-[#2A9D8F] transition-colors"
                  >
                    <span>Technology</span>
                    <span className="bg-[#F4A261] text-[#3E2F1C] px-2 py-1 rounded-full text-xs">
                      3
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Tags */}
            <div className="bg-[#F0EAD6] p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-[#3E2F1C] mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Link
                    key={index}
                    to="#"
                    className="px-3 py-1 bg-[#2A9D8F] text-white text-sm rounded-full hover:bg-[#F4A261] hover:text-[#3E2F1C] transition-colors"
                  >
                    {tag.name} ({tag.count})
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#F4A261] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#3E2F1C] mb-4">
            Stay Updated
          </h2>
          <p className="text-[#3E2F1C] mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest tips, success stories,
            and platform updates.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="input input-bordered w-full bg-white text-[#3E2F1C]"
            />
            <button className="btn bg-[#2A9D8F] text-white border-none ml-2 hover:bg-[#3E2F1C]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3E2F1C] text-[#FFFAF0] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Lost & Found</h3>
              <p className="max-w-xs">
                Connecting lost items with their owners through community power.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/faq"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="#"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-[#F4A261] transition-colors"
                    >
                      Instagram
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-[#9A8C7A] mt-8 pt-6 text-center text-[#9A8C7A]">
            <p>
              © {new Date().getFullYear()} Lost & Found. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
