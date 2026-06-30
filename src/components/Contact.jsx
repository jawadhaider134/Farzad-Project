import { useState } from "react";
import axios from "axios";
import carpet1 from "../assets/carpet_1.avif";
export default function Contact() {
  const heroCarpet = carpet1;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const shimmer =
    "bg-[linear-gradient(90deg,#e5e7eb_25%,#f3f4f6_50%,#e5e7eb_75%)] bg-shimmer animate-shimmer";
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setStatus("");

    try {
      await axios.post(
        "https://tashya-mendez.onrender.com/api/contact/",
        formData,
      );

      setStatus("success");

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
  setStatus("error");
}
    };

  return (
    <div className="bg-[#F8F3EB] text-gray-800">
      <img
        src={heroCarpet}
        alt=""
        className="hidden"
        onLoad={() => setLoading(false)}
      />
      {loading ? (
        <>
          <section className={`h-[50vh] ${shimmer}`} />
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className={`h-5 w-32 rounded mb-6 ${shimmer}`} />
                <div className={`h-14 w-72 rounded mb-8 ${shimmer}`} />
                <div className={`h-24 w-full rounded mb-10 ${shimmer}`} />
                <div className="space-y-8">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className={`h-28 rounded-2xl ${shimmer}`} />
                  ))}
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-2xl">
                <div className={`h-10 w-56 rounded mb-8 ${shimmer}`} />
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item}>
                      <div className={`h-5 w-28 rounded mb-3 ${shimmer}`} />
                      <div className={`h-14 rounded-xl ${shimmer}`} />
                    </div>
                  ))}
                  <div>
                    <div className={`h-5 w-28 rounded mb-3 ${shimmer}`} />
                    <div className={`h-32 rounded-xl ${shimmer}`} />
                  </div>
                  <div className={`h-14 rounded-xl ${shimmer}`} />
                </div>
              </div>
            </div>
          </section>
          <section className="pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className={`h-[450px] rounded-3xl ${shimmer}`} />
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="relative h-[50vh] overflow-hidden">
            <img
              src={heroCarpet}
              alt="Afghan Carpet"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
              <p className="text-[#D4AF37] uppercase tracking-[6px] mb-4">
                Get In Touch
              </p>
              <h1 className="text-5xl md:text-6xl font-serif text-white font-bold">
                Contact Us
              </h1>
              <div className="w-24 h-1 bg-[#D4AF37] mt-6"></div>
            </div>
          </section>
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="text-[#8B1E1E] uppercase tracking-[4px] font-semibold">
                  Let's Talk
                </p>
                <h2 className="text-5xl font-serif text-[#8B1E1E] mt-4 mb-8">
                  We'd Love To Hear From You
                </h2>
                <p className="text-gray-600 text-lg leading-9 mb-10">
                  Whether you're looking for a beautiful handmade Afghan carpet
                  or have any questions about our collection, feel free to
                  contact us.
                </p>
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-[#8B1E1E] mb-2">
                      📍 Address
                    </h3>
                    <p className="text-gray-600">Kabul, Afghanistan</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-[#8B1E1E] mb-2">
                      📞 Phone
                    </h3>
                    <p className="text-gray-600">+93 782 776 766</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-[#8B1E1E] mb-2">
                      ✉️ Email
                    </h3>
                    <p className="text-gray-600">info@afghancarpet.com</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-[#8B1E1E] mb-2">
                      🕒 Working Hours
                    </h3>
                    <p className="text-gray-600">
                      Saturday - Thursday
                      <br />
                      8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-2xl">
                <h3 className="text-3xl font-serif text-[#8B1E1E] mb-8">
                  Send Us A Message
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone"
                      required
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Message</label>
                    <textarea
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      required
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-[#8B1E1E]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#8B1E1E] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#6e1717] transition disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                  {status === "success" && (
                    <p className="text-green-600 text-center mt-4">
                      Message sent successfully!
                    </p>
                  )}

                  {status === "error" && (
                    <p className="text-red-600 text-center mt-4">
                      Failed to send message.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </section>
          <section className="pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  title="Location"
                  src="https://maps.google.com/maps?q=Kabul&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-[450px]"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
